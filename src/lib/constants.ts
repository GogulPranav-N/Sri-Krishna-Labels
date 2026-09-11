export const COMPANY = {
  name: "Sri Krishna Labels",
  tagline: "Crafting Quality Labels for the Garment Industry",
  phone: "+91 70106 58326",
  phones: [
    { name: "Mr. Manimaran", number: "+91 70106 58326" },
    { name: "Mr. Chiranjeevi", number: "+91 76038 05054" },
  ],
  whatsapp: [
    { name: "Mr. Manimaran", number: "+91 70106 58326", waNumber: "917010658326" },
    { name: "Mr. Chiranjeevi", number: "+91 76038 05054", waNumber: "917603805054" },
  ],
  email: "srikrishnalabels19@gmail.com",
  address: "35/4, Geetha Complex, Near Dheivam Theatre, Subash School Road, Murugampalayam, Tirupur - 641 687, Tamil Nadu, India",
  addressLines: [
    "35/4, Geetha Complex",
    "Near Dheivam Theatre, Subash School Road",
    "Murugampalayam",
    "Tirupur - 641 687, Tamil Nadu"
  ],
  gstin: "33DUBPM6359A1ZV",
  foundedYear: 2017,
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35%2F4%2C+Geetha+Complex%2C+Near+Dheivam+Theatre%2C+Subash+School+Road%2C+Murugampalayam%2C+Tirupur+-+641687",
  appleMapsUrl: "https://maps.apple.com/?q=35%2F4%2C+Geetha+Complex%2C+Near+Dheivam+Theatre%2C+Subash+School+Road%2C+Murugampalayam%2C+Tirupur+-+641687",
  stats: [
    { label: "Years in Field", value: "7", suffix: "+" },
    { label: "Happy Clients", value: "25", suffix: "+" },
    { label: "Labels Delivered", value: "10", suffix: "M+" },
    { label: "On-Time Delivery", value: "100", suffix: "%" },
  ],
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Why Choose Us", href: "/why-us" },
  { name: "Contact", href: "/contact" },
];

export const PRODUCTS = [
  {
    id: "satin-labels",
    name: "Satin Labels",
    description: "Premium smooth labels offering a luxurious feel. Perfect for high-end garments and delicate fabrics.",
    icon: "Tag", 
  },
  {
    id: "cotton-tape-labels",
    name: "Cotton Tape Labels",
    description: "Natural, eco-friendly labels providing a vintage or organic look. Durable and skin-friendly.",
    icon: "Shirt",
  },
  {
    id: "polyester-tape-labels",
    name: "Polyester Tape Labels",
    description: "Highly durable and resistant to wear and tear. Ideal for standard apparel and heavy-duty garments.",
    icon: "Layers",
  },
  {
    id: "multi-colour-rotary-printed",
    name: "Multi Colour Rotary Printed",
    description: "Vibrant, high-resolution printing for intricate logos and colorful designs. Fade-resistant and crisp.",
    icon: "Palette",
  },
  {
    id: "care-wash-care-labels",
    name: "Care/Wash Care Labels",
    description: "Essential wash and care instructions printed clearly to meet industry standards and help consumers.",
    icon: "Droplets",
  },
  {
    id: "custom-specialty-labels",
    name: "Custom/Specialty Labels",
    description: "Unique labels tailored to your specific requirements, materials, and specialized applications.",
    icon: "Sparkles",
  },
];

export const VALUES = [
  {
    title: "Quality Excellence",
    description: "We adhere to stringent quality control measures ensuring every label meets global standards.",
    icon: "Award",
  },
  {
    title: "Innovation",
    description: "Continuously upgrading our machinery and techniques to provide cutting-edge label solutions.",
    icon: "Lightbulb",
  },
  {
    title: "Reliability",
    description: "Consistent delivery and unwavering support you can count on for all your branding needs.",
    icon: "ShieldCheck",
  },
  {
    title: "Customer Focus",
    description: "We work closely with clients to understand their vision and deliver customized, exact solutions.",
    icon: "HeartHandshake",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Consultation",
    description: "We discuss your brand's unique needs, target audience, and design preferences.",
  },
  {
    step: "02",
    title: "Design",
    description: "Our team creates detailed proofs and mockups for your approval.",
  },
  {
    step: "03",
    title: "Production",
    description: "Using modern machinery, we manufacture your labels with precision.",
  },
  {
    step: "04",
    title: "Quality Check",
    description: "Every batch undergoes strict quality assurance testing before dispatch.",
  },
  {
    step: "05",
    title: "Delivery",
    description: "Prompt, secure shipping ensures your labels arrive on time, every time.",
  },
];

export const DIFFERENTIATORS = [
  {
    title: "Quality Control",
    description: "Rigorous checking processes to ensure defect-free, premium outputs.",
    icon: "CheckCircle",
  },
  {
    title: "Modern Machinery",
    description: "Equipped with the latest printing and weaving technology for superior results.",
    icon: "Factory",
  },
  {
    title: "Custom Design",
    description: "Tailor-made solutions that perfectly align with your brand aesthetics.",
    icon: "PenTool",
  },
  {
    title: "Fast Turnaround",
    description: "Efficient production cycles ensuring quick delivery without compromising quality.",
    icon: "Clock",
  },
  {
    title: "Competitive Pricing",
    description: "High-quality products offered at market-friendly rates.",
    icon: "TrendingUp",
  },
  {
    title: "Eco-Friendly",
    description: "Sustainable options and environmentally conscious manufacturing practices.",
    icon: "Leaf",
  },
];

export function generateInquiryRefId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomStr = "";
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SKL-${randomStr}`;
}

export interface ClientInquiryPayload {
  refId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  productInterest?: string;
  preferredContact?: 'whatsapp' | 'email' | 'phone';
  message: string;
  submittedAt?: string;
}

export function buildWhatsAppInquiryUrl(phone: string, data: ClientInquiryPayload): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const lines = [
    `*🔔 NEW CLIENT INQUIRY — SRI KRISHNA LABELS*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 *Reference ID:* ${data.refId}`,
    `👤 *Client Name:* ${data.name}`,
    data.company ? `🏢 *Company:* ${data.company}` : null,
    data.phone ? `📞 *Phone:* ${data.phone}` : null,
    data.email ? `✉️ *Email:* ${data.email}` : null,
    data.preferredContact ? `🎯 *Preferred Reply Via:* ${data.preferredContact.toUpperCase()}` : null,
    data.productInterest ? `🏷️ *Product Category:* ${data.productInterest}` : null,
    `📝 *Requirements / Message:*`,
    `${data.message}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━`,
    `⏱️ *Time:* ${data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    `🌐 *Source:* srikrishnalabels.com Contact Form`
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

