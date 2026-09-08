'use client';

import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import CopyButton from '@/components/ui/CopyButton';
import { Phone, Mail, MapPin, Clock, FileText, Navigation, ExternalLink } from 'lucide-react';
import { COMPANY, PRODUCTS } from '@/lib/constants';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple state-based message
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      productInterest: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#1B2A4A] text-white py-16 lg:py-24 min-h-[340px] flex flex-col justify-center">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C5961A]/40 text-[#C5961A] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
              <span>Direct Factory Access</span>
              <span>•</span>
              <span>100% On-Time Delivery</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Let's Partner &amp; Grow Your Brand</h1>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-6 font-light leading-relaxed">
              Have a project in mind or need custom samples? Talk directly with our leadership team. We treat every order with personal commitment, precision quality, and zero delays.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-[#C5961A] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#C5961A]">Contact Us</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Contact Form */}
            <AnimatedSection direction="left">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="mb-6 pb-5 border-b border-gray-100">
                  <span className="text-xs font-bold text-[#C5961A] tracking-wider uppercase">Fast Response Guaranteed</span>
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mt-1">Request Samples or a Custom Quote</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Share your requirements below. Mr. Manimaran or Mr. Chiranjeevi will review your details and get back to you with exact pricing and sample options.
                  </p>
                </div>
                
                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    Thank you for reaching out! We've received your message and will get back to you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 70106 58326"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-1">Product Interest</label>
                    <select 
                      id="productInterest" 
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all bg-white"
                    >
                      <option value="">Select a product...</option>
                      {PRODUCTS?.map((product: any) => (
                        <option key={product.id} value={product.name}>{product.name}</option>
                      ))}
                      <option value="other">Other / General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#C5961A] hover:bg-[#a67c13] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md">
                    Send Message
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Right: Contact Info */}
            <AnimatedSection direction="right" delay={0.2} className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Direct Access • No Middlemen</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1B2A4A]">Talk Directly With Our Team</h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Call or WhatsApp Mr. Manimaran or Mr. Chiranjeevi directly for priority order fulfillment, sample dispatches, and volume quotes.
                </p>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-xl flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full text-[#1B2A4A] shadow-sm shrink-0">
                  <Phone className="text-[#C5961A]" size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-[#1B2A4A] mb-2">Phone Numbers</h3>
                  <div className="space-y-2">
                    {COMPANY.phones.map((item) => (
                      <div key={item.number} className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200/80 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                          <span className="text-xs font-bold text-[#C5961A] tracking-wider uppercase">{item.name}:</span>
                          <a
                            href={`tel:${item.number.replace(/[^0-9+]/g, '')}`}
                            className="text-[#1B2A4A] font-semibold hover:text-[#C5961A] transition-colors text-sm"
                          >
                            {item.number}
                          </a>
                        </div>
                        <CopyButton text={item.number} title={`Copy ${item.name}'s phone number`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full text-[#1B2A4A] shadow-sm shrink-0">
                  <Mail className="text-[#C5961A]" size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-[#1B2A4A] mb-1">Email</h3>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-gray-600 hover:text-[#C5961A] transition-colors break-all font-medium text-sm"
                    >
                      {COMPANY.email}
                    </a>
                    <CopyButton text={COMPANY.email} title="Copy email address" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full text-[#1B2A4A] shadow-sm shrink-0">
                  <MapPin className="text-[#C5961A]" size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-[#1B2A4A] mb-1">Address</h3>
                  <div className="text-gray-600 leading-relaxed text-sm">
                    {COMPANY.addressLines ? (
                      COMPANY.addressLines.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))
                    ) : (
                      <p>{COMPANY.address}</p>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-2">
                    <a
                      href={COMPANY.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-xs font-semibold text-[#1B2A4A] hover:text-[#C5961A] hover:border-[#C5961A]/50 transition-colors shadow-xs"
                    >
                      <Navigation size={12} className="text-[#C5961A]" />
                      Google Maps
                      <ExternalLink size={10} className="opacity-60" />
                    </a>
                    <a
                      href={COMPANY.appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-xs font-semibold text-[#1B2A4A] hover:text-[#C5961A] hover:border-[#C5961A]/50 transition-colors shadow-xs"
                    >
                      <Navigation size={12} className="text-[#1B2A4A]" />
                      Apple Maps
                      <ExternalLink size={10} className="opacity-60" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full text-[#1B2A4A] shadow-sm shrink-0">
                  <FileText className="text-[#C5961A]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] mb-1">GSTIN</h3>
                  <p className="text-gray-700 font-mono font-semibold tracking-wider bg-white px-3 py-1 rounded border border-gray-200 inline-block text-sm">
                    {COMPANY.gstin}
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full text-[#1B2A4A] shadow-sm shrink-0">
                  <Clock className="text-[#C5961A]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] mb-1">Business Hours</h3>
                  <p className="text-gray-600 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 pb-16">
        <AnimatedSection direction="up">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#1B2A4A] to-[#253960] text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MapPin className="text-[#C5961A]" size={22} />
                  Visit Our Facility
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Near Dheivam Theatre, Subash School Road, Murugampalayam, Tirupur - 641 687
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={COMPANY.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5961A] hover:bg-[#b08415] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                >
                  <Navigation size={14} />
                  Open in Google Maps
                  <ExternalLink size={12} />
                </a>
                <a
                  href={COMPANY.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20"
                >
                  <Navigation size={14} />
                  Open in Apple Maps
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="w-full h-96 relative">
              <iframe
                title="Sri Krishna Labels Location Map"
                src="https://maps.google.com/maps?q=35%2F4+Geetha+Complex+Near+Dheivam+Theatre+Subash+School+Road+Murugampalayam+Tirupur+Tamil+Nadu+641687&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
