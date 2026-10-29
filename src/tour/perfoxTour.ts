import { driver, Driver, DriveStep } from 'driver.js';
import './tourStyles.css';

/**
 * Access the open shadow root of the Perfox AI Widget (#perfox-widget)
 */
export function getPerfoxShadowRoot(): ShadowRoot | null {
  const widgetHost = document.getElementById('perfox-widget');
  if (!widgetHost || !widgetHost.shadowRoot) {
    return null;
  }
  return widgetHost.shadowRoot;
}

/**
 * Injects tour styling into the Shadow DOM to guarantee zero blur and crisp visibility
 */
export function injectShadowStyles(shadowRoot: ShadowRoot): void {
  if (shadowRoot.getElementById('perfox-driver-shadow-styles')) return;

  const style = document.createElement('style');
  style.id = 'perfox-driver-shadow-styles';
  style.textContent = `
    .driver-active-element,
    .driver-active-element * {
      filter: none !important;
      opacity: 1 !important;
    }
    .sa-widget-attach-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
  `;
  shadowRoot.appendChild(style);
}

/**
 * Feature 5: Target or mount .sa-widget-attach-btn inside .sa-widget-controls-left
 * Includes paperclip SVG and hidden file input.
 */
export function ensureAttachButtonMounted(shadowRoot: ShadowRoot): HTMLElement | null {
  const existingBtn = shadowRoot.querySelector('.sa-widget-attach-btn') as HTMLElement | null;
  if (existingBtn) {
    return existingBtn;
  }

  const controlsLeft = shadowRoot.querySelector('.sa-widget-controls-left') as HTMLElement | null;
  if (!controlsLeft) {
    return null;
  }

  // Create attachment button
  const attachBtn = document.createElement('button');
  attachBtn.className = 'sa-widget-attach-btn';
  attachBtn.type = 'button';
  attachBtn.title = 'Attach Image or File';
  attachBtn.setAttribute('aria-label', 'Upload reference image or document');
  attachBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
  `;

  attachBtn.style.cssText = `
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    color: #94a3b8;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    outline: none;
  `;

  attachBtn.onmouseenter = () => {
    if (attachBtn) {
      attachBtn.style.color = '#38bdf8';
      attachBtn.style.background = 'rgba(56, 189, 248, 0.12)';
    }
  };
  attachBtn.onmouseleave = () => {
    if (attachBtn) {
      attachBtn.style.color = '#94a3b8';
      attachBtn.style.background = 'transparent';
    }
  };

  // Create hidden file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*,.pdf,.doc,.docx';
  fileInput.style.display = 'none';

  attachBtn.onclick = (e) => {
    e.stopPropagation();
    fileInput.click();
  };

  fileInput.onchange = () => {
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const textarea = shadowRoot.querySelector('.sa-widget-input, textarea') as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = (textarea.value ? textarea.value + ' ' : '') + `[Attached: ${file.name}]`;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.focus();
      }
    }
  };

  controlsLeft.appendChild(fileInput);
  controlsLeft.appendChild(attachBtn);
  return attachBtn;
}

/**
 * Helper to query any element inside the Perfox widget's shadow DOM
 */
export function getPerfoxShadowElement(selector: string): HTMLElement | null {
  const shadowRoot = getPerfoxShadowRoot();
  if (!shadowRoot) return null;

  injectShadowStyles(shadowRoot);

  if (selector.includes('attach-btn')) {
    return ensureAttachButtonMounted(shadowRoot);
  }

  // Handle multiple selectors separated by comma
  const selectors = selector.split(',').map(s => s.trim());
  for (const sel of selectors) {
    const el = shadowRoot.querySelector(sel) as HTMLElement | null;
    if (el) return el;
  }

  return null;
}

// Track original styles to cleanly revert onDeselected / onDestroyed
const originalStylesMap = new WeakMap<HTMLElement, {
  outline: string;
  outlineOffset: string;
  boxShadow: string;
  filter: string;
  opacity: string;
  zIndex: string;
}>();

/**
 * Zero-Blur & Crisp Highlight Technique (Critical)
 * Applies glowing active styles directly to the spotlighted element
 */
export function applyActiveGlow(element?: Element | null): void {
  if (!element || !(element instanceof HTMLElement)) return;

  if (!originalStylesMap.has(element)) {
    originalStylesMap.set(element, {
      outline: element.style.outline,
      outlineOffset: element.style.outlineOffset,
      boxShadow: element.style.boxShadow,
      filter: element.style.filter,
      opacity: element.style.opacity,
      zIndex: element.style.zIndex,
    });
  }

  element.style.outline = '2.5px solid #818cf8';
  element.style.outlineOffset = '3px';
  element.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.4), 0 0 22px rgba(99, 102, 241, 0.8)';
  element.style.filter = 'none';
  element.style.opacity = '1';
  element.style.zIndex = '10000001';
}

/**
 * Reverts active glow styles back to original values
 */
export function removeActiveGlow(element?: Element | null): void {
  if (!element || !(element instanceof HTMLElement)) return;

  const original = originalStylesMap.get(element);
  if (original) {
    element.style.outline = original.outline;
    element.style.outlineOffset = original.outlineOffset;
    element.style.boxShadow = original.boxShadow;
    element.style.filter = original.filter;
    element.style.opacity = original.opacity;
    element.style.zIndex = original.zIndex;
    originalStylesMap.delete(element);
  } else {
    element.style.outline = '';
    element.style.outlineOffset = '';
    element.style.boxShadow = '';
    element.style.filter = '';
    element.style.opacity = '';
    element.style.zIndex = '';
  }
}

/**
 * Open the Perfox widget panel and poll until it is fully rendered before launching tour
 */
export function openPerfoxWidget(callback: () => void): void {
  const maxAttempts = 60; // 6 seconds
  let attempts = 0;

  function triggerOpen() {
    attempts++;
    const shadowRoot = getPerfoxShadowRoot();

    // 1. Call window.Perfox('open')
    if (typeof (window as any).Perfox === 'function') {
      try {
        (window as any).Perfox('open');
      } catch (e) {
        console.warn('Perfox open API error:', e);
      }
    }

    // 2. Click widget bubble inside shadowRoot if closed
    if (shadowRoot) {
      injectShadowStyles(shadowRoot);
      ensureAttachButtonMounted(shadowRoot);

      const panel = shadowRoot.querySelector('.sa-widget-panel') as HTMLElement | null;
      if (!panel || panel.offsetHeight === 0) {
        const bubble = shadowRoot.querySelector('.sa-widget-bubble') as HTMLElement | null;
        if (bubble) {
          bubble.click();
        }
      }
    }

    // 3. Check if .sa-widget-panel is fully rendered
    if (shadowRoot) {
      const panel = shadowRoot.querySelector('.sa-widget-panel') as HTMLElement | null;
      if (panel && (panel.offsetHeight > 0 || panel.getBoundingClientRect().height > 0)) {
        ensureAttachButtonMounted(shadowRoot);
        // Allow CSS expansion animation to settle
        setTimeout(() => {
          callback();
        }, 250);
        return;
      }
    }

    if (attempts < maxAttempts) {
      setTimeout(triggerOpen, 100);
    } else {
      console.warn('Perfox widget panel took longer than expected to render, launching tour.');
      callback();
    }
  }

  triggerOpen();
}

/**
 * The 7 Separate Tour Steps in exact sequence:
 * 1. AI Concierge & Status
 * 2. Fullscreen Focus Mode
 * 3. Discreet Minimize & Session Memory
 * 4. Natural Language Shopping Input
 * 5. Image & File Upload
 * 6. Hands-Free Voice Dictation
 * 7. Sub-Second AI Dispatch
 */
export const PERFOX_CHATBOT_TOUR_STEPS: DriveStep[] = [
  // Step 1: AI Status & Identity
  {
    element: () => getPerfoxShadowElement('.sa-widget-header-left') as HTMLElement,
    popover: {
      title: '🤖 Perfox AI Concierge & Status',
      description: 'Your 24/7 autonomous automotive concierge and shopping assistant. Check real-time online status and dealership-verified identity for instant assistance.',
      side: 'bottom',
      align: 'start',
    },
    onHighlightStarted: (element) => applyActiveGlow(element),
    onDeselected: (element) => removeActiveGlow(element),
  },

  // Step 2: Fullscreen Mode
  {
    element: () => getPerfoxShadowElement('.sa-widget-header-fs, button[title*="fullscreen" i]') as HTMLElement,
    popover: {
      title: '⤢ Fullscreen Focus Mode',
      description: 'Toggle fullscreen for an expansive, distraction-free view to compare vehicles, analyze specifications, and view dimension diagrams comfortably.',
      side: 'bottom',
      align: 'end',
    },
    onHighlightStarted: (element) => applyActiveGlow(element),
    onDeselected: (element) => removeActiveGlow(element),
  },

  // Step 3: Minimize / Close
  {
    element: () => getPerfoxShadowElement('.sa-widget-header-close, button[title*="close" i]') as HTMLElement,
    popover: {
      title: '✕ Discreet Minimize & Session Memory',
      description: 'Collapse the chatbot panel anytime back to the unobtrusive launcher bubble. Your active consultation and message history are automatically preserved.',
      side: 'bottom',
      align: 'end',
    },
    onHighlightStarted: (element) => applyActiveGlow(element),
    onDeselected: (element) => removeActiveGlow(element),
  },

  // Step 4: Natural Language Input
  {
    element: () => getPerfoxShadowElement('.sa-widget-input, textarea') as HTMLElement,
    popover: {
      title: '✍️ Natural Language Shopping Input',
      description: 'Ask any question in plain conversational English! Inquire about specific trims, colors in stock, financing calculators, or schedule test drives.',
      side: 'top',
      align: 'start',
    },
    onHighlightStarted: (element) => applyActiveGlow(element),
    onDeselected: (element) => removeActiveGlow(element),
  },

  // Step 5: Image & File Upload
  {
    element: () => getPerfoxShadowElement('.sa-widget-attach-btn') as HTMLElement,
    popover: {
      title: '📎 Image & File Upload',
      description: 'Upload reference vehicle photos, trade-in documents, or insurance sheets for instant visual AI matching against available dealership inventory.',
      side: 'top',
      align: 'start',
    },
    onHighlightStarted: (element) => applyActiveGlow(element),
    onDeselected: (element) => removeActiveGlow(element),
  },

  // Step 6: Voice Dictation
  {
    element: () => getPerfoxShadowElement('.sa-widget-record-btn, button[title*="voice" i]') as HTMLElement,
    popover: {
      title: '🎙️ Hands-Free Voice Dictation',
      description: 'Speak hands-free! High-accuracy speech recognition transcribes your voice directly into inquiries without having to type on keyboard or mobile.',
      side: 'top',
      align: 'end',
    },
    onHighlightStarted: (element) => applyActiveGlow(element),
    onDeselected: (element) => removeActiveGlow(element),
  },

  // Step 7: AI Send Action
  {
    element: () => getPerfoxShadowElement('.sa-widget-send, button[title*="send" i]') as HTMLElement,
    popover: {
      title: '🚀 Sub-Second AI Dispatch',
      description: 'Press Enter or click the Send button for sub-second recommendations, live inventory checks, and instant answers.',
      side: 'top',
      align: 'end',
      doneBtnText: 'Start Chatting 💬',
    },
    onHighlightStarted: (element) => applyActiveGlow(element),
    onDeselected: (element) => removeActiveGlow(element),
  },
];

let activeTourDriverInstance: Driver | null = null;

/**
 * Initializes and configures the Driver.js instance with exact specifications
 */
export function createPerfoxTourDriver(): Driver {
  const tourDriver = driver({
    showProgress: true,
    animate: true,
    smoothScroll: true,
    allowClose: false, // Prevents closing accidentally when clicking the dark backdrop
    overlayColor: '#0b0f19',
    overlayOpacity: 0.74,
    stagePadding: 6,
    stageRadius: 10,
    popoverClass: 'perfox-tour-popover',
    progressText: 'Feature {{current}} of {{total}}',
    nextBtnText: 'Next Feature →',
    prevBtnText: '← Back',
    doneBtnText: 'Start Chatting 💬',
    steps: PERFOX_CHATBOT_TOUR_STEPS,
    onHighlightStarted: (element) => {
      applyActiveGlow(element);
    },
    onDeselected: (element) => {
      removeActiveGlow(element);
    },
    onDestroyed: (element) => {
      removeActiveGlow(element);
      activeTourDriverInstance = null;

      // Auto-focus input area inside Perfox widget so user can start chatting immediately
      const shadowRoot = getPerfoxShadowRoot();
      if (shadowRoot) {
        const textarea = shadowRoot.querySelector('.sa-widget-input, textarea') as HTMLTextAreaElement | null;
        textarea?.focus();
      }
    },
  });

  activeTourDriverInstance = tourDriver;
  return tourDriver;
}

/**
 * Primary entry point: Opens the Perfox chatbot widget and starts the 7-step guided tour
 */
export function startPerfoxTour(): void {
  // If already active, destroy existing first
  if (activeTourDriverInstance && activeTourDriverInstance.isActive()) {
    activeTourDriverInstance.destroy();
  }

  openPerfoxWidget(() => {
    const tourDriver = createPerfoxTourDriver();
    tourDriver.drive();
  });
}

// Expose globally on window for convenient console triggering or external calls
if (typeof window !== 'undefined') {
  (window as any).startPerfoxTour = startPerfoxTour;
}
