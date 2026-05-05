import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
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
    try {
      const { name, email, company, message } = req.body;
      const file = req.file;

      if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not defined");
        return res.status(500).json({ error: "Email service not configured" });
      }

      console.log(`Sending email from: ${name} (${email})`);

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
          <h1>New Inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        attachments: attachments,
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
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
