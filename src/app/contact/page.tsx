'use client';

import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import CopyButton from '@/components/ui/CopyButton';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Navigation,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Send,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { COMPANY, PRODUCTS, ClientInquiryPayload } from '@/lib/constants';
import Link from 'next/link';

interface SubmissionResult {
  refId: string;
  submittedAt: string;
  leadData: ClientInquiryPayload;
  whatsappLinks: {
    manimaran: string;
    chiranjeevi: string;
  };
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: '',
    message: '',
  });

  const [openWhatsAppOnSubmit, setOpenWhatsAppOnSubmit] = useState(true);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmissionResult(data);
      setStatus('success');

      // If user enabled auto-WhatsApp, open in a new tab
      if (openWhatsAppOnSubmit && data.whatsappLinks?.manimaran) {
        window.open(data.whatsappLinks.manimaran, '_blank', 'noopener,noreferrer');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again or call us directly.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setSubmissionResult(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      productInterest: '',
      message: '',
    });
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
            
            {/* Left: Contact Form / Follow-up Confirmation */}
            <AnimatedSection direction="left">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                {status === 'success' && submissionResult ? (
                  /* ========================================================
                     EXECUTIVE FOLLOW-UP CONFIRMATION (NEW CLIENT APPROACHED)
                     ======================================================== */
                  <div className="space-y-6">
                    {/* Status Header */}
                    <div className="text-center pb-5 border-b border-gray-100">
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
                        <CheckCircle2 size={32} />
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        New Client Inquiry Registered
                      </div>
                      <h2 className="text-2xl font-bold text-[#1B2A4A]">Thank You, {submissionResult.leadData.name}!</h2>
                      <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                        Your requirements have been delivered to our factory management team.
                      </p>
                    </div>

                    {/* Reference Card with Copy */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 border border-[#C5961A]/30 rounded-xl p-4 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-[11px] font-bold text-[#C5961A] tracking-wider uppercase block">
                          Inquiry Reference ID
                        </span>
                        <span className="text-2xl font-black text-[#1B2A4A] tracking-wider">
                          #{submissionResult.refId}
                        </span>
                        <span className="text-[11px] text-gray-500 block mt-0.5">
                          Logged at {submissionResult.submittedAt}
                        </span>
                      </div>
                      <CopyButton text={submissionResult.refId} title="Copy Reference ID" />
                    </div>

                    {/* Assigned Partners & SLA Notice */}
                    <div className="bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A] uppercase tracking-wider">
                        <ShieldCheck size={16} className="text-[#C5961A]" />
                        Direct Factory Assignment
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Your inquiry is assigned directly to <strong>Mr. Manimaran</strong> and <strong>Mr. Chiranjeevi</strong>. We are reviewing your specifications and will respond with sample options and pricing within <strong>2–4 business hours</strong>.
                      </p>
                    </div>

                    {/* Fast-Track Actions (Direct WhatsApp Reach) */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles size={14} className="text-[#C5961A]" />
                          Fast-Track Response (Recommended)
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold">Instant reply</span>
                      </div>

                      {/* Primary WhatsApp to Mr. Manimaran */}
                      <a
                        href={submissionResult.whatsappLinks.manimaran}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
                      >
                        <MessageSquare size={19} />
                        <span>Chat on WhatsApp with Mr. Manimaran</span>
                        <ExternalLink size={14} className="opacity-80 ml-auto" />
                      </a>

                      {/* Secondary WhatsApp to Mr. Chiranjeevi */}
                      <a
                        href={submissionResult.whatsappLinks.chiranjeevi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-[#1B2A4A] border border-gray-300 font-semibold py-3 px-5 rounded-xl transition-colors shadow-xs text-sm"
                      >
                        <MessageSquare size={17} className="text-[#25D366]" />
                        <span>Chat on WhatsApp with Mr. Chiranjeevi</span>
                        <ExternalLink size={14} className="opacity-60 ml-auto" />
                      </a>

                      {/* Quick Call Row */}
                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        <a
                          href="tel:+917010658326"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-[#1B2A4A] text-xs font-semibold rounded-lg transition-colors border border-gray-200/60"
                        >
                          <Phone size={13} className="text-[#C5961A]" />
                          Call Manimaran
                        </a>
                        <a
                          href="tel:+917603805054"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-[#1B2A4A] text-xs font-semibold rounded-lg transition-colors border border-gray-200/60"
                        >
                          <Phone size={13} className="text-[#C5961A]" />
                          Call Chiranjeevi
                        </a>
                      </div>
                    </div>

                    {/* Inquiry Details Recap */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs space-y-2">
                      <div className="font-bold text-gray-700 uppercase tracking-wider text-[11px] pb-1.5 border-b border-gray-200 flex items-center justify-between">
                        <span>Submitted Specifications</span>
                        <span className="text-gray-400 font-normal">#{submissionResult.refId}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                        <div>
                          <span className="font-medium text-gray-400">Client: </span>
                          <span className="text-gray-900 font-semibold">{submissionResult.leadData.name}</span>
                        </div>
                        {submissionResult.leadData.company && (
                          <div>
                            <span className="font-medium text-gray-400">Company: </span>
                            <span className="text-gray-900 font-semibold">{submissionResult.leadData.company}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-400">Email: </span>
                          <span className="text-gray-900">{submissionResult.leadData.email}</span>
                        </div>
                        {submissionResult.leadData.phone && (
                          <div>
                            <span className="font-medium text-gray-400">Phone: </span>
                            <span className="text-gray-900">{submissionResult.leadData.phone}</span>
                          </div>
                        )}
                      </div>
                      {submissionResult.leadData.productInterest && (
                        <div className="text-gray-600 pt-1">
                          <span className="font-medium text-gray-400">Product Interest: </span>
                          <span className="inline-block px-2 py-0.5 rounded bg-white border border-gray-200 font-semibold text-[#1B2A4A] text-[11px]">
                            {submissionResult.leadData.productInterest}
                          </span>
                        </div>
                      )}
                      <div className="pt-1">
                        <span className="font-medium text-gray-400 block mb-1">Requirement Notes:</span>
                        <div className="text-gray-800 bg-white p-2.5 rounded border border-gray-200 text-[11px] whitespace-pre-wrap leading-relaxed">
                          {submissionResult.leadData.message}
                        </div>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="pt-2 text-center">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#1B2A4A] transition-colors py-1 px-3 rounded-md hover:bg-gray-100"
                      >
                        <RefreshCw size={12} />
                        Submit another inquiry or update requirements
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ========================================================
                     DEFAULT CONTACT FORM
                     ======================================================== */
                  <>
                    <div className="mb-6 pb-5 border-b border-gray-100">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#C5961A] tracking-wider uppercase">
                          Fast Response Guaranteed
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          Direct Management Review
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-[#1B2A4A] mt-1.5">Request Samples or a Custom Quote</h2>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        Share your brand requirements below. Mr. Manimaran or Mr. Chiranjeevi will review your specifications and get back to you with custom samples and competitive pricing.
                      </p>
                    </div>

                    {status === 'error' && (
                      <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm flex items-start gap-2.5">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-semibold">Submission failed</strong>
                          <span>{errorMessage}</span>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Rajesh Kumar"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="e.g. rajesh@company.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone / WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company / Brand Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g. Apex Apparels"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-1">
                          Product Interest
                        </label>
                        <select
                          id="productInterest"
                          name="productInterest"
                          value={formData.productInterest}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all bg-white text-sm"
                        >
                          <option value="">Select label type (Optional)</option>
                          {PRODUCTS?.map((product: any) => (
                            <option key={product.id} value={product.name}>
                              {product.name}
                            </option>
                          ))}
                          <option value="Custom Specialty Labels">Custom Specialty Labels</option>
                          <option value="General Inquiry">Other / General Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Requirements / Order Specs <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          placeholder="Tell us about your label size, quantities (e.g. 5,000 pcs), colors, or any specific finish needed..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5961A] focus:border-[#C5961A] outline-none transition-all resize-none text-sm"
                        ></textarea>
                      </div>

                      {/* Instant WhatsApp Prompt Option */}
                      <label className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100/70 transition-colors">
                        <input
                          type="checkbox"
                          checked={openWhatsAppOnSubmit}
                          onChange={(e) => setOpenWhatsAppOnSubmit(e.target.checked)}
                          className="mt-0.5 rounded text-[#C5961A] focus:ring-[#C5961A] accent-[#C5961A] h-4 w-4"
                        />
                        <span className="text-xs text-gray-600 leading-normal">
                          <strong className="text-gray-800">Priority WhatsApp Dispatch:</strong> Connect directly on WhatsApp with Mr. Manimaran with this inquiry pre-filled after submission for instant reply.
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-[#C5961A] hover:bg-[#a67c13] disabled:opacity-75 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                      >
                        {status === 'submitting' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Registering New Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Submit Inquiry &amp; Request Quote</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          Zero Obligation
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          Free Sample Kit
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          Direct Factory Price
                        </span>
                      </div>
                    </form>
                  </>
                )}
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
