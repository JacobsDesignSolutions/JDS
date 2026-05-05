import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending emails
  app.post("/api/send-email", upload.single("attachment"), async (req, res) => {
    console.log("POST /api/send-email received");
    try {
      const { name, email, company, message } = req.body;
      const file = req.file;

      const apiKey = process.env.RESEND_API_KEY;

      if (!apiKey) {
        console.error("RESEND_API_KEY is not defined in environment");
        return res.status(500).json({ 
          error: "Email service not configured. Please add RESEND_API_KEY to environment variables." 
        });
      }

      const resend = new Resend(apiKey);
      console.log(`Attempting to send email from: ${name} (${email})`);

      const attachments = file ? [
        {
          filename: file.originalname,
          content: file.buffer,
        }
      ] : [];

      const { data, error } = await resend.emails.send({
        from: 'JDS Contact Form <onboarding@resend.dev>',
        to: ['info@jacobsdesignsolutions.com'],
        subject: `New Inquiry from ${name} (${company || 'No Company'})`,
        replyTo: email,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
            <h1 style="color: #00D1FF;">New Project Inquiry</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
        attachments: attachments,
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(400).json({ error: error.message });
      }

      console.log("Email sent successfully:", data?.id);
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Server Error in /api/send-email:", err);
      res.status(500).json({ error: "Internal server error. Please check server logs." });
    }
  });

  // Catch-all for API routes to ensure they always return JSON
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API route ${req.method} ${req.url} not found` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
