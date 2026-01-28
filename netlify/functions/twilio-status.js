exports.handler = async (event) => {
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

  return {
    statusCode: 200,
    body: JSON.stringify(status),
  };
};
