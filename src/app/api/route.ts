import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const API_KEY = "4B3548E5A92FFED2C83ACA9E365A4D5F";

const verifySignature = (body: string, signature: string): boolean => {
  const src = `${body}/${API_KEY}`;
  const hash = crypto.createHash("sha256").update(src).digest("hex");
  return hash === signature;
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('sign') as string;

  if (!verifySignature(body, signature)) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    }, { status: 401 });
  }

  const data = JSON.parse(body);
  console.log("Received webhook:", data);

  // Process the webhook data here

  return NextResponse.json({
    status: 200,
    message: "Webhook received",
  }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({
    status: 405,
    message: "Method Not Allowed",
  }, { status: 405 });
}
