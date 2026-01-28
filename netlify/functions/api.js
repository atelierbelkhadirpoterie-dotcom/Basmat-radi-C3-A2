const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Donation notification endpoint
app.post("/api/send-donation-notification", async (req, res) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    console.log("🔍 Twilio Configuration Check:");
    console.log(
      "  - TWILIO_ACCOUNT_SID:",
      accountSid ? "✅ Set" : "❌ Missing"
    );
    console.log(
      "  - TWILIO_AUTH_TOKEN:",
      authToken ? "✅ Set" : "❌ Missing"
    );
    console.log(
      "  - TWILIO_WHATSAPP_FROM:",
      process.env.TWILIO_WHATSAPP_FROM ? "✅ Set" : "❌ Missing"
    );
    console.log(
      "  - TWILIO_TO_NUMBER:",
      process.env.TWILIO_TO_NUMBER ? "✅ Set" : "❌ Missing"
    );

    // Check if Twilio is properly configured
    if (!accountSid || !authToken) {
      console.error("Twilio client not initialized. Missing credentials.");
      return res.status(500).json({
        success: false,
        message: "Twilio is not properly configured on this server",
        error: "Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN",
      });
    }

    // Create Twilio client
    const client = twilio(accountSid, authToken);

    const fromNumber =
      process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";
    const toNumber =
      process.env.TWILIO_TO_NUMBER || "whatsapp:+212612989463";

    const { firstName, lastName, phone, donationType, amount, selectedItems } =
      req.body;

    // Validate required fields
    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: firstName, lastName, phone",
      });
    }

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

    let errorMessage = "Unknown error";
    let errorStatus = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if ("code" in error) {
        console.error(`Twilio Error Code: ${error.code}`);
      }
      if ("status" in error) {
        errorStatus = error.status || 500;
      }
    }

    return res.status(errorStatus).json({
      success: false,
      message: "Failed to send notification",
      error: errorMessage,
    });
  }
});

// Twilio status endpoint
app.get("/api/twilio-status", (req, res) => {
  const status = {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID
      ? "✅ Configured"
      : "❌ Missing",
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN
      ? "✅ Configured"
      : "❌ Missing",
    TWILIO_WHATSAPP_FROM:
      process.env.TWILIO_WHATSAPP_FROM || "Default: whatsapp:+14155238886",
    TWILIO_TO_NUMBER:
      process.env.TWILIO_TO_NUMBER || "Default: whatsapp:+212612989463",
    environment: process.env.NODE_ENV,
  };

  return res.json(status);
});

// Health check
app.get("/api/ping", (req, res) => {
  const ping = process.env.PING_MESSAGE ?? "ping";
  res.json({ message: ping });
});

module.exports.handler = serverless(app);
