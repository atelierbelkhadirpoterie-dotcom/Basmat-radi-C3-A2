import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleDonationNotification } from "./routes/send-donation-notification";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Diagnostic endpoint
  app.get("/api/twilio-status", (_req, res) => {
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
    res.json(status);
  });

  // Donation notification route
  app.post("/api/send-donation-notification", handleDonationNotification);

  return app;
}
