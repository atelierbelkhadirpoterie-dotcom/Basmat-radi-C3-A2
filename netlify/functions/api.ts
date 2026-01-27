import { Handler } from "@netlify/functions";
import serverless from "serverless-http";
import { createServer } from "../../server/index";

// Create Express app
const app = createServer();

// Wrap with serverless-http
const handler: Handler = serverless(app);

// Export handler for Netlify
export { handler };
