/* eslint-disable @typescript-eslint/no-unused-vars */


import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazily initialize Resend inside the request handler to avoid build-time errors
// when RESEND_API_KEY is not set in the environment.

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  isMerchPack?: boolean;
  tshirtSize?: string;
  wristbandColor?: string;
  merchPackId?: string;
}

// Type for email data
interface EmailData {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
}

function formatCartItemsForEmail(cartItems: CartItem[]): string {
  return cartItems.map(item => {
    let itemDescription = item.name;

    if (item.isMerchPack) {
      // Format merch pack items
      const packDetails = [];
      if (item.tshirtSize) packDetails.push(`T-shirt Size: ${item.tshirtSize}`);
      if (item.wristbandColor) packDetails.push(`Wristband Color: ${item.wristbandColor}`);

      if (packDetails.length > 0) {
        itemDescription += ` (${packDetails.join(', ')})`;
      }
      itemDescription += ' [MERCH PACK]';
    } else {
      // Format regular items
      if (item.size) itemDescription += ` (Size: ${item.size})`;
      if (item.color) itemDescription += ` (Color: ${item.color})`;
    }

    return `${itemDescription} - Qty: ${item.quantity} - ${item.price.toLocaleString()} LKR each`;
  }).join('\n');
}

function formatCartItemsHTML(cartItems: CartItem[]): string {
  return cartItems.map(item => {
    let itemName = item.name;
    let itemSpecs = '';

    if (item.isMerchPack) {
      const specs = [];
      if (item.tshirtSize) specs.push(`T-shirt: ${item.tshirtSize}`);
      if (item.wristbandColor) specs.push(`Wristband: ${item.wristbandColor}`);
      if (specs.length > 0) itemSpecs = ` (${specs.join(', ')})`;
      itemName += ` <span style="background: #06b6d4; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">PACK</span>`;
    } else {
      const specs = [];
      if (item.size) specs.push(`Size: ${item.size}`);
      if (item.color) specs.push(`Color: ${item.color}`);
      if (specs.length > 0) itemSpecs = ` (${specs.join(', ')})`;
    }

    return `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 0; font-weight: 500;">${itemName}${itemSpecs}</td>
        <td style="padding: 12px 0; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; font-weight: 600;">${item.price.toLocaleString()} LKR</td>
        <td style="padding: 12px 0; text-align: right; font-weight: 700;">${(item.price * item.quantity).toLocaleString()} LKR</td>
      </tr>
    `;
  }).join('');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const homeAddress = formData.get('homeAddress') as string;
    const entity = formData.get('entity') as string;
    const attendingEvent = formData.get('attendingEvent') === 'true';
    const cartItems = formData.get('cartItems') as string;
    const totalItems = formData.get('totalItems') as string;
    const totalAmount = formData.get('totalAmount') as string;
    const orderDate = formData.get('orderDate') as string;
    const hasMerchPack = formData.get('hasMerchPack') === 'true';

    // Parse cart items JSON for detailed processing
    let cartItemsData: CartItem[] = [];
    try {
      const cartItemsJson = formData.get('cartItemsJson') as string;
      cartItemsData = JSON.parse(cartItemsJson);
    } catch (error) {
      console.error('Error parsing cart items JSON:', error);
    }

    // Handle file upload
    const proofFile = formData.get('proofOfPurchase') as File;
    let attachment = null;

    if (proofFile && proofFile.size > 0) {
      // Convert file to buffer for attachment
      const buffer = Buffer.from(await proofFile.arrayBuffer());
      attachment = {
        filename: proofFile.name,
        content: buffer,
      };
    }

    // Create enhanced email content with merch pack support
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e91e63; text-align: center;">New Merch Order ${hasMerchPack ? '🎁' : ''}</h1>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">Customer Information</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${contactNumber}</p>
          <p><strong>Home Address:</strong> ${homeAddress}</p>
          <p><strong>Entity:</strong> ${entity}</p>
          <p><strong>Attending Event:</strong> ${attendingEvent ? 'Yes' : 'No'}</p>
          <p><strong>Order Date:</strong> ${new Date(orderDate).toLocaleString()}</p>
          ${hasMerchPack ? '<p><strong>🎁 Contains Merch Pack:</strong> Yes</p>' : ''}
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #333; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">Order Details</h2>
          
          ${cartItemsData.length > 0 ? `
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <thead>
                <tr style="background-color: #e3f2fd; border-bottom: 2px solid #2196f3;">
                  <th style="padding: 10px; text-align: left; font-weight: bold;">Item</th>
                  <th style="padding: 10px; text-align: center; font-weight: bold;">Qty</th>
                  <th style="padding: 10px; text-align: right; font-weight: bold;">Price</th>
                  <th style="padding: 10px; text-align: right; font-weight: bold;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${formatCartItemsHTML(cartItemsData)}
              </tbody>
            </table>
          ` : `
            <div style="white-space: pre-line; margin: 10px 0;">${cartItems}</div>
          `}
          
          <div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 15px;">
            <p><strong>Total Items:</strong> ${totalItems}</p>
            <p style="font-size: 18px; color: #e91e63;"><strong>Total Amount: ${totalAmount}</strong></p>
          </div>
        </div>

        ${hasMerchPack ? `
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
            <p style="margin: 0; color: #2e7d32; font-weight: bold;">🎁 This order contains merch pack(s) with custom selections!</p>
          </div>
        ` : ''}

        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 8px;">
          <p style="margin: 0; color: #666;">Proof of purchase has been attached to this email.</p>
        </div>
      </div>
    `;

    // Send email (guarded by RESEND_API_KEY presence)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not set. Skipping email send.');
      return NextResponse.json(
        { success: true, message: 'Order submitted. Email service not configured.' },
        { status: 200 }
      );
    }

    const resend = new Resend(resendApiKey);
    const emailData: EmailData = {
      from: 'NatCon Merch <onboarding@resend.dev>', // Resend's default domain
      to: ['natcon2026sl@gmail.com'], // Replace with your email
      // to: ['bimsaramadurapperuma2003@gmail.com'],
      replyTo: email,
      subject: `NatCon Merch ${hasMerchPack ? '🎁 ' : ''}Order - ${name}`,
      html: emailHtml,
    };

    // Add attachment if exists
    if (attachment) {
      emailData.attachments = [attachment];
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send enhanced confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e91e63; text-align: center;">Order Confirmation ${hasMerchPack ? '🎁' : ''}</h1>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for your order! We have received your purchase and are processing it.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Summary:</h3>
          
          ${cartItemsData.length > 0 ? `
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <thead>
                <tr style="background-color: #f9f9f9; border-bottom: 1px solid #ddd;">
                  <th style="padding: 8px; text-align: left; font-size: 14px;">Item</th>
                  <th style="padding: 8px; text-align: center; font-size: 14px;">Qty</th>
                  <th style="padding: 8px; text-align: right; font-size: 14px;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${cartItemsData.map(item => {
      let itemDisplay = item.name;
      if (item.isMerchPack) {
        const specs = [];
        if (item.tshirtSize) specs.push(`T-shirt: ${item.tshirtSize}`);
        if (item.wristbandColor) specs.push(`Wristband: ${item.wristbandColor}`);
        if (specs.length > 0) itemDisplay += ` (${specs.join(', ')})`;
        itemDisplay += ' 🎁';
      } else {
        if (item.size) itemDisplay += ` (${item.size})`;
        if (item.color) itemDisplay += ` (${item.color})`;
      }

      return `
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 8px; font-size: 14px;">${itemDisplay}</td>
                      <td style="padding: 8px; text-align: center; font-size: 14px;">${item.quantity}</td>
                      <td style="padding: 8px; text-align: right; font-size: 14px; font-weight: bold;">${(item.price * item.quantity).toLocaleString()} LKR</td>
                    </tr>
                  `;
    }).join('')}
              </tbody>
            </table>
          ` : ''}
          
          <div style="border-top: 2px solid #e91e63; padding-top: 15px; margin-top: 15px;">
            <p><strong>Total Items:</strong> ${totalItems}</p>
            <p style="font-size: 18px; color: #e91e63;"><strong>Total Amount: ${totalAmount}</strong></p>
          </div>
          <p><strong>Order Date:</strong> ${new Date(orderDate).toLocaleString()}</p>
        </div>

        ${hasMerchPack ? `
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
            <h4 style="color: #2e7d32; margin: 0 0 8px 0;">🎁 Merch Pack Order</h4>
            <p style="margin: 0; color: #2e7d32; font-size: 14px;">
              Your order includes custom merch pack(s) with your selected t-shirt sizes and wristband colors. 
              We'll prepare your personalized items according to your specifications.
            </p>
          </div>
        ` : ''}

        <p>We will review your proof of purchase and contact you soon with further details.</p>
        
        <p style="text-align: center; margin-top: 30px;">
          <strong>Thank you for choosing NatCon 2026 Store!</strong>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'NatCon Store <onboarding@resend.dev>',
      to: [email],
      subject: `Order Confirmation ${hasMerchPack ? '🎁 ' : ''}- NatCon Store`,
      html: customerEmailHtml,
    });

    return NextResponse.json(
      { success: true, message: 'Order submitted successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}