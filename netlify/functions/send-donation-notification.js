const twilio = require("twilio");

exports.handler = async (event) => {
  // Only handle POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

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
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "Twilio is not properly configured on this server",
          error: "Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN",
        }),
      };
    }

    // Create client only if credentials are available
    const client = twilio(accountSid, authToken);

    // Your WhatsApp number (from Twilio)
    const fromNumber =
      process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";
    // Your personal WhatsApp number to receive notifications
    const toNumber =
      process.env.TWILIO_TO_NUMBER || "whatsapp:+212612989463";

    const body = JSON.parse(event.body || "{}");
    const { firstName, lastName, phone, donationType, amount, selectedItems } =
      body;

    // Validate required fields
    if (!firstName || !lastName || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields: firstName, lastName, phone",
        }),
      };
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Notification sent successfully",
        messageSid: message.sid,
      }),
    };
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);

    // Extract detailed error info
    let errorMessage = "Unknown error";
    let errorStatus = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      // Check if it's a Twilio error with code
      if ("code" in error) {
        console.error(`Twilio Error Code: ${error.code}`);
      }
      if ("status" in error) {
        errorStatus = error.status || 500;
      }
    }

    return {
      statusCode: errorStatus,
      body: JSON.stringify({
        success: false,
        message: "Failed to send notification",
        error: errorMessage,
      }),
    };
  }
};
