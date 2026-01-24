import { RequestHandler } from "express";
import twilio from "twilio";

const accountSid = "AC263af387b4c70921cf392a7b125de152";
const authToken = "e6a72ccccfeb9e2de21f768afd5cafa1";
const client = twilio(accountSid, authToken);

// Your WhatsApp number (from Twilio)
const fromNumber = "whatsapp:+14155238886";
// Your personal WhatsApp number to receive notifications
const toNumber = "whatsapp:+212612989463";

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
