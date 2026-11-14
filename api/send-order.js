import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Greenstream Haulers <onboarding@resend.dev>",
      to: ["greenstreamhaulers@gmail.com"],
      subject: `New Hauling Booking #${data.jobId} - ${data.service} (${data.total})`,
      html: `
        <h2>New Greenstream Haulers Booking</h2>
        <p><strong>Job ID:</strong> #${data.jobId}</p>
        <p><strong>Customer Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Pickup Address:</strong> ${data.address}</p>
        <p><strong>Service / Load Size:</strong> ${data.service}</p>
        <p><strong>Total Price:</strong> ${data.total}</p>
        <p><strong>Time Window:</strong> ${data.window}</p>
      `,
    });

    return res.status(200).json({ message: "Order email sent!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
