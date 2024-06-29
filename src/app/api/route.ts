// pages/api/webhook.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const API_KEY = process.env.API_KEY as string; // Access the API key from environment variables

const verifySignature = (body: string, signature: string): boolean => {
  const src = `${body}/${API_KEY}`;
  const hash = crypto.createHash("sha256").update(src).digest("hex");
  return hash === signature;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const body = await new Promise<string>((resolve, reject) => {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => resolve(data));
      req.on('error', reject);
    });
    const signature = req.headers['sign'] as string;

    if (!verifySignature(body, signature)) {
      res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
      return;
    }

    const data = JSON.parse(body);
    console.log("Received webhook:", data);

    // Process the webhook data here

    res.status(200).json({
      status: 200,
      message: "Webhook received",
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      status: 405,
      message: "Method Not Allowed",
    });
  }
}
