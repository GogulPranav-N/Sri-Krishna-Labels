import { NextResponse } from 'next/server';
import { COMPANY, buildWhatsAppInquiryUrl, generateInquiryRefId, ClientInquiryPayload } from '@/lib/constants';
import fs from 'fs';
import path from 'path';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendTelegramAlert(leadData: ClientInquiryPayload, submittedAt: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { success: false, reason: 'Telegram bot credentials not configured in environment.' };
  }

  const cleanPhone = (leadData.phone || '').replace(/[^0-9]/g, '');
  const pref = (leadData.preferredContact || 'whatsapp').toUpperCase();

  const text = [
    `🚨 <b>NEW CLIENT INQUIRY — SRI KRISHNA LABELS</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 <b>Ref ID:</b> <code>#${leadData.refId}</code>`,
    `👤 <b>Client:</b> <b>${escapeHtml(leadData.name)}</b>`,
    `🎯 <b>Preferred Reply:</b> <b>${pref === 'WHATSAPP' ? '🟢 WHATSAPP' : pref === 'EMAIL' ? '✉️ EMAIL' : '📞 PHONE CALL'}</b>`,
    leadData.company ? `🏢 <b>Company:</b> ${escapeHtml(leadData.company)}` : null,
    leadData.phone ? `📞 <b>Phone:</b> <code>${escapeHtml(leadData.phone)}</code>` : null,
    `✉️ <b>Email:</b> <code>${escapeHtml(leadData.email)}</code>`,
    leadData.productInterest ? `🏷️ <b>Product:</b> ${escapeHtml(leadData.productInterest)}` : null,
    `⏱️ <b>Time:</b> ${escapeHtml(submittedAt)}`,
    ``,
    `📝 <b>Requirements:</b>`,
    `<i>${escapeHtml(leadData.message)}</i>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🌐 <i>Auto-dispatched from srikrishnalabels.com</i>`,
  ]
    .filter(Boolean)
    .join('\n');

  const inlineKeyboard: Array<Array<{ text: string; url: string }>> = [];
  const primaryRow: Array<{ text: string; url: string }> = [];
  const secondaryRow: Array<{ text: string; url: string }> = [];

  if (leadData.preferredContact === 'email') {
    primaryRow.push({
      text: '✉️ Reply via Email',
      url: `mailto:${leadData.email}?subject=${encodeURIComponent(`Sri Krishna Labels - Quote for Inquiry #${leadData.refId}`)}`,
    });
    if (cleanPhone) {
      secondaryRow.push({ text: '💬 WhatsApp', url: `https://wa.me/${cleanPhone}` });
      secondaryRow.push({ text: '📞 Call', url: `tel:${cleanPhone}` });
    }
  } else {
    if (cleanPhone) {
      primaryRow.push({ text: '💬 WhatsApp Client', url: `https://wa.me/${cleanPhone}` });
      primaryRow.push({ text: '📞 Call Client', url: `tel:${cleanPhone}` });
    }
    secondaryRow.push({
      text: '✉️ Email Client',
      url: `mailto:${leadData.email}?subject=${encodeURIComponent(`Sri Krishna Labels - Quote for Inquiry #${leadData.refId}`)}`,
    });
  }

  if (primaryRow.length > 0) inlineKeyboard.push(primaryRow);
  if (secondaryRow.length > 0) inlineKeyboard.push(secondaryRow);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: inlineKeyboard.length > 0 ? { inline_keyboard: inlineKeyboard } : undefined,
      }),
    });

    const data = await res.json();
    return { success: data.ok, data };
  } catch (err: any) {
    console.error('Telegram notification error:', err);
    return { success: false, error: err.message };
  }
}

async function sendWhatsAppAdminAlert(leadData: ClientInquiryPayload, submittedAt: string) {
  const adminPhone = process.env.ADMIN_WHATSAPP_PHONE;
  const apiKey = process.env.ADMIN_WHATSAPP_APIKEY;

  if (!adminPhone || !apiKey) {
    return { success: false, reason: 'ADMIN_WHATSAPP_PHONE or ADMIN_WHATSAPP_APIKEY not configured.' };
  }

  const cleanPhone = adminPhone.replace(/[^0-9]/g, '');
  const pref = (leadData.preferredContact || 'whatsapp').toUpperCase();

  const messageText = [
    `🚨 *NEW CLIENT INQUIRY — SRI KRISHNA LABELS*`,
    `Ref ID: #${leadData.refId}`,
    `Client Name: ${leadData.name}`,
    `Preferred Reply: ${pref}`,
    leadData.company ? `Company: ${leadData.company}` : null,
    leadData.phone ? `Phone: ${leadData.phone}` : null,
    `Email: ${leadData.email}`,
    leadData.productInterest ? `Product: ${leadData.productInterest}` : null,
    `Time: ${submittedAt}`,
    ``,
    `Requirements:`,
    leadData.message,
    leadData.phone ? `Chat with client: https://wa.me/${leadData.phone.replace(/[^0-9]/g, '')}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(messageText)}&apikey=${apiKey}`;
    const res = await fetch(url);
    const text = await res.text();
    const isSuccess = text.toLowerCase().includes('message sent') || res.ok;
    return { success: isSuccess, response: text };
  } catch (err: any) {
    console.error('CallMeBot WhatsApp alert error:', err);
    return { success: false, error: err.message };
  }
}

async function sendEmailAlert(leadData: ClientInquiryPayload, submittedAt: string) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_KEY;

  if (!accessKey) {
    return { success: false, reason: 'WEB3FORMS_ACCESS_KEY not configured in environment.' };
  }

  const recipientEmail = process.env.ADMIN_EMAIL || COMPANY.email;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `🚨 New Client Lead [#${leadData.refId}]: ${leadData.name} (${leadData.company || 'Direct Client'})`,
        from_name: 'Sri Krishna Labels Website',
        to_email: recipientEmail,
        'Inquiry Reference ID': `#${leadData.refId}`,
        'Client Full Name': leadData.name,
        'Preferred Reply Method': (leadData.preferredContact || 'whatsapp').toUpperCase(),
        'Company / Brand': leadData.company || 'Not Specified',
        'Phone Number': leadData.phone || 'Not Provided',
        'Email Address': leadData.email,
        'Product Category': leadData.productInterest || 'General Inquiry',
        'Client Requirements': leadData.message,
        'Submission Timestamp': submittedAt,
      }),
    });

    const data = await res.json();
    return { success: data.success, data };
  } catch (err: any) {
    console.error('Email dispatch error via Web3Forms:', err);
    return { success: false, error: err.message };
  }
}

function saveInquiryLocally(leadData: ClientInquiryPayload) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, 'inquiries.json');
    let existing: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        existing = JSON.parse(fileContent);
      } catch {
        existing = [];
      }
    }
    existing.unshift(leadData);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to log lead locally:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, productInterest, preferredContact, message } = body;

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

    const validPref: 'whatsapp' | 'email' | 'phone' =
      preferredContact === 'email' ? 'email' : preferredContact === 'phone' ? 'phone' : 'whatsapp';

    const leadData: ClientInquiryPayload = {
      refId,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      company: company ? company.trim() : undefined,
      productInterest: productInterest ? productInterest.trim() : undefined,
      preferredContact: validPref,
      message: message.trim(),
      submittedAt,
    };

    // 1. Save lead to local disk backup
    saveInquiryLocally(leadData);

    // 2. Dispatch automated notifications concurrently (Telegram, Email, WhatsApp)
    const [telegramResult, emailResult, whatsappResult] = await Promise.all([
      sendTelegramAlert(leadData, submittedAt),
      sendEmailAlert(leadData, submittedAt),
      sendWhatsAppAdminAlert(leadData, submittedAt),
    ]);

    // 3. Construct direct WhatsApp URLs for Mr. Manimaran and Mr. Chiranjeevi
    const manimaranWa = COMPANY.whatsapp[0]?.waNumber || '917010658326';
    const chiranjeeviWa = COMPANY.whatsapp[1]?.waNumber || '917603805054';

    const whatsappLinks = {
      manimaran: buildWhatsAppInquiryUrl(manimaranWa, leadData),
      chiranjeevi: buildWhatsAppInquiryUrl(chiranjeeviWa, leadData),
    };

    // 4. Log structured lead to server stdout
    console.log('\n======================================================');
    console.log('🚨 NEW CLIENT INQUIRY RECEIVED & AUTO-PROCESSED');
    console.log(`Reference ID:        #${refId}`);
    console.log(`Client Name:         ${leadData.name}`);
    console.log(`Preferred Reply:     ${leadData.preferredContact?.toUpperCase()}`);
    console.log(`Company:             ${leadData.company || 'N/A'}`);
    console.log(`Phone:               ${leadData.phone || 'N/A'}`);
    console.log(`Email:               ${leadData.email}`);
    console.log(`Product:             ${leadData.productInterest || 'General Inquiry'}`);
    console.log(`Submitted At:        ${submittedAt}`);
    console.log(`Email Dispatched:    ${emailResult.success ? 'YES ✓' : 'SKIPPED (Needs WEB3FORMS_ACCESS_KEY)'}`);
    console.log(`Telegram Pushed:     ${telegramResult.success ? 'YES ✓' : 'SKIPPED (Needs TELEGRAM_BOT_TOKEN)'}`);
    console.log(`WhatsApp Alert Sent: ${whatsappResult.success ? 'YES ✓' : 'SKIPPED (Needs ADMIN_WHATSAPP_PHONE & APIKEY)'}`);
    console.log('Requirements:');
    console.log(leadData.message);
    console.log('======================================================\n');

    return NextResponse.json({
      success: true,
      refId,
      submittedAt,
      leadData,
      whatsappLinks,
      notifications: {
        email: emailResult.success,
        telegram: telegramResult.success,
        whatsapp: whatsappResult.success,
      },
      message: 'Inquiry received successfully! Our team has been notified.',
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing your inquiry.' },
      { status: 500 }
    );
  }
}
