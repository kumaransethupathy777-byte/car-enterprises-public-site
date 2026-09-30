import { Vehicle, VehicleVariant, PublicCategory } from '../types';
import { SAMPLE_VEHICLES } from '../data/vehicles';

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ||
  (import.meta as any).env?.VITE_API_URL ||
  'https://car-enterprises-backend.onrender.com';

export function mapBackendToVehicle(raw: any, index: number): Vehicle {
  const images = Array.isArray(raw.gallery) && raw.gallery.length > 0
    ? raw.gallery.map((g: any) => (typeof g === 'string' ? g : g.src)).filter((src: string) => src && !src.startsWith('blob:'))
    : [];

  const cover = (raw.image && !raw.image.startsWith('blob:'))
    ? raw.image
    : (images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80');

  if (!images.includes(cover)) images.unshift(cover);

  const colors = [
    { name: 'Abyss Black Pearl', hex: '#0f172a' },
    { name: 'Atlas White', hex: '#f8fafc' },
    { name: 'Titan Grey', hex: '#475569' },
    { name: 'Fiery Red', hex: '#dc2626' },
    { name: 'Ranger Khaki', hex: '#57534e' }
  ];

  const variants: VehicleVariant[] = Array.isArray(raw.variants) && raw.variants.length > 0
    ? raw.variants.map((v: any, vIdx: number) => {
        const attrMap: Record<string, string> = {};
        if (Array.isArray(v.attributes)) {
          v.attributes.forEach((attr: any) => {
            if (attr?.name && attr?.value) {
              attrMap[attr.name.toLowerCase()] = String(attr.value);
            }
          });
        }

        const titleOrVal = (v.title || v.value || v.option || '').toLowerCase();
        let fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' = 'Petrol';
        if (attrMap['fuel']?.toLowerCase().includes('diesel') || attrMap['engine']?.toLowerCase().includes('diesel') || titleOrVal.includes('diesel') || titleOrVal.includes('crdi')) {
          fuelType = 'Diesel';
        } else if (attrMap['fuel']?.toLowerCase().includes('electric') || attrMap['battery'] || titleOrVal.includes('electric') || titleOrVal.includes('ev') || raw.category?.toLowerCase().includes('ev')) {
          fuelType = 'Electric';
        } else if (titleOrVal.includes('hybrid')) {
          fuelType = 'Hybrid';
        }

        let transmission: string = 'Automatic';
        if (attrMap['transmission']?.toLowerCase().includes('manual') || titleOrVal.includes('manual') || titleOrVal.includes(' 6mt') || titleOrVal.includes(' 5mt')) {
          transmission = 'Manual';
        } else if (attrMap['transmission']?.toLowerCase().includes('dct') || titleOrVal.includes('dct') || titleOrVal.includes('dual clutch')) {
          transmission = 'Dual-Clutch AT';
        } else if (attrMap['transmission']) {
          transmission = attrMap['transmission'];
        }

        const colorName = attrMap['color'] || colors[vIdx % colors.length].name;
        const colorHex = colors.find((c) => c.name.toLowerCase() === colorName.toLowerCase())?.hex || colors[vIdx % colors.length].hex;

        return {
          id: v.variantId || `var-${raw.id || raw.sku}-${vIdx}`,
          sku: v.sku || `${raw.sku || 'HYU'}-${vIdx + 1}`,
          name: v.title || v.value || `${raw.name} Variant ${vIdx + 1}`,
          fuelType,
          transmission,
          color: colorName,
          colorHex,
          price: Number(v.price) || Number(raw.price) || 1800000,
          waitingPeriod: (vIdx === 0 ? 'Available Immediately' : '2 Weeks') as any,
          powerBhp: attrMap['engine'] || attrMap['battery'] || (fuelType === 'Electric' ? '217 PS' : '160 PS'),
          mileage: fuelType === 'Electric' ? '631 km Range' : '18.4 km/l'
        };
      })
    : [
        {
          id: `var-${raw.id || raw.sku}-1`,
          sku: `${raw.sku || 'HYU'}-01`,
          name: `${raw.name} SX (O)`,
          fuelType: 'Petrol',
          transmission: 'Automatic',
          color: 'Abyss Black Pearl',
          colorHex: '#0f172a',
          price: Number(raw.price) || 1800000,
          waitingPeriod: 'Available Immediately',
          powerBhp: '160 PS',
          mileage: '18.4 km/l'
        }
      ];

  const fullDesc = raw.description || 'Experience extraordinary comfort, advanced SmartSense Level 2 ADAS, and refined powertrain performance.';
  const tagline = fullDesc.includes('.') ? fullDesc.split('.')[0] + '.' : fullDesc;

  return {
    id: raw.id || raw.sku || `veh-${index}`,
    name: raw.name || 'Hyundai Vehicle Offering',
    brand: 'Hyundai',
    type: 'Car',
    category: raw.category || 'Luxury SUV & Vehicles',
    tagline,
    description: fullDesc,
    basePrice: Number(raw.price) || (variants[0]?.price ?? 1700000),
    acceleration: raw.category?.toLowerCase().includes('ev') ? '0-100 km/h in 5.2s' : '0-100 km/h in 8.9s',
    topSpeed: '195 km/h',
    engineSpecs: raw.category?.toLowerCase().includes('ev')
      ? '72.6 kWh High-Density Lithium-Ion Battery (217 PS / 350 Nm)'
      : '1.5L Turbo GDi Petrol / 1.5L CRDi Diesel (160 PS / 253 Nm)',
    seatingCapacity: 5,
    safetyRating: '5-Star Safety with 6 Airbags Standard',
    images,
    colors,
    features: [
      'Hyundai SmartSense Level 2 ADAS (19 Autonomous Features)',
      'Dual 10.25-inch Infotainment & Digital Cluster Displays',
      'Voice-Enabled Panoramic Sunroof & 8-Speaker BOSE Audio',
      '5-Year Comprehensive Manufacturer Warranty'
    ],
    specifications: {
      'Max Power': raw.category?.toLowerCase().includes('ev') ? '217 PS (160 kW)' : '160 PS @ 5,500 RPM',
      'Max Torque': raw.category?.toLowerCase().includes('ev') ? '350 Nm Instantaneous' : '253 Nm @ 1,500 - 3,500 RPM',
      'Transmission': raw.category?.toLowerCase().includes('ev') ? 'Single Speed Reduction Gear' : '7-Speed Dual Clutch (DCT)',
      'Drivetrain': raw.category?.toLowerCase().includes('ev') ? 'Rear-Wheel Drive (RWD) Dedicated E-GMP' : 'Front-Wheel Drive / HTRAC AWD'
    },
    variants,
    isFeatured: true,
    isNewLaunch: true
  };
}

export const dealershipCatalogService = {
  /**
   * Fetch categories from POST /public/categories
   */
  async getCategories(): Promise<{ categories: PublicCategory[]; isLive: boolean }> {
    try {
      const res = await fetch(`${API_BASE_URL}/public/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 100 })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (json.success && json.data && Array.isArray(json.data.categories) && json.data.categories.length > 0) {
        return {
          categories: json.data.categories,
          isLive: true
        };
      }
      return { categories: [], isLive: true };
    } catch (e) {
      console.warn('Could not load categories from backend:', e);
      return { categories: [], isLive: false };
    }
  },

  /**
   * Fetch vehicles/products from POST /public/products
   */
  async getVehicles(categoryId?: string, search?: string): Promise<{ vehicles: Vehicle[]; isLive: boolean }> {
    try {
      const body: any = { limit: 50 };
      if (categoryId && categoryId !== 'All') {
        body.categoryId = categoryId;
      }
      if (search) {
        body.search = search;
      }

      const res = await fetch(`${API_BASE_URL}/public/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (json.success && json.data && Array.isArray(json.data.products) && json.data.products.length > 0) {
        const productsList = json.data.products;
        const vehicleProducts = productsList.filter(
          (p: any) =>
            !p.category ||
            p.category?.toLowerCase().includes('vehicle') ||
            p.category?.toLowerCase().includes('car') ||
            p.category?.toLowerCase().includes('hyundai') ||
            p.category?.toLowerCase().includes('automotive') ||
            p.category?.toLowerCase().includes('suv') ||
            p.category?.toLowerCase().includes('sedan') ||
            p.category?.toLowerCase().includes('ev')
        );

        const listToMap = vehicleProducts.length > 0 ? vehicleProducts : productsList;
        const mapped = listToMap.map(mapBackendToVehicle);

        return {
          vehicles: mapped,
          isLive: true
        };
      }

      return {
        vehicles: SAMPLE_VEHICLES,
        isLive: true
      };
    } catch (e) {
      console.warn('Could not load vehicles from backend, falling back to sample data:', e);
      return {
        vehicles: SAMPLE_VEHICLES,
        isLive: false
      };
    }
  }
};
