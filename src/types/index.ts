export type VehicleType = 'Car';

export interface VehicleVariant {
  id: string;
  sku: string;
  name: string;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic' | 'Dual-Clutch AT' | string;
  color: string;
  colorHex: string;
  price: number; // in INR
  waitingPeriod: 'Available Immediately' | '2 Weeks' | '4 Weeks' | '6 Weeks' | string;
  powerBhp: string;
  mileage: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: VehicleType;
  category: 'Luxury SUV' | 'Performance Sedan' | 'Electric Super-EV' | 'Compact SUV' | string;
  tagline: string;
  description: string;
  basePrice: number;
  acceleration: string; // e.g., "0-100 km/h in 8.9s"
  topSpeed: string;
  engineSpecs: string;
  seatingCapacity: number;
  safetyRating: string;
  images: string[];
  colors: { name: string; hex: string; image?: string }[];
  features: string[];
  specifications: { [key: string]: string };
  variants: VehicleVariant[];
  isFeatured?: boolean;
  isNewLaunch?: boolean;
}

export interface TestDriveBooking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  variantText: string;
  mode: 'Showroom Test Drive' | 'Home / Office Doorstep';
  dealershipLocation: string;
  preferredDate: string;
  preferredTimeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  hasDrivingLicense: boolean;
  assignedAdvisor: string;
  status: 'Confirmed' | 'Completed' | 'Pending';
  createdAt: string;
}

export interface DealershipChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'advisor';
  text: string;
  timestamp: string;
}

export interface PublicCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  productsCount?: number;
}

