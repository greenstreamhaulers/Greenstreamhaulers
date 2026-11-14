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
      to: ["your-email@example.com"],
      subject: `New Order from ${data.name}`,
      html: `
        <h2>New Order Details</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Details:</strong> ${data.details}</p>
      `,
    });

    return res.status(200).json({ message: "Order sent successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
