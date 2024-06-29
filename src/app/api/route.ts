// pages/api/webhook.js

import { NextResponse } from "next/server";
import crypto from "crypto";

const API_KEY = process.env.API_KEY; // Make sure to set your API key in environment variables

const verifySignature = (body, signature) => {
  const src = `${body}/${API_KEY}`;
  const hash = crypto.createHash("sha256").update(src).digest("hex");
  return hash === signature;
};

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("sign");

  if (!verifySignature(body, signature)) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  const data = JSON.parse(body);
  console.log("Received webhook:", data);

  // Process the webhook data here

  return NextResponse.json({
    status: 200,
    message: "Webhook received",
  });
}

export async function GET(request) {
  return NextResponse.json({
    status: 405,
    message: "Method Not Allowed",
  });
}
