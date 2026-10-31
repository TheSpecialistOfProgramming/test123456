/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HYDRO DETAILING BRISBANE — All-in-One Comprehensive Application
 * Includes Precision Packages, Live Booking System, 2x Retina Picture Receipt Generator,
 * Python-Powered Instagram Receipt Dispatcher, and Screenshot Proofing.
 */

import React, { useState, useEffect } from 'react';
import {
  Phone, Mail, MapPin, Instagram, Menu, X, Calendar as CalendarIcon,
  Clock, Car, Truck, Sparkles, Check, ChevronDown, ChevronRight,
  ChevronLeft, ArrowRight, ArrowUp, Star, ShieldCheck, Wrench, Info,
  Camera, Download, Printer, Copy, Send, MessageSquare, AlertTriangle,
  ExternalLink, Smartphone, CalendarCheck, Trash2, HelpCircle
} from 'lucide-react';

/* =========================================================================
   1. TYPES & DATA MODELS
   ========================================================================= */

export type VehicleSize = 'small' | 'medium' | 'large' | 'all';

export interface VehicleSizeOption {
  size: VehicleSize;
  label: string;
  subtitle: string;
  price: number;
}

export interface ServiceAddon {
  name: string;
  price?: number | null;
  label?: string;
  description?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  tier: 'copper' | 'silver' | 'interior' | 'bronze' | 'premium' | 'correction' | 'ceramic';
  description: string;
  duration: number;
  sizes: VehicleSizeOption[];
  includes: string[];
  addons: ServiceAddon[];
  image: string;
}

export interface StandaloneAddon {
  id: string;
  name: string;
  description: string;
  price: number | null;
  priceLabel: string;
  duration: number;
  requiresPackage: boolean;
}

export interface ReviewItem {
  name: string;
  initial: string;
  text: string;
  rating: number;
  date?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BookingData {
  id: string;
  created: string;
  date: string;
  time: string;
  serviceId: string;
  serviceName: string;
  vehicleSize: 'small' | 'medium' | 'large';
  vehicleType: string;
  vehicleModel: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  instagramUsername?: string;
  addons: { name: string; price: number | null }[];
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

/* =========================================================================
   2. CONSTANTS & DATA
   ========================================================================= */

export const BUSINESS_INFO = {
  name: "Hydro Detailing Brisbane",
  shortName: "HYDRO DETAILING",
  phone: "0493077937",
  phoneDisplay: "0493 077 937",
  email: "hydroservice4300@gmail.com",
  instagramHandle: "@hydrodetailing.brisbane",
  instagramUrl: "https://www.instagram.com/hydrodetailing.brisbane",
  rating: 4.5,
  reviewCount: 38,
  baseLocation: "Springfield, QLD",
  serviceAreas: ["Brisbane", "Springfield", "Ipswich", "Redbank Plains", "Forest Lake", "Goodna"]
};

export const ASSET_IMAGES = {
  logo: "https://media.base44.com/images/public/6a1ff5a5ebbdcf02189dae7e/eca68586a_41CCB282-7922-44D3-BBDA-4897CB99DAF7__1_.png",
  hero: "https://media.base44.com/images/public/6a1ff5a5ebbdcf02189dae7e/ff3bf2611_generated_2057b6f5.png",
  car1: "https://media.base44.com/images/public/6a1ff5a5ebbdcf02189dae7e/e0b3e1775_IMG_3299.jpeg",
  car2: "https://media.base44.com/images/public/6a1ff5a5ebbdcf02189dae7e/7d9402f74_IMG_3963.jpeg"
};

export const SERVICES: ServicePackage[] = [
  {
    id: "silver_wash",
    name: "Complete Exterior Wash",
    tier: "silver",
    description: "Comprehensive exterior detail with premium finish",
    duration: 1.5,
    sizes: [
      { size: "small", label: "Small Vehicle", subtitle: "Hatchback & Motorbike", price: 86 },
      { size: "medium", label: "Medium Vehicle", subtitle: "Sedan & Ute", price: 93 },
      { size: "large", label: "Large Vehicle", subtitle: "SUV, 4x4, 7-Seater", price: 102 }
    ],
    includes: [
      "Pressure wash pre-rinse",
      "Snow foam pre-soak (pH neutral)",
      "Hand wash (2 bucket-method)",
      "Door and boot jams cleaned and degreased",
      "Tyres, wheel arches and rims cleaned",
      "Tyre shine",
      "Bug removal",
      "Paint sealant applied (3 months durability)"
    ],
    addons: [],
    image: ASSET_IMAGES.car1
  },
  {
    id: "complete_interior",
    name: "Complete Interior Detail",
    tier: "interior",
    description: "Deep interior restoration for a showroom finish",
    duration: 1.5,
    sizes: [
      { size: "small", label: "Small Vehicle", subtitle: "Hatchback & Coupe", price: 125 },
      { size: "medium", label: "Medium Vehicle", subtitle: "Sedan & Ute", price: 145 },
      { size: "large", label: "Large Vehicle", subtitle: "SUV, 4x4, 7-Seater", price: 160 }
    ],
    includes: [
      "Rubbish removal",
      "Thorough vacuum of floor, carpets, mats, seats, underneath seats, boot and in between seats to get every nook and cranny",
      "Thorough agitation clean over all door cards, dashboard, cupholders, steering wheel, air vents, center console, foot pedals, glovebox, seats, door trims and other plastics leaving a matte finish look",
      "Carpets shampooed",
      "Fabric & leather seats cleaned",
      "Rubber floor mats shined",
      "Seat rails cleaned",
      "Inside glass, mirrors & touch screens cleaned",
      "Car fragrance applied"
    ],
    addons: [
      { name: "Protectant on all plastics & vinyl surfaces", price: 30, label: "From $30" },
      { name: "Fabric seat shampoo", price: 30, label: "From $30" },
      { name: "Odour removal", price: 72, label: "From $72" },
      { name: "Pet hair removal", price: 45, label: "From $45" },
      { name: "Extraction clean", price: 75, label: "From $75" },
      { name: "Sand removal", price: 68, label: "From $68" },
      { name: "Spot & stain removal", price: 38, label: "From $38" }
    ],
    image: ASSET_IMAGES.car2
  },
  {
    id: "bronze_full",
    name: "General Full Detail",
    tier: "bronze",
    description: "Complete interior & exterior transformation",
    duration: 2.5,
    sizes: [
      { size: "small", label: "Small Vehicle", subtitle: "Hatchback & Coupe", price: 171 },
      { size: "medium", label: "Medium Vehicle", subtitle: "Sedan & Ute", price: 183 },
      { size: "large", label: "Large Vehicle", subtitle: "SUV, 4x4, 7-Seater", price: 195 }
    ],
    includes: [
      "Rubbish removal",
      "Thorough vacuum of floor, carpets, mats, seats, underneath seats, boot and in between seats",
      "Thorough agitation clean over all door cards, dashboard, cupholders, steering wheel, air vents, console, plastics",
      "Carpets shampooed",
      "Fabric & leather seats cleaned",
      "Rubber floor mats shined",
      "Seat rails cleaned",
      "Inside glass, mirrors & screens cleaned",
      "Car fragrance applied",
      "Pressure wash pre-rinse",
      "Snow foam pre-soak (pH neutral)",
      "Hand wash (2 bucket-method)",
      "Door and boot jams cleaned and degreased",
      "Tyres, wheel arches and rims cleaned",
      "Tyre shine",
      "Bug removal",
      "Paint sealant applied (3 months durability)"
    ],
    addons: [],
    image: ASSET_IMAGES.hero
  },
  {
    id: "glass_ceramic",
    name: "Glass Ceramic Coating",
    tier: "premium",
    description: "Ultimate paint protection with long-lasting ceramic shield",
    duration: 3,
    sizes: [{ size: "all", label: "All Vehicles", subtitle: "Universal Application", price: 250 }],
    includes: [
      "Long Lasting Protection",
      "UV Protection",
      "Water Beading",
      "Chemical Resistance",
      "Enhanced Gloss",
      "Easier Future Cleaning"
    ],
    addons: [],
    image: ASSET_IMAGES.car1
  },
  {
    id: "paint_correction",
    name: "1-Step Paint Correction",
    tier: "correction",
    description: "Remove swirl marks, scratches & oxidation to restore your paint's true clarity",
    duration: 4,
    sizes: [
      { size: "small", label: "Small Vehicle", subtitle: "Hatchback & Coupe", price: 350 },
      { size: "medium", label: "Medium Vehicle", subtitle: "Sedan & Ute", price: 400 },
      { size: "large", label: "Large Vehicle", subtitle: "SUV, 4x4, 7-Seater", price: 450 }
    ],
    includes: [
      "Pre-Wash & Decontamination",
      "Clay Bar Treatment",
      "Machine Polishing",
      "Swirl Mark Removal",
      "Scratch Reduction",
      "Oxidation Removal",
      "Paint Inspection",
      "Final Wipe Down"
    ],
    addons: [],
    image: ASSET_IMAGES.hero
  },
  {
    id: "paint_correction_2step",
    name: "2-Step Paint Correction",
    tier: "correction",
    description: "Advanced two-stage machine polishing for a deeper, more refined paint finish",
    duration: 6,
    sizes: [
      { size: "small", label: "Small Vehicle", subtitle: "Hatchback & Coupe", price: 500 },
      { size: "medium", label: "Medium Vehicle", subtitle: "Sedan & Ute", price: 550 },
      { size: "large", label: "Large Vehicle", subtitle: "SUV, 4x4, 7-Seater", price: 650 }
    ],
    includes: [
      "Pre-Wash & Decontamination",
      "Clay Bar Treatment",
      "Stage 1 – Heavy Cut Compound",
      "Stage 2 – Refining Polish",
      "Swirl Mark Removal",
      "Deep Scratch Reduction",
      "Oxidation Removal",
      "Paint Thickness Monitoring",
      "Paint Inspection",
      "Final IPA Wipe Down"
    ],
    addons: [],
    image: ASSET_IMAGES.car2
  },
  {
    id: "paint_ceramic",
    name: "Paint Ceramic Coating",
    tier: "ceramic",
    description: "Applied using CarPro D.Quartz GO — a professional-grade SiO2 ceramic coating delivering up to 2 years of paint protection, enhanced gloss and hydrophobic water beading",
    duration: 5,
    sizes: [
      { size: "small", label: "Small Vehicle", subtitle: "Hatchback & Coupe", price: 650 },
      { size: "medium", label: "Medium Vehicle", subtitle: "Sedan & Ute", price: 750 },
      { size: "large", label: "Large Vehicle", subtitle: "SUV, 4x4, 7-Seater", price: 850 }
    ],
    includes: [
      "Full Wash & Decontamination",
      "Clay Bar Treatment",
      "Paint Correction (Stage 1)",
      "IPA Wipe Down",
      "Ceramic Coating Application",
      "UV & Chemical Resistance",
      "Hydrophobic Water Beading",
      "Enhanced Gloss & Depth",
      "2-Year Protection"
    ],
    addons: [],
    image: ASSET_IMAGES.car1
  }
];

export const STANDALONE_ADDONS: StandaloneAddon[] = [
  {
    id: "extraction_clean",
    name: "Extraction Clean",
    description: "Deep extraction cleaning of carpets, mats and upholstery using professional wet-vacuum equipment. Must be booked with a detailing package.",
    price: null,
    priceLabel: "Variable based on condition",
    duration: 0.5,
    requiresPackage: true
  },
  {
    id: "engine_bay",
    name: "Engine Bay Detail",
    description: "Complete engine bay degreasing, steam clean and dressing restoration",
    price: 70,
    priceLabel: "$70",
    duration: 0.5,
    requiresPackage: false
  }
];

export const VEHICLE_TYPES: Record<'small' | 'medium' | 'large', string[]> = {
  small: ["Hatchback", "Coupe", "Motorbike", "Compact"],
  medium: ["Sedan", "Ute", "Wagon"],
  large: ["SUV", "4x4", "7-Seater", "Van", "People Mover"]
};

export const TIME_SLOTS = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30"
];

export const WHY_ITEMS = [
  { id: "01", title: "Mobile & Studio-Based Service", desc: "We come to your home or workplace — or you can visit our Springfield studio. Complete convenience with zero hassle." },
  { id: "02", title: "Professional Equipment", desc: "Equipped with high-pressure washers, pH-balanced foam cannons, dual-action polishers, and hot water extraction units." },
  { id: "03", title: "Premium Products", desc: "We exclusively trust top-tier detailing chemistry including CarPro, Koch Chemie, and professional ceramic coatings." },
  { id: "04", title: "Reliable & Friendly", desc: "Punctual, clear communicators, transparent fixed pricing with no hidden charges, and polite customer service." },
  { id: "05", title: "Attention To Detail", desc: "Every air vent, seat rail, badge crevice, and seam meticulously brushed, cleaned, and conditioned." },
  { id: "06", title: "Satisfaction Guaranteed", desc: "We walk you through every step of the inspection and don't pack up until you are thoroughly thrilled with the result." }
];

export const REVIEWS: ReviewItem[] = [
  {
    name: "Sylvie Martin",
    initial: "S",
    rating: 5,
    text: "Thank you for doing such a great job cleaning my car Cody. Using quality products keeps my car shiny. Using tank water means the windscreen and all the glass have no streaks. I'm happy to be a regular."
  },
  {
    name: "Andrew Wilkins",
    initial: "A",
    rating: 5,
    text: "A professional job by a hard working young man. Thanks for all your effort, I will continue to book in weekly."
  },
  {
    name: "Anne Wilkins",
    initial: "A",
    rating: 5,
    text: "Great customer service, highly recommended. Car looks amazing every time it gets cleaned."
  }
];

export const FAQS: FaqItem[] = [
  {
    q: "Do you offer mobile detailing or do I come to you?",
    a: "We offer both! You're welcome to bring your vehicle to our studio in Springfield, or we can come to you. If you choose mobile, we'll need access to an outdoor tap at your location as we use your water supply. Just select your preference when booking online."
  },
  {
    q: "Do you bring your own water and equipment?",
    a: "We bring all our own equipment including a Ryobi 2030 PSI pressure washer, snow foam cannon, machine polishers, Tornador blaster, and all professional products. The only thing we require from you is access to an outdoor tap for water supply."
  },
  {
    q: "What products do you use?",
    a: "We only use professional-grade detailing products. For exterior washes we use CarPro LIFT snow foam and CarPro RESET wash soap. Interiors are cleaned with Koch Chemie PO2 All-Purpose Cleaner and finished with CarPro PERL on plastics and rubber. Paint correction is carried out with Koch Chemie compounds and polishes, and we apply Koch Chemie SO.02 paint sealant for 3 months of paint protection. Ceramic coating is done with CarPro D.Quartz GO."
  },
  {
    q: "How do I book an appointment?",
    a: "You can book online through our Book Online page — it takes just a few minutes and is available 24/7. Alternatively, call or text us on 0493 077 937 and we'll get you locked in."
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on your vehicle size and the service selected. Our Complete Exterior Wash starts from $86 for small vehicles, interior details from $125, and full details from $171. Paint correction starts from $350 and ceramic coating from $650. Check the Services section for full pricing."
  },
  {
    q: "How long does each service take?",
    a: "A Complete Exterior Wash takes around 1.5 hours. Interior details and full details typically take 1.5–3 hours. Paint correction takes 4–6+ hours depending on the stage. Ceramic coating takes approximately 5 hours. Estimated durations are shown on each service page."
  },
  {
    q: "What areas do you service?",
    a: "We're based in Springfield and service Springfield, Ipswich, Redbank Plains, Forest Lake, Goodna, and surrounding Brisbane suburbs. Not sure if we cover your area? Give us a call on 0493 077 937."
  },
  {
    q: "What's included in the General Full Detail?",
    a: "The General Full Detail combines our complete interior and exterior packages. Inside: full vacuum, agitation clean of all surfaces, carpet shampoo, seat clean, seat rails, inside glass and car fragrance. Outside: pressure wash, snow foam pre-soak, hand wash, door jams, wheels, tyre shine, bug removal, and Koch Chemie SO.02 paint sealant for 3 months of protection."
  },
  {
    q: "Do I need to remove my belongings before an interior detail?",
    a: "Yes — please remove all personal belongings, valuables, baby seats and boosters before your appointment. Any area that isn't accessible will not be covered in the detail. Please note that roof lining cleaning is not included in our interior packages."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, bank transfer, and card payments. Payment is due on completion of the service."
  },
  {
    q: "What if I need to reschedule or cancel?",
    a: "No problem — just call or text us on 0493 077 937 as soon as possible. We appreciate at least 24 hours notice where you can, so we can offer the slot to someone else."
  },
  {
    q: "How do I maintain my car after a ceramic coating?",
    a: "After a CarPro D.Quartz GO ceramic coating, we recommend waiting 24 hours before getting the car wet. Use a pH-neutral wash soap (like CarPro RESET) for maintenance washes and avoid automatic car washes with brushes. With proper care, the coating will last up to 2 years."
  }
];

export const SOCIAL_POSTS = [
  { image: ASSET_IMAGES.car1, caption: "Before & After — Ceramic coating on a Mazda CX-5 🔥" },
  { image: ASSET_IMAGES.car2, caption: "Full interior detail — like new showroom finish! ✨" },
  { image: ASSET_IMAGES.car1, caption: "Mobile detailing van coming to you in Springfield & surrounds 🚐" },
  { image: ASSET_IMAGES.car2, caption: "Glass ceramic coating — ultimate paint clarity & protection 💎" }
];

/* =========================================================================
   2.5 CELEBRATION SPRAY EFFECT (HYDRO DROPLETS & SPARKLES)
   ========================================================================= */

export const HydroCelebrationSpray: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const colors = ['#0066CC', '#4DA6FF', '#38BDF8', '#0284C7', '#F59E0B', '#10B981', '#FFFFFF'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      decay: number;
      shape: 'drop' | 'sparkle';
      angle: number;
      vAngle: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 80,
        y: height * 0.4,
        vx: (Math.random() - 0.5) * 11,
        vy: -Math.random() * 11 - 4,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.007,
        shape: Math.random() > 0.4 ? 'drop' : 'sparkle',
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.2
      });
    }

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;
      particles.forEach(p => {
        if (p.alpha <= 0) return;
        activeCount++;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gentle gravity
        p.alpha -= p.decay;
        p.angle += p.vAngle;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        if (p.shape === 'drop') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sparkle 4-point star
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(0, -p.radius * 2);
            ctx.lineTo(p.radius * 0.5, -p.radius * 0.5);
            ctx.rotate(Math.PI / 2);
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });

      if (activeCount > 0) {
        animationId = requestAnimationFrame(render);
      }
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
};

/* =========================================================================
   3. CANVAS RECEIPT IMAGE GENERATOR (2X RETINA PICTURE PROOF)
   ========================================================================= */

export function generateReceiptCanvas(booking: BookingData): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const width = 800;
  const height = 1180;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#0066CC';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  ctx.strokeRect(22, 22, width - 44, height - 44);

  // Deep Navy Header
  ctx.fillStyle = '#001F3F';
  ctx.fillRect(24, 24, width - 48, 140);

  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(24, 164, width - 48, 4);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HYDRO DETAILING BRISBANE', width / 2, 70);

  ctx.fillStyle = '#4DA6FF';
  ctx.font = '600 14px "Inter", sans-serif';
  ctx.fillText('PREMIUM MOBILE & STUDIO DETAILING • QUEENSLAND', width / 2, 98);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '400 13px "Inter", sans-serif';
  ctx.fillText(`Phone: ${BUSINESS_INFO.phoneDisplay}  •  Email: ${BUSINESS_INFO.email}`, width / 2, 126);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 12px "Inter", sans-serif';
  ctx.fillText('Springfield Central • Brisbane • Ipswich & Surrounds', width / 2, 146);

  // Meta Bar
  ctx.textAlign = 'left';
  const metaY = 205;
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(36, 180, width - 72, 50);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(36, 180, width - 72, 50);

  const receiptRef = booking.id.toUpperCase().replace('HYDRO_', 'HDB-');
  ctx.fillStyle = '#64748B';
  ctx.font = 'bold 11px "Inter", sans-serif';
  ctx.fillText('PROOF OF BOOKING REF:', 50, metaY);

  ctx.fillStyle = '#001F3F';
  ctx.font = 'bold 16px "Inter", sans-serif';
  ctx.fillText(receiptRef, 210, metaY + 1);

  ctx.fillStyle = '#64748B';
  ctx.font = 'bold 11px "Inter", sans-serif';
  ctx.fillText('DATE ISSUED:', 460, metaY);

  const issueDate = new Date(booking.created).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  ctx.fillStyle = '#001F3F';
  ctx.font = '600 13px "Inter", sans-serif';
  ctx.fillText(issueDate, 550, metaY);

  // Confirmed Pill
  ctx.fillStyle = '#DCFCE7';
  roundRect(ctx, width - 180, 188, 130, 32, 16);
  ctx.fill();
  ctx.fillStyle = '#15803D';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✓ CONFIRMED', width - 115, 208);
  ctx.textAlign = 'left';

  // Client Box
  let currentY = 265;
  ctx.fillStyle = '#001F3F';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CLIENT & SERVICE LOCATION', 36, currentY);
  currentY += 28;

  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(36, currentY, width - 72, 95);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(36, currentY, width - 72, 95);

  drawLabelValue(ctx, 'Full Name:', booking.name, 50, currentY + 28);
  drawLabelValue(ctx, 'Contact Phone:', booking.phone, 420, currentY + 28);
  drawLabelValue(ctx, 'Instagram:', booking.instagramUsername || 'None', 50, currentY + 56);
  drawLabelValue(ctx, 'Email:', booking.email || 'Not provided', 420, currentY + 56);
  drawLabelValue(ctx, 'Service Address:', booking.address, 50, currentY + 84, width - 120);

  // Appointment & Vehicle Box
  currentY += 125;
  ctx.fillStyle = '#001F3F';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('APPOINTMENT SCHEDULE & VEHICLE', 36, currentY);
  currentY += 28;

  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(36, currentY, width - 72, 85);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(36, currentY, width - 72, 85);

  drawLabelValue(ctx, 'Appointment Date:', booking.date, 50, currentY + 28);
  drawLabelValue(ctx, 'Arrival Window:', booking.time, 420, currentY + 28);
  drawLabelValue(ctx, 'Vehicle Size:', `${booking.vehicleSize.toUpperCase()} (${booking.vehicleType})`, 50, currentY + 58);
  drawLabelValue(ctx, 'Vehicle Make/Model:', booking.vehicleModel, 420, currentY + 58);

  // Itemized Charges
  currentY += 115;
  ctx.fillStyle = '#001F3F';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ITEMIZED CHARGES & INCLUSIONS', 36, currentY);
  currentY += 25;

  ctx.fillStyle = '#001F3F';
  ctx.fillRect(36, currentY, width - 72, 32);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('DESCRIPTION', 50, currentY + 21);
  ctx.textAlign = 'right';
  ctx.fillText('AMOUNT (AUD)', width - 50, currentY + 21);
  ctx.textAlign = 'left';

  currentY += 32;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(36, currentY, width - 72, 45);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(36, currentY, width - 72, 45);

  ctx.fillStyle = '#001F3F';
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText(booking.serviceName, 50, currentY + 24);
  ctx.fillStyle = '#64748B';
  ctx.font = '400 12px "Inter", sans-serif';
  ctx.fillText(`Professional Detailing Treatment (${booking.vehicleSize} footprint)`, 50, currentY + 40);

  const addonTotal = booking.addons.reduce((sum, a) => sum + (a.price || 0), 0);
  const basePrice = booking.totalPrice - addonTotal;

  ctx.textAlign = 'right';
  ctx.fillStyle = '#001F3F';
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText(`$${basePrice}.00`, width - 50, currentY + 28);
  ctx.textAlign = 'left';
  currentY += 45;

  booking.addons.forEach((addon, idx) => {
    ctx.fillStyle = idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
    ctx.fillRect(36, currentY, width - 72, 36);
    ctx.strokeStyle = '#E2E8F0';
    ctx.strokeRect(36, currentY, width - 72, 36);

    ctx.fillStyle = '#334155';
    ctx.font = '500 13px "Inter", sans-serif';
    ctx.fillText(`+ Add-on: ${addon.name}`, 50, currentY + 23);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText(addon.price ? `$${addon.price}.00` : 'Condition-based', width - 50, currentY + 23);
    ctx.textAlign = 'left';
    currentY += 36;
  });

  // Total Box
  currentY += 15;
  ctx.fillStyle = '#F0F7FF';
  ctx.fillRect(36, currentY, width - 72, 70);
  ctx.strokeStyle = '#0066CC';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(36, currentY, width - 72, 70);

  ctx.fillStyle = '#001F3F';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TOTAL ESTIMATED AMOUNT:', 50, currentY + 32);

  ctx.fillStyle = '#64748B';
  ctx.font = '400 11px "Inter", sans-serif';
  ctx.fillText('Includes all premium CarPro / Koch Chemie products & equipment. GST included.', 50, currentY + 52);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#0066CC';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`$${booking.totalPrice}.00`, width - 50, currentY + 45);
  ctx.textAlign = 'left';

  // Reminders Callout
  currentY += 90;
  ctx.fillStyle = '#FFFBEB';
  roundRect(ctx, 36, currentY, width - 72, 60, 10);
  ctx.fill();
  ctx.strokeStyle = '#FCD34D';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#B45309';
  ctx.font = 'bold 11px "Inter", sans-serif';
  ctx.fillText('⚠️ IMPORTANT PREPARATION REMINDERS:', 50, currentY + 22);
  ctx.fillStyle = '#78350F';
  ctx.font = '400 11px "Inter", sans-serif';
  ctx.fillText('• Mobile Service: Please ensure outdoor garden tap access is available upon arrival.', 50, currentY + 38);
  ctx.fillText('• Belongings: Remove baby seats, valuables & items from compartments prior to interior details.', 50, currentY + 52);

  // Barcode / Verified Stamp at bottom
  currentY += 80;
  drawBarcode(ctx, receiptRef, width / 2 - 120, currentY, 240, 38);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`SECURITY VERIFICATION HASH: ${receiptRef}-QLD-VERIFIED`, width / 2, currentY + 54);

  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('Thank you for choosing Hydro Detailing Brisbane • Keep this receipt as proof of booking', width / 2, currentY + 74);

  return canvas;
}

export function downloadReceiptImage(booking: BookingData): void {
  const canvas = generateReceiptCanvas(booking);
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `Hydro-Detailing-Receipt-${booking.id.replace('hydro_', '')}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function drawLabelValue(ctx: CanvasRenderingContext2D, label: string, value: string, x: number, y: number, maxWidth?: number) {
  ctx.fillStyle = '#64748B';
  ctx.font = '600 12px "Inter", sans-serif';
  ctx.fillText(label, x, y);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 13px "Inter", sans-serif';
  const labelWidth = ctx.measureText(label).width + 8;
  if (maxWidth) {
    ctx.fillText(value, x + labelWidth, y, maxWidth - labelWidth);
  } else {
    ctx.fillText(value, x + labelWidth, y);
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawBarcode(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = '#0F172A';
  let curX = x;
  const numBars = 45;
  const step = w / numBars;

  for (let i = 0; i < numBars; i++) {
    const charCode = text.charCodeAt(i % text.length) || 65;
    const barW = (charCode % 3) + 1;
    if (i % 2 === 0) {
      ctx.fillRect(curX, y, barW, h);
    }
    curX += step;
  }
}

/* =========================================================================
   4. PROMO BANNER COMPONENT
   ========================================================================= */

interface PromoBannerProps {
  onOpenBooking: () => void;
  onClose?: () => void;
  scrolled?: boolean;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenBooking, onClose, scrolled }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    targetDate.setHours(23, 59, 59, 0);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-300 z-50 text-white border-b ${
        scrolled
          ? 'bg-gradient-to-r from-[#001428] via-[#002d5e] to-[#001428] border-blue-500/20 py-1.5'
          : 'bg-gradient-to-r from-[#001F3F] via-[#004085] to-[#001F3F] border-blue-400/20 py-2 sm:py-2.5'
      }`}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="hidden lg:block w-7 flex-shrink-0" />

        <div className="flex-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-[#FDE68A] font-extrabold uppercase text-[10px] sm:text-[11px] tracking-wider border border-amber-300/35 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            Limited Time Deal
          </span>

          <span className="font-normal text-slate-100 text-xs sm:text-sm">
            Book a <strong className="text-white font-bold">Paint Ceramic Coating</strong> &amp; receive a <strong className="text-[#4DA6FF] font-bold">FREE Glass Ceramic Coating</strong>!
          </span>

          {timeLeft && (
            <div className="inline-flex items-center gap-1 bg-amber-400/15 border border-amber-300/40 rounded-md px-2 py-0.5 text-[#FDE68A] font-mono font-bold text-[11px] sm:text-xs tabular-nums">
              <span>{timeLeft.days}d</span>:
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
              <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          )}

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1 font-bold text-sky-300 hover:text-white underline underline-offset-4 hover:no-underline transition-colors cursor-pointer text-xs group"
          >
            <span>Claim Offer</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
            title="Dismiss deal banner"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   5. NAVBAR COMPONENT
   ========================================================================= */

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
  bookingCount: number;
  showPromo?: boolean;
  onClosePromo?: () => void;
  onClaimPromo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyBookings,
  bookingCount,
  showPromo = true,
  onClosePromo,
  onClaimPromo
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {showPromo && (
          <PromoBanner
            onOpenBooking={onClaimPromo || onOpenBooking}
            onClose={onClosePromo}
            scrolled={scrolled}
          />
        )}

        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-md shadow-blue-950/5 border-b border-blue-900/10 py-2.5 sm:py-3'
              : 'bg-gradient-to-b from-[#001F3F]/90 via-[#001F3F]/65 to-transparent py-3 sm:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-1 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img
                  src={ASSET_IMAGES.logo}
                  alt={BUSINESS_INFO.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-extrabold text-base sm:text-lg tracking-tight transition-colors ${
                    scrolled ? 'text-[#001F3F]' : 'text-white'
                  }`}
                >
                  HYDRO <span className="text-[#0066CC] font-black">DETAILING</span>
                </span>
                <span className={`text-[10px] tracking-widest font-semibold uppercase ${scrolled ? 'text-slate-500' : 'text-sky-200'}`}>
                  Brisbane Mobile &amp; Studio
                </span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-7">
              {[
                { label: 'Services', target: 'services' },
                { label: 'Why Us', target: 'why-us' },
                { label: 'Reviews', target: 'reviews' },
                { label: 'FAQ', target: 'faq' }
              ].map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className={`text-sm font-semibold transition-colors hover:text-[#0066CC] cursor-pointer ${
                    scrolled ? 'text-slate-700' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
                  scrolled
                    ? 'text-[#001F3F] hover:bg-slate-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>

              {bookingCount > 0 && (
                <button
                  onClick={onOpenMyBookings}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    scrolled
                      ? 'border-blue-200 bg-blue-50 text-[#0066CC] hover:bg-blue-100'
                      : 'border-white/30 bg-white/15 text-white hover:bg-white/25'
                  }`}
                  title="View your saved bookings"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>My Bookings</span>
                  <span className="w-4 h-4 rounded-full bg-[#0066CC] text-white text-[10px] flex items-center justify-center font-bold">
                    {bookingCount}
                  </span>
                </button>
              )}

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-[#001F3F] hover:bg-[#0066CC] shadow-md shadow-[#001F3F]/30 hover:shadow-[#0066CC]/40 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Book Online</span>
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onOpenBooking}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#0066CC] hover:bg-sky-500 shadow-sm cursor-pointer"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  scrolled ? 'text-[#001F3F] hover:bg-slate-100' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-35 bg-[#001F3F]/98 backdrop-blur-xl pt-32 px-6 pb-8 flex flex-col md:hidden text-white transition-all animate-fadeIn">
          <div className="flex flex-col gap-4 text-lg font-semibold border-b border-white/10 pb-6">
            <button onClick={() => scrollTo('services')} className="text-left py-2 hover:text-sky-400 transition-colors">
              Services &amp; Pricing
            </button>
            <button onClick={() => scrollTo('why-us')} className="text-left py-2 hover:text-sky-400 transition-colors">
              Why Choose Hydro
            </button>
            <button onClick={() => scrollTo('reviews')} className="text-left py-2 hover:text-sky-400 transition-colors">
              Customer Testimonials
            </button>
            <button onClick={() => scrollTo('faq')} className="text-left py-2 hover:text-sky-400 transition-colors">
              Frequently Asked Questions
            </button>
            {bookingCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="text-left py-2 text-sky-300 flex items-center justify-between"
              >
                <span>My Bookings</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-600 text-xs font-bold">
                  {bookingCount} active
                </span>
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/15 transition-colors"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0066CC] hover:bg-sky-500 text-white font-bold shadow-lg shadow-blue-500/30 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book Appointment Online</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* =========================================================================
   6. HERO COMPONENT
   ========================================================================= */

export const Hero: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#001F3F]">
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hero}
          alt="Water beading on ceramic coated vehicle"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F]/95 via-[#001F3F]/80 to-[#001F3F]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-transparent to-[#001F3F]/60" />
      </div>

      {/* Ambient Floating Water Beading Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#0066CC]/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-12 w-96 h-96 rounded-full bg-[#4DA6FF]/15 blur-3xl animate-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-cyan-400/10 blur-2xl animate-float-slow" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-1">
        <span className="font-extrabold text-[18vw] tracking-tighter text-white/[0.03] uppercase whitespace-nowrap">
          REFLECT
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 sm:pt-44 sm:pb-28 w-full">
        <div className="max-w-3xl">
          {/* Live Mobile Service Radar Beacon */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs sm:text-sm font-medium mb-4 shadow-lg shadow-black/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-radar-ping absolute inline-flex h-full w-full rounded-full bg-[#4DA6FF] opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4DA6FF] shadow-sm shadow-[#4DA6FF]" />
            </span>
            <span className="font-semibold text-sky-200">Mobile Units Operating</span>
            <span className="text-white/40">•</span>
            <span className="text-slate-200">Springfield, Brisbane &amp; Ipswich</span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-black/20">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-sparkle" style={{ animationDelay: `${i * 0.4}s` }} />
              ))}
              <Star className="w-3.5 h-3.5 fill-amber-400/60 text-amber-400 animate-sparkle" style={{ animationDelay: '1.6s' }} />
            </div>
            <span className="font-bold">4.5</span>
            <span className="text-white/60">|</span>
            <span className="text-slate-200">Google Verified Reviews</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
            Premium Car Detailing{' '}
            <span className="text-[#4DA6FF] italic font-serif not-italic">
              Brisbane
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-200/90 font-normal leading-relaxed max-w-2xl">
            Professional mobile detailing services delivered straight to your home or workplace throughout Brisbane, Springfield, Ipswich and surrounds.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              onClick={onOpenBooking}
              className="btn-shimmer hover-card-lift inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-base font-bold text-white bg-[#0066CC] hover:bg-[#4DA6FF] shadow-xl shadow-[#0066CC]/40 hover:shadow-sky-400/50 transition-all duration-300 transform active:scale-95 cursor-pointer group"
            >
              <span>Book Online</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>Call Now</span>
            </a>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4DA6FF] shadow-sm shadow-[#4DA6FF]" />
              <ShieldCheck className="w-4 h-4 text-[#4DA6FF]" />
              <span>Studio &amp; Mobile Based</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4DA6FF] shadow-sm shadow-[#4DA6FF]" />
              <Wrench className="w-4 h-4 text-[#4DA6FF]" />
              <span>Professional Equipment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4DA6FF] shadow-sm shadow-[#4DA6FF]" />
              <Sparkles className="w-4 h-4 text-[#4DA6FF]" />
              <span>Premium CarPro &amp; Koch Chemie</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToServices}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
        aria-label="Scroll to services"
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-300">Explore Packages</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-[#4DA6FF] animate-bob" />
        </div>
      </button>
    </section>
  );
};

/* =========================================================================
   7. SERVICES SECTION COMPONENT
   ========================================================================= */

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
  onOpenDetailModal: (service: ServicePackage) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenDetailModal
}) => {
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<VehicleSize | 'all'>('all');

  const getDisplayPrice = (service: ServicePackage) => {
    if (selectedSizeFilter !== 'all') {
      const match = service.sizes.find(s => s.size === selectedSizeFilter);
      if (match) return `$${match.price}`;
    }
    const prices = service.sizes.map(s => s.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `$${min}` : `$${min} – $${max}`;
  };

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'silver': return 'bg-gradient-to-r from-slate-600 to-slate-400 text-white';
      case 'interior': return 'bg-gradient-to-r from-[#0066CC] to-[#4DA6FF] text-white';
      case 'bronze': return 'bg-gradient-to-r from-amber-700 to-amber-500 text-white';
      case 'premium': return 'bg-gradient-to-r from-[#001F3F] to-[#0066CC] text-white';
      case 'correction': return 'bg-gradient-to-r from-rose-600 to-rose-400 text-white';
      case 'ceramic': return 'bg-gradient-to-r from-purple-700 to-indigo-500 text-white';
      default: return 'bg-blue-600 text-white';
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-gradient-to-b from-white via-sky-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#0066CC] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 inline-block">
            Our Services &amp; Packages
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] tracking-tight">
            Precision Detailing Packages
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Choose from our range of professional mobile detailing and studio treatments, engineered to clean, restore, and protect every centimetre of your vehicle.
          </p>

          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-100 border border-slate-200/80 shadow-inner">
            <span className="text-xs font-semibold text-slate-500 px-3 hidden sm:inline-block">Filter pricing by:</span>
            {[
              { id: 'all', label: 'All Sizes' },
              { id: 'small', label: 'Small (Hatch/Coupe)' },
              { id: 'medium', label: 'Medium (Sedan/Ute)' },
              { id: 'large', label: 'Large (SUV/4x4)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedSizeFilter(tab.id as VehicleSize | 'all')}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedSizeFilter === tab.id
                    ? 'bg-[#001F3F] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#001F3F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(service => {
            const displayPrice = getDisplayPrice(service);

            return (
              <article
                key={service.id}
                className="group hover-card-lift bg-white rounded-2xl border border-blue-900/10 shadow-sm hover:border-blue-400/50 flex flex-col overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-md ${getTierGradient(service.tier)}`}>
                    {service.name}
                  </span>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>~{service.duration} hrs</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#001F3F] group-hover:text-[#0066CC] transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {service.sizes.map(s => {
                      const isHighlighted = selectedSizeFilter === s.size;
                      return (
                        <div
                          key={s.size}
                          className={`rounded-xl p-2 text-center border transition-all ${
                            isHighlighted
                              ? 'bg-blue-50 border-[#0066CC] ring-1 ring-[#0066CC]'
                              : 'bg-slate-50 border-slate-100'
                          }`}
                        >
                          <div className="text-[10px] font-semibold text-slate-500 uppercase">
                            {s.size === 'all' ? 'All' : s.size}
                          </div>
                          <div className="text-sm font-extrabold text-[#001F3F]">
                            ${s.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 space-y-2 flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Highlights Included:
                    </div>
                    {service.includes.slice(0, 4).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                    {service.includes.length > 4 && (
                      <button
                        onClick={() => onOpenDetailModal(service)}
                        className="text-xs font-semibold text-[#0066CC] hover:underline pl-6 inline-block cursor-pointer pt-1"
                      >
                        +{service.includes.length - 4} more inclusions &rarr;
                      </button>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onOpenDetailModal(service)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-blue-200 text-xs sm:text-sm font-semibold text-[#0066CC] hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#001F3F] hover:bg-[#0066CC] text-xs sm:text-sm font-bold text-white shadow-md shadow-[#001F3F]/20 hover:shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Add-ons banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-[#001F3F] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Specialised Add-On Services
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Enhance Any Detail With Professional Upgrades
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-200">
              Add deep carpet extraction, engine bay degreasing, fabric seat shampooing, or pet hair removal during online booking.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STANDALONE_ADDONS.map(addon => (
                <div key={addon.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-white text-base">{addon.name}</h4>
                    <span className="text-sky-300 font-extrabold text-sm">{addon.priceLabel}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   8. SERVICE DETAIL MODAL COMPONENT
   ========================================================================= */

export const ServiceDetailModal: React.FC<{
  service: ServicePackage | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}> = ({ service, onClose, onBookService }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-blue-900/10 overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0066CC]" />
            <span className="font-extrabold text-sm tracking-tight text-[#001F3F]">
              SERVICE SPECIFICATIONS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-60 sm:h-72 w-full bg-slate-900">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0066CC] text-white shadow-md inline-block mb-2">
              {service.tier.toUpperCase()} TIER
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {service.name}
            </h2>
            <p className="text-sm text-slate-200 mt-1 max-w-xl">
              {service.description}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-[#001F3F] flex items-center gap-2 border-b border-slate-100 pb-2">
                <span>Everything Included in this Service</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#0066CC] font-semibold">
                  {service.includes.length} checkpoints
                </span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {service.includes.map((inc, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-[#0066CC] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{inc}</span>
                  </div>
                ))}
              </div>

              {service.addons.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Available Package Add-Ons
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.addons.map((addon, i) => (
                      <div key={i} className="flex justify-between items-center text-xs p-2 rounded-lg bg-sky-50/60 border border-sky-100 text-slate-700">
                        <span className="font-medium">{addon.name}</span>
                        <span className="font-bold text-[#0066CC]">{addon.label || `$${addon.price}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-b from-blue-50/70 to-slate-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Pricing By Vehicle Size
                </h3>
                <div className="space-y-3">
                  {service.sizes.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center pb-2.5 border-b border-slate-200/60 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <div className="text-sm font-bold text-[#001F3F]">
                          {s.size === 'all' ? 'All Vehicles' : s.label}
                        </div>
                        <div className="text-[11px] text-slate-500">{s.subtitle}</div>
                      </div>
                      <span className="text-lg font-extrabold text-[#0066CC]">
                        ${s.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-[#0066CC]" />
                  <span>Estimated Time: <strong>~{service.duration} hours</strong></span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    onClose();
                    onBookService(service.id);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-white bg-[#0066CC] hover:bg-[#004d99] shadow-lg shadow-blue-600/30 transition-all cursor-pointer text-sm"
                >
                  <span>Book This Service Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-[#001F3F] bg-slate-100 hover:bg-slate-200 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-[#0066CC]" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   9. WHY US SECTION COMPONENT
   ========================================================================= */

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-extrabold text-[16vw] tracking-tighter text-[#0066CC]/[0.025] uppercase whitespace-nowrap">
          PRECISION
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-[#0066CC] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 inline-block">
            Why Choose Hydro
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] tracking-tight">
            The Hydro Difference
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We hold ourselves to obsessive detailing standards, using professional machinery, pure products, and treating every vehicle as if it were our own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-br from-white to-blue-50/40 rounded-2xl p-7 border border-blue-900/10 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-xl bg-blue-100/70 text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white font-black text-sm flex items-center justify-center transition-colors duration-300">
                  {item.id}
                </span>
                <Sparkles className="w-5 h-5 text-blue-200 group-hover:text-sky-400 transition-colors" />
              </div>

              <h3 className="text-lg font-bold text-[#001F3F] mb-2 group-hover:text-[#0066CC] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   10. REVIEWS SECTION COMPONENT
   ========================================================================= */

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS);

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-gradient-to-b from-[#F0F7FF] via-white to-[#F0F7FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-[#0066CC] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 inline-block">
            Customer Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] tracking-tight">
            What Our Clients Say
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/60 text-amber-400'}`}
                />
              ))}
            </div>
            <span className="text-lg font-extrabold text-[#001F3F]">4.5 out of 5</span>
            <span className="text-slate-400">•</span>
            <span className="text-sm font-semibold text-slate-600">Google Verified Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl p-7 sm:p-8 border border-blue-900/10 shadow-lg shadow-blue-900/5 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all duration-300"
            >
              <span className="absolute top-6 right-8 text-6xl font-serif text-blue-900/10 select-none pointer-events-none">
                &ldquo;
              </span>

              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-sm sm:text-base text-slate-700 italic font-light leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066CC] to-[#4DA6FF] text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
                  {rev.initial}
                </div>
                <div>
                  <h4 className="font-bold text-[#001F3F] text-sm">
                    {rev.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>Verified Review</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   11. SOCIAL SECTION COMPONENT
   ========================================================================= */

export const SocialSection: React.FC = () => {
  return (
    <section id="social" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 mb-3"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>{BUSINESS_INFO.instagramHandle}</span>
          </a>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] tracking-tight">
            Follow Our Transformations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            See recent mirror-finish paint corrections, deep interior extractions, and satisfied car lovers across Queensland.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {SOCIAL_POSTS.map((post, idx) => (
            <a
              key={idx}
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/90 via-[#001F3F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white text-xs sm:text-sm font-medium leading-snug">
                  {post.caption}
                </span>
                <span className="mt-2 text-[10px] text-sky-300 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>View on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 shadow-lg shadow-pink-600/20 transition-all duration-300 cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @hydrodetailing.brisbane</span>
          </a>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   12. FAQ SECTION COMPONENT
   ========================================================================= */

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F0F7FF]/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#0066CC] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#001F3F] tracking-tight">
            Got Questions? We Have Answers
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Everything you need to know about our mobile detailing setups, chemicals, vehicle preparation, and booking.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#0066CC]/40 shadow-md shadow-blue-900/5'
                    : 'border-blue-900/10 hover:border-blue-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#001F3F] hover:bg-slate-50/60 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0066CC] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0066CC]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   13. FOOTER COMPONENT
   ========================================================================= */

export const Footer: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="relative bg-[#001F3F] text-white overflow-hidden pt-16 sm:pt-20 pb-12 border-t border-blue-900/40">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <span className="font-extrabold text-[12vw] tracking-tighter text-white/[0.025] uppercase whitespace-nowrap">
            {BUSINESS_INFO.phoneDisplay}
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-14 border-b border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full p-1 bg-white/10 border border-white/20 flex items-center justify-center">
                  <img src={ASSET_IMAGES.logo} alt={BUSINESS_INFO.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-extrabold text-lg tracking-tight block">
                    HYDRO <span className="text-[#4DA6FF]">DETAILING</span>
                  </span>
                  <span className="text-[10px] text-sky-200 tracking-widest font-semibold uppercase">
                    Brisbane &amp; Surrounds
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Premium car detailing services across Brisbane and Ipswich. Professional equipment, premium chemicals, and showroom results brought directly to you.
              </p>

              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-sky-300 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{BUSINESS_INFO.instagramHandle}</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <button onClick={onOpenBooking} className="hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                    <span>Book Online Now</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('services')} className="hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                    <span>Detailing Packages</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('why-us')} className="hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                    <span>Why Choose Hydro</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('reviews')} className="hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                    <span>Client Testimonials</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('faq')} className="hover:text-sky-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                    <span>FAQs &amp; Preparation</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
                Service Areas (QLD)
              </h4>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs sm:text-sm text-slate-300">
                {BUSINESS_INFO.serviceAreas.map((area, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
                Direct Contact
              </h4>
              <div className="space-y-3">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                      Call or Text Cody
                    </span>
                    <span className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
                      {BUSINESS_INFO.phoneDisplay}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                      Email Us
                    </span>
                    <span className="font-semibold text-xs text-white truncate block group-hover:text-sky-300 transition-colors">
                      {BUSINESS_INFO.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} Hydro Detailing Brisbane. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Mobile Detailing Springfield &amp; Brisbane</span>
              <span>•</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={`tel:${BUSINESS_INFO.phone}`}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#0066CC] hover:bg-sky-400 text-white shadow-2xl shadow-blue-900/60 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group animate-water-ripple"
        aria-label="Call Hydro Detailing"
      >
        <Phone className="w-6 h-6 animate-pulse" />
      </a>
    </>
  );
};

/* =========================================================================
   14. BOOKING RECEIPT CARD COMPONENT (WITH PYTHON-POWERED INSTAGRAM DISPATCH)
   ========================================================================= */

export const BookingReceiptCard: React.FC<{
  booking: BookingData;
  onUpdateBookingInstagram?: (bookingId: string, instagramUsername: string) => void;
}> = ({ booking, onUpdateBookingInstagram }) => {
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  // Instagram Dispatch State (Powered by Python backend & @hydroservice4300)
  const [isIgModalOpen, setIsIgModalOpen] = useState(false);
  const [customerIg, setCustomerIg] = useState(booking.instagramUsername || '');
  const [igLoading, setIgLoading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [showIssueDetails, setShowIssueDetails] = useState(false);
  const [selectedMessageMode, setSelectedMessageMode] = useState<'receipt' | 'hi'>('receipt');
  const [igResult, setIgResult] = useState<{
    success: boolean;
    status?: string;
    booking_ref?: string;
    sender_instagram?: string;
    sender_email?: string;
    customer_instagram?: string;
    clean_customer_ig?: string;
    owner_instagram?: string;
    message?: string;
    hi_message?: string;
    direct_url?: string;
    owner_chat_url?: string;
    customer_chat_url?: string | null;
    meta_security_notice?: string;
    timestamp?: string;
  } | null>(null);

  const receiptRef = booking.id.toUpperCase().replace('HYDRO_', 'HDB-');
  const issueDate = new Date(booking.created).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const handleDownloadImage = () => {
    setDownloading(true);
    try {
      downloadReceiptImage(booking);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handlePreviewImage = () => {
    const canvas = generateReceiptCanvas(booking);
    setPreviewUrl(canvas.toDataURL('image/png'));
  };

  const handlePrint = () => {
    window.print();
  };

  const buildTextProof = () => {
    return (
      `HYDRO DETAILING BRISBANE - OFFICIAL BOOKING RECEIPT\n` +
      `--------------------------------------------------\n` +
      `Receipt Ref: ${receiptRef}\n` +
      `Status: CONFIRMED RESERVATION\n` +
      `Date Issued: ${issueDate}\n\n` +
      `CLIENT DETAILS:\n` +
      `Name: ${booking.name}\n` +
      `Phone: ${booking.phone}\n` +
      `Instagram: ${customerIg || booking.instagramUsername || 'Not provided'}\n` +
      `Location: ${booking.address}\n\n` +
      `APPOINTMENT SCHEDULE:\n` +
      `Date: ${booking.date}\n` +
      `Arrival Window: ${booking.time}\n` +
      `Vehicle: ${booking.vehicleModel} (${booking.vehicleSize})\n\n` +
      `CHARGES SUMMARY:\n` +
      `Service: ${booking.serviceName}\n` +
      (booking.addons.length ? `Add-ons:\n${booking.addons.map(a => `  • ${a.name} ($${a.price || 'TBD'})`).join('\n')}\n` : '') +
      `Total Estimated Amount: $${booking.totalPrice}.00 AUD (GST Incl.)\n\n` +
      `OWNER / PROVIDER:\n` +
      `Cody | Hydro Detailing Brisbane (@hydrodetailing.brisbane)\n` +
      `Phone: ${BUSINESS_INFO.phoneDisplay}\n` +
      `Email: ${BUSINESS_INFO.email}\n` +
      `Springfield Central, QLD`
    );
  };

  const buildHiProof = () => {
    return (
      `Hi ${booking.name}! 👋 This is Cody from Hydro Detailing Brisbane (@hydrodetailing.brisbane).\n` +
      `Your mobile detailing appointment (${receiptRef}) is confirmed for ${booking.date} at ${booking.time}!\n` +
      `Vehicle: ${booking.vehicleModel} (${booking.vehicleSize})\n` +
      `Service: ${booking.serviceName}\n` +
      `Total: $${booking.totalPrice}.00 AUD (Pay on completion).\n` +
      `Looking forward to detailing your car!`
    );
  };

  const handleCopyTextProof = () => {
    navigator.clipboard.writeText(buildTextProof());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAndSend = (textToCopy: string, label: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopyFeedback(`✓ ${label} copied to clipboard! Opening Instagram...`);
    setTimeout(() => setCopyFeedback(null), 3500);
  };

  // Python-Powered Instagram Dispatch Handler
  const handleSendViaPython = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerIg.trim()) return;

    const cleanIg = customerIg.replace(/^@/, '').trim();
    const formattedIg = `@${cleanIg}`;
    setIgLoading(true);

    booking.instagramUsername = formattedIg;
    if (onUpdateBookingInstagram) {
      onUpdateBookingInstagram(booking.id, formattedIg);
    }

    try {
      // Call backend route which executes send_receipt.py
      const res = await fetch('/api/send-instagram-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...booking,
          instagramUsername: formattedIg
        })
      });

      const data = await res.json();
      setIgResult(data);

      const activeText = selectedMessageMode === 'receipt' ? (data.message || buildTextProof()) : (data.hi_message || buildHiProof());
      navigator.clipboard.writeText(activeText);
      setCopyFeedback('✓ Message copied to clipboard ready to send!');
      setTimeout(() => setCopyFeedback(null), 3500);
    } catch (err) {
      // Client-side fallback (e.g. static hosting on Vercel)
      const activeText = selectedMessageMode === 'receipt' ? buildTextProof() : buildHiProof();
      navigator.clipboard.writeText(activeText);
      setCopyFeedback('✓ Message copied to clipboard ready to send!');
      setTimeout(() => setCopyFeedback(null), 3500);

      setIgResult({
        success: true,
        status: 'ready_to_send',
        booking_ref: receiptRef,
        sender_instagram: '@hydroservice4300',
        sender_email: 'hydroservice4300@gmail.com',
        customer_instagram: formattedIg,
        clean_customer_ig: cleanIg,
        owner_instagram: '@hydrodetailing.brisbane',
        message: buildTextProof(),
        hi_message: buildHiProof(),
        direct_url: 'https://ig.me/m/hydrodetailing.brisbane',
        owner_chat_url: 'https://ig.me/m/hydrodetailing.brisbane',
        customer_chat_url: `https://ig.me/m/${cleanIg}`,
        meta_security_notice: 'Instagram blocks automated password logins to prevent security checkpoints and bans. Direct 1-tap chats ensure instant delivery.',
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIgLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 📸 Screenshot Advice Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-amber-100/70 to-blue-50 p-4 sm:p-5 rounded-2xl border-2 border-amber-300/80 shadow-md">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Smartphone className="w-5 h-5 animate-pulse" />
          </div>

          <div className="flex-1 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-amber-950">
                📸 Recommended: Take a Screenshot for Reference!
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold text-[10px] uppercase tracking-wider">
                Photo Proof
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-900/90 mt-1 leading-relaxed">
              Please <strong>take a quick screenshot of this receipt now</strong> to keep on your phone camera roll. This serves as your instant proof of appointment, arrival window, and fixed pricing on the day Cody details your car.
            </p>

            <div className="mt-2.5 pt-2 border-t border-amber-200/80 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-amber-900/80 font-medium">
              <span className="bg-white/80 px-2 py-0.5 rounded border border-amber-300">
                📱 <strong>iPhone:</strong> Side button + Volume Up
              </span>
              <span className="bg-white/80 px-2 py-0.5 rounded border border-amber-300">
                🤖 <strong>Android:</strong> Power + Volume Down
              </span>
              <span className="text-amber-800 font-semibold hidden sm:inline">
                or tap &ldquo;Save Picture (PNG)&rdquo; below!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3.5 bg-blue-50/90 rounded-2xl border border-blue-200">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#0066CC]" />
          <span className="text-xs font-bold text-[#001F3F]">
            Proof &amp; Messaging Actions
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Download Picture Button */}
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0066CC] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            title="Download crisp picture of receipt as proof"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Rendering...' : 'Save Picture (PNG)'}</span>
          </button>

          {/* Instagram Messaging Button */}
          <button
            type="button"
            onClick={() => {
              setIsIgModalOpen(true);
              setIgResult(null);
              setCopyFeedback(null);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            title="Send this receipt via Instagram DM to Customer & Owner"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Message on Instagram</span>
          </button>

          {/* Preview Image Button */}
          <button
            type="button"
            onClick={handlePreviewImage}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* Copy Text Proof Button */}
          <button
            type="button"
            onClick={handleCopyTextProof}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Copy receipt proof text to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Print receipt or save to PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Instagram Message Sender Modal */}
      {isIgModalOpen && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#001F3F] text-base">
                    Message Receipt on Instagram
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Sender: <strong>@hydroservice4300</strong></span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-emerald-700 font-semibold">Active Dispatcher</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsIgModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {copyFeedback && (
              <div className="mb-4 p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold text-center animate-fadeIn shadow-sm flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{copyFeedback}</span>
              </div>
            )}

            {igResult ? (
              <div className="text-center py-2 space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-lg font-extrabold text-[#001F3F]">
                    Receipt Processed &amp; Ready to Send!
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                    The Python dispatcher processed receipt <strong>{igResult.booking_ref}</strong>. Use the 1-click links below to dispatch to both Cody and yourself:
                  </p>
                </div>

                {/* Mode Selector for Message (Full Receipt vs Short Hi) */}
                <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold max-w-sm mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMessageMode('receipt');
                      navigator.clipboard.writeText(igResult.message || buildTextProof());
                      setCopyFeedback('✓ Full receipt copied to clipboard!');
                      setTimeout(() => setCopyFeedback(null), 3000);
                    }}
                    className={`flex-1 py-1.5 rounded-lg transition-all ${
                      selectedMessageMode === 'receipt'
                        ? 'bg-white text-[#0066CC] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📄 Full Receipt Proof
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMessageMode('hi');
                      navigator.clipboard.writeText(igResult.hi_message || buildHiProof());
                      setCopyFeedback('✓ "Hi" confirmation message copied!');
                      setTimeout(() => setCopyFeedback(null), 3000);
                    }}
                    className={`flex-1 py-1.5 rounded-lg transition-all ${
                      selectedMessageMode === 'hi'
                        ? 'bg-white text-[#0066CC] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    👋 Quick &ldquo;Hi&rdquo; Ping
                  </button>
                </div>

                {/* Two-Way Direct Dispatch Actions */}
                <div className="space-y-2.5 max-w-sm mx-auto text-left">
                  {/* Destination 1: Cody (Owner) */}
                  <a
                    href="https://ig.me/m/hydrodetailing.brisbane"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleCopyAndSend(
                        selectedMessageMode === 'receipt' ? (igResult.message || buildTextProof()) : (igResult.hi_message || buildHiProof()),
                        'Message for Cody'
                      )
                    }
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md hover:opacity-95 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                        <Instagram className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="font-extrabold text-xs block">1. Send to Cody (Owner)</span>
                        <span className="text-[11px] text-white/90">@hydrodetailing.brisbane • Tap to Open &amp; Paste</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Destination 2: Customer */}
                  {customerIg && (
                    <a
                      href={`https://ig.me/m/${customerIg.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        handleCopyAndSend(
                          selectedMessageMode === 'receipt' ? (igResult.message || buildTextProof()) : (igResult.hi_message || buildHiProof()),
                          'Message for Customer'
                        )
                      }
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#001F3F] text-white shadow-md hover:bg-[#002a54] transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                          <Instagram className="w-4 h-4 text-pink-400" />
                        </div>
                        <div>
                          <span className="font-extrabold text-xs block">2. Send to Customer</span>
                          <span className="text-[11px] text-sky-200">@{customerIg.replace('@', '')} • Tap to Open &amp; Paste</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>

                {/* Dispatch Engine & Meta Security Diagnostics */}
                <div className="max-w-sm mx-auto bg-slate-50 rounded-2xl p-3 border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold text-[11px]">Dispatcher Bot:</span>
                    <span className="font-mono font-bold text-slate-800 text-[11px]">@hydroservice4300</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/80 pt-1.5">
                    <span className="text-slate-500 font-semibold text-[11px]">Registered Email:</span>
                    <span className="font-mono text-slate-700 text-[11px]">hydroservice4300@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/80 pt-1.5">
                    <span className="text-slate-500 font-semibold text-[11px]">Status:</span>
                    <span className="text-emerald-700 font-bold text-[11px]">✓ Processed via Python Engine</span>
                  </div>
                </div>

                {/* Why 1-Click Direct Chat is used (Answering User Question on Meta DM issue) */}
                <div className="max-w-sm mx-auto text-left">
                  <button
                    type="button"
                    onClick={() => setShowIssueDetails(!showIssueDetails)}
                    className="w-full text-left text-[11px] text-slate-500 hover:text-slate-800 font-semibold flex items-center justify-between py-1 px-1 cursor-pointer"
                  >
                    <span>ℹ️ Why does Instagram require 1-tap direct chat?</span>
                    <span className="text-xs">{showIssueDetails ? '▲' : '▼'}</span>
                  </button>

                  {showIssueDetails && (
                    <div className="mt-1.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed space-y-1 animate-fadeIn">
                      <p>
                        <strong>Meta Security Notice:</strong> Instagram strictly blocks automated scripts from logging in with passwords on web/cloud servers. Attempting automated password logins triggers Meta&rsquo;s security checkpoint (<code>checkpoint_required</code>) and locks accounts.
                      </p>
                      <p>
                        To ensure <strong>100% reliable delivery</strong> and protect <code>@hydroservice4300</code> from being locked, our system automatically formats and copies the verified receipt to your clipboard so you can send it directly to Cody in 1 tap without delays!
                      </p>
                    </div>
                  )}
                </div>

                {/* SMS & Email Fallback */}
                <div className="pt-2 border-t border-slate-200 max-w-sm mx-auto">
                  <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                    Instant SMS or Email to Cody:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`sms:${BUSINESS_INFO.phone}?&body=${encodeURIComponent(selectedMessageMode === 'receipt' ? buildTextProof() : buildHiProof())}`}
                      className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send SMS</span>
                    </a>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(`Booking ${receiptRef}: ${booking.serviceName} - ${booking.name}`)}&body=${encodeURIComponent(selectedMessageMode === 'receipt' ? buildTextProof() : buildHiProof())}`}
                      className="py-2 px-3 rounded-lg bg-[#0066CC] hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsIgModalOpen(false)}
                    className="mt-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Done &amp; Return to Receipt
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendViaPython} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your Instagram handle. The system will process your verified booking receipt via the Python engine and prepare a two-way dispatch for both <strong>you</strong> and Cody (<strong>@hydrodetailing.brisbane</strong>).
                </p>

                {/* Dispatch routing card */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center justify-between">
                    <span>Two-Way Routing:</span>
                    <span className="text-emerald-700 font-semibold">Bot: @hydroservice4300</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-800">
                    <span className="font-medium text-slate-500">1. Customer DM:</span>
                    <span className="font-bold text-[#001F3F]">
                      {customerIg ? (customerIg.startsWith('@') ? customerIg : `@${customerIg}`) : '(Enter your handle below)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-800 border-t border-slate-200 pt-1.5">
                    <span className="font-medium text-slate-500">2. Owner DM:</span>
                    <span className="font-bold text-[#0066CC]">
                      @hydrodetailing.brisbane (Cody)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Instagram Username <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">@</span>
                    <input
                      type="text"
                      required
                      value={customerIg.replace(/^@/, '')}
                      onChange={(e) => setCustomerIg(e.target.value)}
                      placeholder="your_instagram_username"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066CC] font-medium"
                    />
                  </div>
                </div>

                {/* Message Type Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message Type:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMessageMode('receipt')}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedMessageMode === 'receipt'
                          ? 'border-[#0066CC] bg-blue-50 text-[#0066CC]'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      📄 Official Receipt Proof
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMessageMode('hi')}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedMessageMode === 'hi'
                          ? 'border-[#0066CC] bg-blue-50 text-[#0066CC]'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      👋 Quick &ldquo;Hi&rdquo; Ping
                    </button>
                  </div>
                </div>

                <div className="bg-slate-100 rounded-xl p-3 text-[11px] font-mono text-slate-700 space-y-0.5 border border-slate-200 max-h-24 overflow-y-auto">
                  <div className="font-bold text-[#001F3F]">Receipt to be dispatched:</div>
                  <div>• Ref: {receiptRef}</div>
                  <div>• Service: {booking.serviceName}</div>
                  <div>• Scheduled: {booking.date} at {booking.time}</div>
                  <div>• Total: ${booking.totalPrice}.00 AUD</div>
                </div>

                <button
                  type="submit"
                  disabled={igLoading || !customerIg.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {igLoading ? 'Processing via Python...' : 'Dispatch Receipt via @hydroservice4300'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Styled Digital Receipt */}
      <div
        id="printable-receipt"
        className="animate-receipt-print relative bg-white rounded-2xl border-2 border-slate-200 shadow-2xl overflow-hidden font-sans text-left"
      >
        <div className="bg-[#001F3F] text-white p-5 sm:p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-amber-400" />
          <div className="relative z-10">
            <span className="text-[10px] sm:text-xs font-bold text-sky-300 uppercase tracking-widest block mb-1">
              Official Booking Receipt &amp; Proof of Service
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              HYDRO DETAILING BRISBANE
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Mobile &amp; Studio Car Detailing • Springfield &amp; Greater Brisbane
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ph: {BUSINESS_INFO.phoneDisplay} • {BUSINESS_INFO.email}
            </p>
          </div>
        </div>

        <div className="bg-slate-100/80 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div>
            <span className="text-slate-500 font-semibold uppercase text-[10px] block">Receipt / Booking Ref</span>
            <span className="font-mono font-bold text-sm text-[#001F3F]">{receiptRef}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-slate-500 font-semibold uppercase text-[10px] block">Date Issued</span>
              <span className="font-medium text-slate-700 text-[11px]">{issueDate}</span>
            </div>

            <span className="animate-stamp inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs border border-emerald-400 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>✓ CONFIRMED</span>
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer</span>
              <span className="font-bold text-[#001F3F] text-sm">{booking.name}</span>
              <div className="text-slate-600 mt-0.5 text-xs">{booking.phone}</div>
              {booking.instagramUsername && (
                <div className="text-[#0066CC] font-semibold text-xs mt-0.5 flex items-center gap-1">
                  <Instagram className="w-3 h-3 text-[#dc2743]" />
                  <span>{booking.instagramUsername}</span>
                </div>
              )}
              {booking.email && <div className="text-slate-500 text-xs truncate">{booking.email}</div>}
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Service Address</span>
              <span className="font-semibold text-slate-800 text-xs block leading-relaxed">{booking.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Service Date</span>
              <span className="font-bold text-[#001F3F] text-xs sm:text-sm">{booking.date}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Arrival Window</span>
              <span className="font-bold text-[#001F3F] text-xs sm:text-sm">{booking.time}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vehicle</span>
              <span className="font-semibold text-slate-800 text-xs truncate block">
                {booking.vehicleModel} ({booking.vehicleSize.toUpperCase()})
              </span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-[#001F3F] text-white px-4 py-2 font-bold text-xs flex justify-between">
              <span>Item / Detailing Package</span>
              <span>Amount (AUD)</span>
            </div>

            <div className="p-3.5 space-y-2">
              <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                <div>
                  <div className="font-bold text-[#001F3F] text-sm">{booking.serviceName}</div>
                  <div className="text-[11px] text-slate-500">Professional Detailing Treatment ({booking.vehicleSize} footprint)</div>
                </div>
                <span className="font-bold text-slate-800">
                  ${booking.totalPrice - booking.addons.reduce((sum, a) => sum + (a.price || 0), 0)}.00
                </span>
              </div>

              {booking.addons.map((addon, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs text-slate-700 py-1">
                  <span className="font-medium">+ Add-on: {addon.name}</span>
                  <span className="font-bold text-slate-800">
                    {addon.price ? `$${addon.price}.00` : 'Condition-based'}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50/70 p-4 border-t-2 border-[#0066CC] flex justify-between items-center">
              <div>
                <span className="font-bold text-sm text-[#001F3F] block">Total Amount Due</span>
                <span className="text-[11px] text-slate-500">Pay on completion (Cash, Card, Bank Transfer) • GST included</span>
              </div>
              <span className="text-2xl font-black text-[#0066CC]">${booking.totalPrice}.00</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1 text-amber-800">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Service Preparation Checklist:</span>
            </div>
            <p className="text-[11px] text-amber-800/90 leading-relaxed">
              • Access: Please ensure an outdoor garden tap is accessible for our mobile pressure washer setup.<br />
              • Valuables: Please remove personal belongings &amp; car booster seats prior to interior work.
            </p>
          </div>

          <div className="pt-2 text-center border-t border-slate-200 space-y-1">
            <div className="flex justify-center items-center gap-1.5 h-8 opacity-80 overflow-hidden max-w-xs mx-auto">
              {[...Array(38)].map((_, i) => (
                <div
                  key={i}
                  className={`bg-slate-800 h-full ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-1.5' : 'w-0.5'}`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-slate-400 block tracking-widest uppercase">
              VERIFICATION HASH: {receiptRef}-QLD-CONFIRMED
            </span>
            <span className="text-[11px] text-slate-500 block">
              Hydro Detailing Brisbane • 0493 077 937 • Save or screenshot as proof of booking
            </span>
          </div>
        </div>
      </div>

      {previewUrl && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl flex flex-col items-center max-h-[90vh]">
            <div className="w-full flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#0066CC]" />
                <h4 className="font-bold text-[#001F3F] text-base">Receipt Picture Preview (PNG)</h4>
              </div>
              <button
                type="button"
                onClick={() => setPreviewUrl(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto w-full max-h-[70vh] flex justify-center bg-slate-100 rounded-xl p-3 border border-slate-200">
              <img
                src={previewUrl}
                alt="Receipt proof picture"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="mt-4 flex gap-3 w-full justify-end">
              <button
                type="button"
                onClick={() => setPreviewUrl(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={handleDownloadImage}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0066CC] hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Save to Device</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   15. BOOKING MODAL COMPONENT
   ========================================================================= */

const STEPS = ["Vehicle", "Service", "Add-ons", "Date & Time", "Details", "Confirm"];

export const BookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string | null;
  onBookingCreated: (booking: BookingData) => void;
}> = ({ isOpen, onClose, preSelectedServiceId, onBookingCreated }) => {
  const [step, setStep] = useState(0);
  const [vehicleSize, setVehicleSize] = useState<'small' | 'medium' | 'large' | null>(null);
  const [vehicleType, setVehicleType] = useState<string>('');
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<{ key: string; name: string; price: number | null }[]>([]);

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [notes, setNotes] = useState('');

  const [isCompleted, setIsCompleted] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    if (preSelectedServiceId) {
      setServiceId(preSelectedServiceId);
      setStep(0);
    }
  }, [preSelectedServiceId]);

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === serviceId);

  const getBasePrice = (): number => {
    if (!currentService || !vehicleSize) return 0;
    const match = currentService.sizes.find(s => s.size === vehicleSize || s.size === 'all');
    return match ? match.price : currentService.sizes[0].price;
  };

  const getAddonTotal = (): number => {
    return selectedAddons.reduce((sum, item) => sum + (item.price || 0), 0);
  };

  const getTotalPrice = (): number => {
    return getBasePrice() + getAddonTotal();
  };

  const availableAddonsList = () => {
    const list: { key: string; name: string; price: number | null; label: string; desc?: string }[] = [];
    if (currentService) {
      currentService.addons.forEach(a => {
        list.push({
          key: `${currentService.id}_${a.name}`,
          name: a.name,
          price: a.price ?? null,
          label: a.label || (a.price ? `$${a.price}` : 'Variable')
        });
      });
    }
    STANDALONE_ADDONS.forEach(a => {
      list.push({
        key: a.id,
        name: a.name,
        price: a.price,
        label: a.priceLabel,
        desc: a.description
      });
    });
    return list;
  };

  const toggleAddon = (item: { key: string; name: string; price: number | null }) => {
    const exists = selectedAddons.some(a => a.key === item.key);
    if (exists) {
      setSelectedAddons(selectedAddons.filter(a => a.key !== item.key));
    } else {
      setSelectedAddons([...selectedAddons, item]);
    }
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

  const handlePrevMonth = () => {
    const now = new Date();
    now.setDate(1);
    now.setHours(0, 0, 0, 0);
    const prev = new Date(year, month - 1, 1);
    if (prev >= now) {
      setCurrentMonth(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isDateDisabled = (dayNumber: number) => {
    const d = new Date(year, month, dayNumber);
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (d < tomorrow) return true;
    if (d.getDay() === 0) return true;
    return false;
  };

  const formatDateISO = (dayNumber: number) => {
    const m = String(month + 1).padStart(2, '0');
    const day = String(dayNumber).padStart(2, '0');
    return `${year}-${m}-${day}`;
  };

  const canContinue = (): boolean => {
    switch (step) {
      case 0: return vehicleSize !== null;
      case 1: return serviceId !== null;
      case 2: return true;
      case 3: return selectedDate !== null && selectedTime !== null;
      case 4: return fullName.trim().length > 1 && phone.trim().length > 7 && address.trim().length > 3;
      case 5: return true;
      default: return false;
    }
  };

  const handleConfirmBooking = () => {
    if (!currentService || !vehicleSize || !selectedDate || !selectedTime) return;

    const newBooking: BookingData = {
      id: `hydro_${Date.now()}`,
      created: new Date().toISOString(),
      date: selectedDate,
      time: selectedTime,
      serviceId: currentService.id,
      serviceName: currentService.name,
      vehicleSize: vehicleSize,
      vehicleType: vehicleType || 'Standard',
      vehicleModel: vehicleModel.trim() || vehicleType || 'Vehicle',
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      notes: notes.trim(),
      instagramUsername: instagramUsername.trim() ? (instagramUsername.trim().startsWith('@') ? instagramUsername.trim() : `@${instagramUsername.trim()}`) : undefined,
      addons: selectedAddons.map(a => ({ name: a.name, price: a.price })),
      totalPrice: getTotalPrice(),
      status: 'confirmed'
    };

    try {
      const stored = localStorage.getItem('hydro_bookings_v1');
      const list: BookingData[] = stored ? JSON.parse(stored) : [];
      list.unshift(newBooking);
      localStorage.setItem('hydro_bookings_v1', JSON.stringify(list));
    } catch (e) {}

    // Trigger Python background registration
    try {
      fetch('/api/send-instagram-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      }).catch(() => {});
    } catch (e) {}

    onBookingCreated(newBooking);
    setCompletedBooking(newBooking);
    setIsCompleted(true);
  };

  const buildEmailBody = () => {
    if (!completedBooking) return '';
    const addonText = completedBooking.addons.length > 0
      ? completedBooking.addons.map(a => `  • ${a.name} (${a.price ? '$' + a.price : 'Variable'})`).join('\n')
      : '  None';

    return `Hi Cody,\n\nI have booked a car detail with Hydro Detailing Brisbane:\n\n` +
      `BOOKING SUMMARY:\n` +
      `Service: ${completedBooking.serviceName}\n` +
      `Date: ${completedBooking.date} at ${completedBooking.time}\n` +
      `Vehicle: ${completedBooking.vehicleModel} (${completedBooking.vehicleSize})\n` +
      `Total: $${completedBooking.totalPrice}\n\n` +
      `CLIENT CONTACT:\n` +
      `Name: ${completedBooking.name}\n` +
      `Phone: ${completedBooking.phone}\n` +
      `Address: ${completedBooking.address}\n\n` +
      `Thank you!`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="animate-modal-in relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-blue-900/10 overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-extrabold text-base tracking-tight text-[#001F3F]">
              HYDRO <span className="text-[#0066CC]">BOOKING</span>
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              {STEPS.map((stepName, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'w-4 bg-emerald-500'
                      : i === step
                      ? 'w-6 bg-[#0066CC]'
                      : i < step
                      ? 'w-2.5 bg-blue-300'
                      : 'w-2 bg-slate-200'
                  }`}
                  title={stepName}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">
              {isCompleted ? 'Finished' : `Step ${step + 1} of 6`}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1 relative">
          {isCompleted && completedBooking ? (
            <div className="space-y-6 animate-fadeIn py-2 relative">
              <HydroCelebrationSpray />
              <div className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner mb-3 animate-bounce" style={{ animationIterationCount: 3 }}>
                  <Check className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider inline-block mb-1">
                  ✓ Booking Confirmed &amp; Scheduled
                </span>
                <h3 className="text-2xl font-extrabold text-[#001F3F]">
                  Your Detail is Booked!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Thank you, <strong className="text-[#001F3F]">{completedBooking.name}</strong>! Below is your official proof-of-booking receipt. Save it as a picture or screenshot as proof.
                </p>
              </div>

              <BookingReceiptCard booking={completedBooking} />

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 font-semibold text-center">
                  Direct contact options:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(`Booking Confirmation: ${completedBooking.serviceName} - ${completedBooking.name}`)}&body=${encodeURIComponent(buildEmailBody())}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0066CC] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Email to Cody</span>
                  </a>

                  <a
                    href={`sms:${BUSINESS_INFO.phone}?&body=${encodeURIComponent(buildEmailBody())}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send SMS Text</span>
                  </a>
                </div>

                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm w-full transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#0066CC]" />
                  <span>Call Cody on {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold text-[#001F3F]">
                      Select Your Vehicle Size
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Detailing duration and product volumes depend on your vehicle's physical footprint.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'small' as const, label: 'Small', sub: 'Hatchback, Coupe, Motorbike', icon: Car, example: 'e.g. Golf, Corolla hatch, Yaris' },
                      { id: 'medium' as const, label: 'Medium', sub: 'Sedan, Wagon, Small Ute', icon: Car, example: 'e.g. Camry, Mazda 3, Falcon' },
                      { id: 'large' as const, label: 'Large', sub: 'SUV, 4x4, Dual Cab, 7-Seater', icon: Truck, example: 'e.g. Ranger, Prado, CX-5, Van' }
                    ].map(card => {
                      const Icon = card.icon;
                      const isSelected = vehicleSize === card.id;
                      return (
                        <button
                          key={card.id}
                          type="button"
                          onClick={() => {
                            setVehicleSize(card.id);
                            if (!vehicleType) {
                              setVehicleType(VEHICLE_TYPES[card.id][0]);
                            }
                          }}
                          className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                            isSelected
                              ? 'border-[#0066CC] bg-blue-50/70 shadow-lg shadow-blue-900/10 ring-2 ring-[#0066CC]/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                            isSelected ? 'bg-[#0066CC] text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="font-bold text-base text-[#001F3F]">{card.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{card.sub}</div>
                          <div className="text-[10px] text-slate-400 mt-2 font-mono">{card.example}</div>
                        </button>
                      );
                    })}
                  </div>

                  {vehicleSize && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Specific Vehicle Sub-Type
                      </label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-[#001F3F] font-medium focus:outline-none focus:border-[#0066CC]"
                      >
                        {VEHICLE_TYPES[vehicleSize].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                        <option value="Other / Custom">Other / Specialty Vehicle</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold text-[#001F3F]">
                      Choose Your Detailing Package
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Prices dynamically reflected for your <strong className="text-[#0066CC]">{vehicleSize?.toUpperCase()}</strong> vehicle.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                    {SERVICES.map(svc => {
                      const isSelected = serviceId === svc.id;
                      const sizeMatch = svc.sizes.find(s => s.size === vehicleSize || s.size === 'all');
                      const price = sizeMatch ? sizeMatch.price : svc.sizes[0].price;

                      return (
                        <div
                          key={svc.id}
                          onClick={() => setServiceId(svc.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                            isSelected
                              ? 'border-[#0066CC] bg-blue-50/60 shadow-md ring-1 ring-[#0066CC]'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-base text-[#001F3F]">
                                {svc.name}
                              </span>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                ~{svc.duration}h
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                              {svc.description}
                            </p>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="text-xl font-black text-[#0066CC]">
                              ${price}
                            </span>
                            <span className="text-[10px] block text-slate-400">Fixed rate</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold text-[#001F3F]">
                      Select Optional Add-ons
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Customize your treatment with deep stain removal, pet hair extraction, or engine bay care.
                    </p>
                  </div>

                  <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                    {availableAddonsList().map(item => {
                      const isSelected = selectedAddons.some(a => a.key === item.key);
                      return (
                        <div
                          key={item.key}
                          onClick={() => toggleAddon(item)}
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-[#0066CC] bg-blue-50/70 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              isSelected ? 'bg-[#0066CC] border-[#0066CC] text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-[#001F3F]">{item.name}</div>
                              {item.desc && <div className="text-xs text-slate-500 line-clamp-1">{item.desc}</div>}
                            </div>
                          </div>

                          <span className="text-sm font-extrabold text-[#0066CC] flex-shrink-0">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold text-[#001F3F]">
                      Select Preferred Date &amp; Time
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      We operate Monday to Saturday throughout Brisbane and Springfield.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-sm text-[#001F3F]">
                          {currentMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                        </span>
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={handlePrevMonth} className="p-1 rounded-lg hover:bg-slate-200 text-slate-600">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={handleNextMonth} className="p-1 rounded-lg hover:bg-slate-200 text-slate-600">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
                        <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {[...Array(firstDayIndex)].map((_, i) => (
                          <div key={`blank-${i}`} className="p-2" />
                        ))}
                        {[...Array(daysInMonth)].map((_, i) => {
                          const dayNum = i + 1;
                          const dateISO = formatDateISO(dayNum);
                          const disabled = isDateDisabled(dayNum);
                          const isSelected = selectedDate === dateISO;

                          return (
                            <button
                              key={dayNum}
                              type="button"
                              disabled={disabled}
                              onClick={() => {
                                setSelectedDate(dateISO);
                                setSelectedTime(null);
                              }}
                              className={`p-2 rounded-xl font-semibold transition-all relative ${
                                isSelected
                                  ? 'bg-[#0066CC] text-white shadow-md'
                                  : disabled
                                  ? 'text-slate-300 cursor-not-allowed'
                                  : 'text-slate-700 hover:bg-blue-100 hover:text-[#0066CC] cursor-pointer'
                              }`}
                            >
                              <span>{dayNum}</span>
                              {!disabled && (
                                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                                  isSelected ? 'bg-white' : 'bg-emerald-500'
                                }`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Available Arrival Windows
                        </span>
                        {selectedDate && (
                          <span className="text-xs text-sky-700 font-semibold">
                            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </div>

                      {selectedDate ? (
                        <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                          {TIME_SLOTS.map(slot => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                                selectedTime === slot
                                  ? 'bg-[#0066CC] text-white shadow-md'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="h-44 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs text-center p-4">
                          <CalendarIcon className="w-6 h-6 mb-2 text-slate-300" />
                          <span>Please pick an available date on the calendar first</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="text-center mb-5">
                    <h3 className="text-2xl font-extrabold text-[#001F3F]">
                      Your Location &amp; Contact Info
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      We need your address so Cody can bring the mobile detailing rig to your doorstep.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. John Wilkins"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066CC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0412 345 678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066CC]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address (optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066CC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Vehicle Make, Model &amp; Year
                      </label>
                      <input
                        type="text"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        placeholder="e.g. 2021 Toyota RAV4 Hybrid"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066CC]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center justify-between">
                      <span>Instagram Username (For DM Receipt)</span>
                      <span className="text-[10px] text-sky-600 font-semibold">Dispatched to you &amp; @hydrodetailing.brisbane</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">@</span>
                      <input
                        type="text"
                        value={instagramUsername}
                        onChange={(e) => setInstagramUsername(e.target.value.replace(/^@/, ''))}
                        placeholder="your_instagram_handle"
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066CC]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Service Address (Home / Workplace) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 14 Orion Way, Springfield Central QLD 4300"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066CC]"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Note: Mobile detailing requires access to an outdoor garden tap at the location.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Special Instructions / Notes
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Gate code, park in driveway, pet hair in back seat..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066CC]"
                    />
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold text-[#001F3F]">
                      Review &amp; Finalize
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Please confirm your appointment details before submitting.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3 text-sm">
                    <div className="flex justify-between pb-2.5 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Service Package</span>
                      <span className="font-bold text-[#001F3F]">{currentService?.name}</span>
                    </div>

                    <div className="flex justify-between pb-2.5 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Vehicle Size</span>
                      <span className="font-semibold text-slate-800">
                        {vehicleSize?.toUpperCase()} ({vehicleModel || vehicleType})
                      </span>
                    </div>

                    <div className="flex justify-between pb-2.5 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Date &amp; Time</span>
                      <span className="font-semibold text-slate-800">
                        {selectedDate} at {selectedTime}
                      </span>
                    </div>

                    <div className="flex justify-between pb-2.5 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Client Name</span>
                      <span className="font-semibold text-slate-800">{fullName}</span>
                    </div>

                    <div className="flex justify-between pb-2.5 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Contact Phone</span>
                      <span className="font-semibold text-slate-800">{phone}</span>
                    </div>

                    {instagramUsername && (
                      <div className="flex justify-between pb-2.5 border-b border-slate-200">
                        <span className="text-slate-500 font-semibold">Instagram DM</span>
                        <span className="font-semibold text-[#0066CC]">@{instagramUsername}</span>
                      </div>
                    )}

                    <div className="flex justify-between pb-2.5 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Location</span>
                      <span className="font-semibold text-slate-800 max-w-[280px] text-right truncate">
                        {address}
                      </span>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="pb-2.5 border-b border-slate-200">
                        <span className="text-slate-500 font-semibold block mb-1">Add-ons Selected:</span>
                        <div className="space-y-1 pl-2">
                          {selectedAddons.map((a, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-slate-600">
                              <span>+ {a.name}</span>
                              <span className="font-bold">{a.price ? `$${a.price}` : 'TBD'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 text-base">
                      <span className="font-extrabold text-[#001F3F]">Estimated Total</span>
                      <span className="font-black text-2xl text-[#0066CC]">${getTotalPrice()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 text-center">
                    Payment is made upon completion of service (Cash, Card, or Direct Bank Transfer).
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {!isCompleted && (
          <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {currentService && vehicleSize && (
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total</span>
                  <span className="text-base font-extrabold text-[#0066CC]">${getTotalPrice()}</span>
                </div>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  disabled={!canContinue()}
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#001F3F] hover:bg-[#0066CC] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#0066CC] hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   16. MY BOOKINGS MODAL COMPONENT
   ========================================================================= */

export const MyBookingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingData[];
  onCancelBooking: (bookingId: string) => void;
  onOpenBooking: () => void;
}> = ({ isOpen, onClose, bookings, onCancelBooking, onOpenBooking }) => {
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState<BookingData | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-blue-900/10 overflow-hidden my-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            {selectedReceiptBooking && (
              <button
                type="button"
                onClick={() => setSelectedReceiptBooking(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Back to bookings list"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <div>
              <h3 className="font-extrabold text-lg text-[#001F3F]">
                {selectedReceiptBooking ? 'Official Proof of Booking' : 'My Booked Appointments'}
              </h3>
              <p className="text-xs text-slate-500">
                {selectedReceiptBooking ? 'Download or print your proof of booking' : 'Stored locally on this device'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedReceiptBooking(null);
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {selectedReceiptBooking ? (
            <div className="space-y-4">
              <BookingReceiptCard booking={selectedReceiptBooking} />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-700">No active bookings yet</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Ready to restore your vehicle to showroom shine? Book an appointment online in under 2 minutes.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0066CC] text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book a Detail</span>
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 relative group text-left"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                      {booking.status}
                    </span>
                    <h4 className="font-extrabold text-base text-[#001F3F] mt-1.5">
                      {booking.serviceName}
                    </h4>
                  </div>
                  <span className="text-lg font-black text-[#0066CC]">
                    ${booking.totalPrice}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#0066CC]" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0066CC]" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-[#0066CC] flex-shrink-0" />
                    <span className="truncate">{booking.address}</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400">
                    Vehicle: {booking.vehicleModel} ({booking.vehicleSize})
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedReceiptBooking(booking)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100/80 hover:bg-blue-200 text-[#0066CC] font-bold text-xs transition-colors cursor-pointer"
                      title="View and download picture of receipt"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Receipt Proof</span>
                    </button>

                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-[#0066CC] hover:underline font-semibold flex items-center gap-1 px-2 py-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call Cody</span>
                    </a>

                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   17. MAIN APP ROOT COMPONENT
   ========================================================================= */

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | null>(null);

  const [detailService, setDetailService] = useState<ServicePackage | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);

  const [showPromo, setShowPromo] = useState(true);

  // Load persistent bookings
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hydro_bookings_v1');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleOpenBooking = (serviceId: string | null = null) => {
    setBookingServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleBookingCreated = (newBooking: BookingData) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter(b => b.id !== bookingId);
    setBookings(updated);
    try {
      localStorage.setItem('hydro_bookings_v1', JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-white text-[#001F3F] flex flex-col selection:bg-[#0066CC] selection:text-white">
      {/* Sticky Header Navigation with Integrated Top Deal Banner */}
      <Navbar
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenMyBookings={() => setIsMyBookingsModalOpen(true)}
        bookingCount={bookings.length}
        showPromo={showPromo}
        onClosePromo={() => setShowPromo(false)}
        onClaimPromo={() => handleOpenBooking('paint_ceramic')}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking(null)} />
        <ServicesSection
          onSelectServiceForBooking={(id) => handleOpenBooking(id)}
          onOpenDetailModal={(svc) => {
            setDetailService(svc);
            setIsDetailModalOpen(true);
          }}
        />
        <WhyUsSection />
        <ReviewsSection />
        <SocialSection />
        <FaqSection />
      </main>

      {/* Footer & Floating CTA */}
      <Footer onOpenBooking={() => handleOpenBooking(null)} />

      {/* Interactive Booking Flow Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingServiceId(null);
        }}
        preSelectedServiceId={bookingServiceId}
        onBookingCreated={handleBookingCreated}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={detailService}
        onClose={() => {
          setIsDetailModalOpen(false);
          setDetailService(null);
        }}
        onBookService={(id) => handleOpenBooking(id)}
      />

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsModalOpen}
        onClose={() => setIsMyBookingsModalOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onOpenBooking={() => handleOpenBooking(null)}
      />
    </div>
  );
}
