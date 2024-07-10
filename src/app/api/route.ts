import { NextRequest, NextResponse } from 'next/server';



export async function POST(request: NextRequest) {
  const body = await request.text();

  

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
