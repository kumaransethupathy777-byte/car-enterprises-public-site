import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Car
} from 'lucide-react';
import { DealershipChatMessage } from '../types';

interface OmnichannelDealershipWidgetProps {
  onBookTestDriveDirect: () => void;
}

export const OmnichannelDealershipWidget: React.FC<OmnichannelDealershipWidgetProps> = ({
  onBookTestDriveDirect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'hotline'>('chat');
  const [messages, setMessages] = useState<DealershipChatMessage[]>([
    {
      id: 'dm-1',
      sender: 'bot',
      text: 'Welcome to Apex Motors Concierge! How can I assist you with vehicle specs, on-road quotations, or booking a test drive today?',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickInquiries = [
    'What is the price of Apex Phantom V8?',
    'Which colours are available in stock?',
    'Can I schedule a test drive this weekend?',
    'Can a sales executive contact me?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: DealershipChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      const lower = query.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('phantom')) {
        botResponse = 'The Apex Grand Phantom V8 starts at ₹85.00 Lakh ex-showroom. We currently offer a 7.99% interest rate on pre-approved finance.';
      } else if (lower.includes('colour') || lower.includes('color') || lower.includes('stock')) {
        botResponse = 'Pearl White and Obsidian Black variants are available immediately for delivery at our Central Showroom. Sapphire Blue has a 6-week waiting period.';
      } else if (lower.includes('test drive') || lower.includes('weekend') || lower.includes('schedule')) {
        botResponse = 'We have slots open this Saturday and Sunday between 10:00 AM and 7:00 PM for both Showroom and Doorstep test drives!';
      } else if (lower.includes('sales') || lower.includes('executive') || lower.includes('contact') || lower.includes('advisor')) {
        botResponse = 'Connecting your request with Vikram Mehta (Senior Client Advisor). He will reach out to you within 15 minutes!';
      } else {
        botResponse = `Thank you for inquiring about "${query}". All Hyundai vehicles come with a 5-year comprehensive manufacturer warranty and 3-year roadside assistance. Would you like to schedule a test drive?`;
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs uppercase tracking-wider shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Dealership Concierge</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-slate-100">
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Apex Automotive Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[11px] text-slate-400">OmniFlow Vehicle Inquiry &amp; CRM</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 bg-slate-950 p-1 border-b border-slate-800 text-xs font-bold text-slate-400">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-1.5 rounded-lg transition-colors ${
                activeTab === 'chat' ? 'bg-slate-800 text-blue-400' : 'hover:text-white'
              }`}
            >
              AI Sales Assistant
            </button>
            <button
              onClick={() => setActiveTab('hotline')}
              className={`py-1.5 rounded-lg transition-colors ${
                activeTab === 'hotline' ? 'bg-slate-800 text-blue-400' : 'hover:text-white'
              }`}
            >
              WhatsApp &amp; Phone
            </button>
          </div>

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-800 text-slate-400 w-fit text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="px-3 py-2 border-t border-slate-800 bg-slate-950 flex items-center gap-1.5 overflow-x-auto">
                {quickInquiries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-slate-300 hover:border-blue-500 hover:text-blue-400 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about specs, availability, test drive..."
                  className="flex-1 h-9.5 px-3.5 rounded-full bg-slate-900 text-xs text-white placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9.5 h-9.5 rounded-full bg-blue-600 disabled:bg-slate-800 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Hotline Tab */}
          {activeTab === 'hotline' && (
            <div className="flex-1 p-5 space-y-3.5 overflow-y-auto">
              <div className="text-center pb-2">
                <h4 className="font-display font-bold text-sm text-white">Dealership Inquiries</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct channels to our certified sales executives
                </p>
              </div>

              <a
                href="https://wa.me/9118002008899?text=Hello%20Apex%20Motors%2C%20I%20would%20like%20to%20inquire%20about%20vehicle%20pricing."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs">WhatsApp Direct Chat</h5>
                  <p className="text-[11px] text-emerald-400">Quotation, brochures &amp; waiting times</p>
                </div>
              </a>

              <a
                href="tel:18002008899"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-950/40 hover:bg-blue-950/60 border border-blue-500/30 text-blue-200 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs">Toll-Free Hotline: 1800 200 8899</h5>
                  <p className="text-[11px] text-blue-400">Mon - Sun: 9:00 AM - 8:30 PM IST</p>
                </div>
              </a>

              <button
                onClick={() => {
                  onBookTestDriveDirect();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-display font-bold text-xs uppercase tracking-wider border border-slate-700 transition-colors"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Launch Test Drive Booking Form</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

