import { Vehicle } from '../types';

export const SAMPLE_VEHICLES: Vehicle[] = [
  {
    id: 'hyundai-creta',
    name: 'Hyundai Creta 2026 SX (O)',
    brand: 'Hyundai',
    type: 'Car',
    category: 'Luxury SUV',
    tagline: 'The Undisputed King of SUVs with SmartSense Level 2 ADAS & Seamless Dual 10.25-inch Cockpit.',
    description: 'Commanding road presence redefined. Featuring parametric black chrome grille, quad-beam LED headlamps, voice-enabled panoramic sunroof, ventilated front seats, and 70+ Bluelink connected car tech features.',
    basePrice: 1099900,
    acceleration: '0-100 km/h in 8.9s',
    topSpeed: '195 km/h',
    engineSpecs: '1.5L Turbo GDi Petrol / 1.5L CRDi Diesel (160 PS / 253 Nm)',
    seatingCapacity: 5,
    safetyRating: '5-Star Safety with 6 Airbags Standard',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Atlas White', hex: '#f8fafc' },
      { name: 'Abyss Black Pearl', hex: '#0f172a' },
      { name: 'Ranger Khaki', hex: '#57534e' },
      { name: 'Titan Grey', hex: '#475569' },
      { name: 'Fiery Red', hex: '#dc2626' }
    ],
    features: [
      'Hyundai SmartSense Level 2 ADAS (19 Autonomous Safety Features)',
      'Dual 10.25-inch Infotainment & Digital Cluster Displays',
      'Voice-Controlled Panoramic Sunroof & 8-Speaker BOSE Audio',
      'Front Row Ventilated Seats & 8-Way Powered Driver Seat',
      'Surround View Monitor (360 Camera) with Blind Spot View'
    ],
    specifications: {
      'Engine Capacity': '1,482 cc 4-Cylinder Turbo GDi',
      'Max Power': '160 PS @ 5,500 RPM',
      'Max Torque': '253 Nm @ 1,500 - 3,500 RPM',
      'Transmission': '7-Speed Dual Clutch (DCT) / 6-Speed MT',
      'Boot Capacity': '433 Litres',
      'Ground Clearance': '190 mm',
      'Fuel Efficiency': '18.4 km/l (ARAI Certified)'
    },
    isFeatured: true,
    isNewLaunch: true,
    variants: [
      { id: 'v-crt-01', sku: 'HYU-CRT-SX-DCT', name: 'Creta SX (O) 1.5 Turbo DCT - Atlas White', fuelType: 'Petrol', transmission: 'Automatic', color: 'Atlas White', colorHex: '#f8fafc', price: 1999900, waitingPeriod: 'Available Immediately', powerBhp: '160 PS', mileage: '18.4 km/l' },
      { id: 'v-crt-02', sku: 'HYU-CRT-SX-DSL', name: 'Creta SX (O) 1.5 Diesel AT - Abyss Black', fuelType: 'Diesel', transmission: 'Automatic', color: 'Abyss Black Pearl', colorHex: '#0f172a', price: 2014900, waitingPeriod: '2 Weeks', powerBhp: '116 PS', mileage: '21.8 km/l' },
      { id: 'v-crt-03', sku: 'HYU-CRT-SXO-MT', name: 'Creta SX (O) 1.5 Petrol MT - Ranger Khaki', fuelType: 'Petrol', transmission: 'Manual', color: 'Ranger Khaki', colorHex: '#57534e', price: 1727900, waitingPeriod: 'Available Immediately', powerBhp: '115 PS', mileage: '17.4 km/l' }
    ]
  },
  {
    id: 'hyundai-ioniq5',
    name: 'Hyundai Ioniq 5 Flagship EV',
    brand: 'Hyundai',
    type: 'Car',
    category: 'Electric Super-EV',
    tagline: 'World Car of the Year with Ultra-Fast 800V Architecture & 631 km WLTP Range.',
    description: 'Groundbreaking retro-futuristic electric flagship built on the dedicated E-GMP platform. Vehicle-to-Load (V2L) technology, relaxation seats with leg support, and 350kW DC fast charging from 10% to 80% in just 18 minutes.',
    basePrice: 4605000,
    acceleration: '0-100 km/h in 5.2s',
    topSpeed: '185 km/h',
    engineSpecs: '72.6 kWh High-Density Lithium-Ion Battery (217 PS / 350 Nm RWD)',
    seatingCapacity: 5,
    safetyRating: '5-Star Euro NCAP & Level 2+ ADAS',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Gravity Gold Matte', hex: '#d4af37' },
      { name: 'Optic White', hex: '#ffffff' },
      { name: 'Midnight Black Pearl', hex: '#0f172a' }
    ],
    features: [
      '800V Ultra-Fast Multi-Charging System (10-80% in 18 mins)',
      'Vehicle-to-Load (V2L) External Power Source up to 3.6 kW',
      'Sliding Universal Island Centre Console (140mm travel)',
      'Eco-Processed Pure Leather & Recycled Eco-Friendly Cabin',
      'Smart Regenerative Braking with i-Pedal One-Pedal Drive'
    ],
    specifications: {
      'Battery Capacity': '72.6 kWh Liquid-Cooled',
      'ARAI Certified Range': '631 km per full charge',
      'Max Power': '217 PS (160 kW)',
      'Max Torque': '350 Nm instantaneous',
      'Drivetrain': 'Rear-Wheel Drive (RWD) Dedicated EV Platform',
      'Wheelbase': '3,000 mm (Ultra-Spacious Lounge Cabin)'
    },
    isFeatured: true,
    isNewLaunch: true,
    variants: [
      { id: 'v-inq-01', sku: 'HYU-INQ5-GLD', name: 'Ioniq 5 RWD Long Range - Gravity Gold', fuelType: 'Electric', transmission: 'Automatic', color: 'Gravity Gold Matte', colorHex: '#d4af37', price: 4605000, waitingPeriod: 'Available Immediately', powerBhp: '217 PS', mileage: '631 km Range' },
      { id: 'v-inq-02', sku: 'HYU-INQ5-WHT', name: 'Ioniq 5 RWD Long Range - Optic White', fuelType: 'Electric', transmission: 'Automatic', color: 'Optic White', colorHex: '#ffffff', price: 4605000, waitingPeriod: '2 Weeks', powerBhp: '217 PS', mileage: '631 km Range' }
    ]
  },
  {
    id: 'hyundai-tucson',
    name: 'Hyundai Tucson 2.0 AWD Signature',
    brand: 'Hyundai',
    type: 'Car',
    category: 'Luxury SUV',
    tagline: 'Parametric Jewel Hidden Grille with HTRAC All-Wheel Drive & Executive Cabin.',
    description: 'The global benchmark of refined luxury SUVs. Featuring HTRAC AWD with Multi-Terrain modes, shift-by-wire push button gear selector, memory seats, and 29 Level 2 ADAS proactive safety systems.',
    basePrice: 2902000,
    acceleration: '0-100 km/h in 7.8s',
    topSpeed: '205 km/h',
    engineSpecs: '2.0L CRDi Turbo Diesel / 2.0L Nu Petrol (186 PS / 416 Nm)',
    seatingCapacity: 5,
    safetyRating: '5-Star Global Safety Rating',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Polar White Dual Tone', hex: '#f1f5f9' },
      { name: 'Amazon Grey', hex: '#334155' },
      { name: 'Phantom Black', hex: '#0f172a' },
      { name: 'Starry Night Blue', hex: '#1e3a8a' }
    ],
    features: [
      'HTRAC All-Wheel Drive with Sand, Mud & Snow Terrain Modes',
      'Multi-Air Mode Hidden Climate Control with Diffused Airflow',
      'Smart Power Tailgate with Height & Speed Adjustment',
      'Wireless Android Auto, Apple CarPlay & 64-Color Ambient Lights',
      '10-Way Power Adjustable Driver Seat with Memory Function'
    ],
    specifications: {
      'Displacement': '1,997 cc 4-Cylinder Diesel',
      'Max Power': '186 PS @ 4,000 RPM',
      'Max Torque': '416 Nm @ 2,000 - 2,750 RPM',
      'Transmission': '8-Speed Automatic with Paddle Shifters',
      'Drivetrain': 'HTRAC Intelligent Electronic AWD',
      'Boot Space': '540 Litres (expandable to 1,860L)'
    },
    variants: [
      { id: 'v-tuc-01', sku: 'HYU-TUC-SIG-AWD', name: 'Tucson Signature 2.0 Diesel AWD - Amazon Grey', fuelType: 'Diesel', transmission: 'Automatic', color: 'Amazon Grey', colorHex: '#334155', price: 3594000, waitingPeriod: 'Available Immediately', powerBhp: '186 PS', mileage: '15.3 km/l' },
      { id: 'v-tuc-02', sku: 'HYU-TUC-PLT-PET', name: 'Tucson Platinum 2.0 Petrol AT - Polar White', fuelType: 'Petrol', transmission: 'Automatic', color: 'Polar White Dual Tone', colorHex: '#f1f5f9', price: 2902000, waitingPeriod: '2 Weeks', powerBhp: '156 PS', mileage: '13.1 km/l' }
    ]
  },
  {
    id: 'hyundai-verna',
    name: 'Hyundai Verna 1.5 Turbo GDi',
    brand: 'Hyundai',
    type: 'Car',
    category: 'Performance Sedan',
    tagline: 'Futuristic Fastback Silhouette with Best-in-Segment 160 PS Turbo Power.',
    description: 'Sensuous Sportiness design philosophy in its purest form. Horizon LED positioning lamp, switchable climate & infotainment controller, cornering lamps, and thrilling paddle-shift acceleration.',
    basePrice: 1100400,
    acceleration: '0-100 km/h in 8.1s',
    topSpeed: '210 km/h',
    engineSpecs: '1.5L Turbo GDi 4-Cylinder (160 PS / 253 Nm)',
    seatingCapacity: 5,
    safetyRating: '5-Star Global NCAP (Adult & Child Safety)',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Tellurian Brown Pearl', hex: '#574136' },
      { name: 'Abyss Black', hex: '#0f172a' },
      { name: 'Atlas White', hex: '#ffffff' },
      { name: 'Starry Night', hex: '#1e3a5f' }
    ],
    features: [
      'Horizon Full-Width LED DRL & Connected LED Taillamps',
      'Dual 10.25-inch HD Screen with Integrated Ambient Lighting',
      'Heated & Ventilated Front Seats (Segment-First)',
      'Front Parking Sensors & Electronic Parking Brake with Auto Hold',
      'Smart Trunk Opening with Proximity Detection'
    ],
    specifications: {
      'Engine': '1,482 cc Turbo GDi Petrol',
      'Max Power': '160 PS @ 5,500 RPM',
      'Max Torque': '253 Nm @ 1,500 - 3,500 RPM',
      'Transmission': '7-Speed Dual-Clutch DCT with Paddle Shifts',
      'Wheelbase': '2,670 mm (Longest in Segment)',
      'Boot Space': '528 Litres'
    },
    variants: [
      { id: 'v-vrn-01', sku: 'HYU-VRN-SXO-DCT', name: 'Verna SX (O) 1.5 Turbo DCT - Tellurian Brown', fuelType: 'Petrol', transmission: 'Automatic', color: 'Tellurian Brown Pearl', colorHex: '#574136', price: 1738000, waitingPeriod: 'Available Immediately', powerBhp: '160 PS', mileage: '20.6 km/l' },
      { id: 'v-vrn-02', sku: 'HYU-VRN-SX-MT', name: 'Verna SX 1.5 Petrol MT - Atlas White', fuelType: 'Petrol', transmission: 'Manual', color: 'Atlas White', colorHex: '#ffffff', price: 1298000, waitingPeriod: 'Available Immediately', powerBhp: '115 PS', mileage: '18.6 km/l' }
    ]
  },
  {
    id: 'hyundai-venue-nline',
    name: 'Hyundai Venue N Line Turbo',
    brand: 'Hyundai',
    type: 'Car',
    category: 'Compact SUV',
    tagline: 'Track-Inspired Motorsport Styling with Dual Tip Exhaust & Tuned Suspension.',
    description: 'Engineered for driving enthusiasts. Featuring N Line specific dark chrome front grille, sporty red accents, tuned exhaust note, dashcam with dual camera, and N-branded leatherette upholstery.',
    basePrice: 1208000,
    acceleration: '0-100 km/h in 9.2s',
    topSpeed: '180 km/h',
    engineSpecs: '1.0L Kappa Turbo GDi Petrol (120 PS / 172 Nm)',
    seatingCapacity: 5,
    safetyRating: '6 Airbags Standard with Disc Brakes on all 4 Wheels',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Shadow Grey with Abyss Black Roof', hex: '#475569' },
      { name: 'Thunder Blue with Black Roof', hex: '#1e40af' },
      { name: 'Atlas White Dual Tone', hex: '#f8fafc' }
    ],
    features: [
      'Sporty Twin Tip Exhaust with Tuned Throttle Acoustics',
      'Dashcam with Dual Camera (Front & Cabin Recording)',
      '4-Wheel Disc Brakes & Sporty Red Brake Calipers',
      'N Line Leather-Wrapped Steering Wheel with Red Stitching',
      'Drive Modes (Eco, Normal, Sport) & Paddle Shifters'
    ],
    specifications: {
      'Displacement': '998 cc 3-Cylinder Turbo GDi',
      'Max Power': '120 PS @ 6,000 RPM',
      'Max Torque': '172 Nm @ 1,500 - 4,000 RPM',
      'Transmission': '7-Speed DCT with Sport Mode',
      'Fuel Tank': '45 Litres',
      'Boot Capacity': '350 Litres'
    },
    variants: [
      { id: 'v-ven-01', sku: 'HYU-VEN-N8-DCT', name: 'Venue N Line N8 DCT - Shadow Grey', fuelType: 'Petrol', transmission: 'Automatic', color: 'Shadow Grey with Abyss Black Roof', colorHex: '#475569', price: 1390000, waitingPeriod: 'Available Immediately', powerBhp: '120 PS', mileage: '18.3 km/l' },
      { id: 'v-ven-02', sku: 'HYU-VEN-N6-MT', name: 'Venue N Line N6 6-MT - Thunder Blue', fuelType: 'Petrol', transmission: 'Manual', color: 'Thunder Blue with Black Roof', colorHex: '#1e40af', price: 1208000, waitingPeriod: '2 Weeks', powerBhp: '120 PS', mileage: '18.0 km/l' }
    ]
  }
];
