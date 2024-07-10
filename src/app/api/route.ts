// pages/api/notify.js
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = req.body;
      console.log('Webhook received:', body);

      // Process the webhook data here
      handleTrackingUpdate(body);

      res.status(200).json({ message: 'Webhook received successfully' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

function handleTrackingUpdate(data:any) {
  // Add your logic to handle the tracking update here
  console.log('Processing tracking update:', data);

  // Example: Log the tracking number and status
  const trackingNumber = data.data.number;
  const status = data.data.track_info.latest_status.status;
  console.log(`Tracking number: ${trackingNumber}, Status: ${status}`);

  // You can add more processing logic here
  // For example, update a database, send a notification, etc.
}
