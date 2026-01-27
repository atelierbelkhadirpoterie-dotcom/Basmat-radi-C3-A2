import { RequestHandler } from "express";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.warn(
    "TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN is not configured. WhatsApp notifications will not work."
  );
}

const client = twilio(accountSid, authToken);

// Your WhatsApp number (from Twilio)
const fromNumber = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";
// Your personal WhatsApp number to receive notifications
const toNumber =
  process.env.TWILIO_TO_NUMBER || "whatsapp:+212612989463";

interface DonationData {
  firstName: string;
  lastName: string;
  phone: string;
  donationType: "financial" | "material";
  amount?: number;
  selectedItems?: string[];
}

export const handleDonationNotification: RequestHandler = async (req, res) => {
  try {
    const { firstName, lastName, phone, donationType, amount, selectedItems } =
      req.body as DonationData;

    // Format the donation message
    let messageText = `🎁 Nouvelle notification de don!\n\n`;
    messageText += `👤 Donateur: ${firstName} ${lastName}\n`;
    messageText += `📱 Téléphone: ${phone}\n`;
    messageText += `💝 Type: ${
      donationType === "financial" ? "Don Financier" : "Don Matériel"
    }\n`;

    if (donationType === "financial" && amount) {
      messageText += `💵 Montant: ${amount} MAD\n`;
    } else if (donationType === "material" && selectedItems) {
      messageText += `📦 Articles:\n${selectedItems
        .map((item) => `  • ${item}`)
        .join("\n")}\n`;
    }

    // Send WhatsApp message
    const message = await client.messages.create({
      from: fromNumber,
      body: messageText,
      to: toNumber,
    });

    console.log(`WhatsApp notification sent: ${message.sid}`);

    return res.json({
      success: true,
      message: "Notification sent successfully",
      messageSid: message.sid,
    });
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
