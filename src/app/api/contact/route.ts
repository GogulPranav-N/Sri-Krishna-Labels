import { NextResponse } from 'next/server';
import { COMPANY, buildWhatsAppInquiryUrl, generateInquiryRefId, ClientInquiryPayload } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, productInterest, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide your full name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please describe your inquiry or label requirement.' },
        { status: 400 }
      );
    }

    const refId = generateInquiryRefId();
    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const leadData: ClientInquiryPayload = {
      refId,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      company: company ? company.trim() : undefined,
      productInterest: productInterest ? productInterest.trim() : undefined,
      message: message.trim(),
      submittedAt,
    };

    // Construct direct WhatsApp URLs for Mr. Manimaran and Mr. Chiranjeevi
    const manimaranWa = COMPANY.whatsapp[0]?.waNumber || '917010658326';
    const chiranjeeviWa = COMPANY.whatsapp[1]?.waNumber || '917603805054';

    const whatsappLinks = {
      manimaran: buildWhatsAppInquiryUrl(manimaranWa, leadData),
      chiranjeevi: buildWhatsAppInquiryUrl(chiranjeeviWa, leadData),
    };

    // Log structured lead for server logs / monitoring
    console.log('\n=========================================');
    console.log('🚨 NEW CLIENT INQUIRY RECEIVED — SRI KRISHNA LABELS');
    console.log(`Reference ID: ${refId}`);
    console.log(`Client Name:  ${leadData.name}`);
    console.log(`Company:      ${leadData.company || 'N/A'}`);
    console.log(`Phone:        ${leadData.phone || 'N/A'}`);
    console.log(`Email:        ${leadData.email}`);
    console.log(`Product:      ${leadData.productInterest || 'General Inquiry'}`);
    console.log(`Submitted At: ${submittedAt}`);
    console.log(`Message:      ${leadData.message}`);
    console.log('=========================================\n');

    // Optional: If WEB3FORMS_KEY or similar webhook is configured, forward lead
    if (process.env.WEB3FORMS_KEY) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_KEY,
            subject: `New Client Inquiry [${refId}] - ${leadData.name} (${leadData.company || 'Individual'})`,
            from_name: 'Sri Krishna Labels Website',
            to_email: COMPANY.email,
            ...leadData,
          }),
        });
      } catch (err) {
        console.error('Failed to forward to Web3Forms:', err);
      }
    }

    return NextResponse.json({
      success: true,
      refId,
      submittedAt,
      leadData,
      whatsappLinks,
      message: 'Inquiry received successfully! Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing your inquiry.' },
      { status: 500 }
    );
  }
}
