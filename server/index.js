// server/index.js
import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");
const app = express();
app.use(express.json());
app.use(express.static(distPath));
app.use((req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"));
});

function parseProperties(text) {
    const out = {};
    const lines = text.replace(/\r\n?/g, "\n").split("\n");
    let k = null,
        v = "";
    const flush = () => {
        if (k !== null) {
            out[k.trim()] = v.trim();
            k = null;
            v = "";
        }
    };
    for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith("#") || line.startsWith(";")) continue;
        const cont = /\\$/.test(line);
        if (k === null) {
            const i = Math.max(line.indexOf("="), line.indexOf(":"));
            if (i === -1) {
                k = line;
                v = "";
            } else {
                k = line.slice(0, i).trim();
                v = line.slice(i + 1);
            }
        } else {
            v += line;
        }
        if (!cont) flush();
        else v = v.slice(0, -1) + "\n";
    }
    flush();
    return out;
}

// Load recipient email from the same locales used by the frontend
function getRecipientFromLocale(locale = "en") {
    const localesDir = path.resolve(__dirname, "../src/i18n/locales");
    const tryFiles = [
        path.join(localesDir, `${locale}.properties`),
        path.join(localesDir, `en.properties`),
    ];
    for (const f of tryFiles) {
        if (fs.existsSync(f)) {
            const dict = parseProperties(fs.readFileSync(f, "utf8"));
            if (dict["contact.email.to"]) return dict["contact.email.to"];
        }
    }
    return null;
}

// Configure SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure:
        process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
    auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
            ? {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
              }
            : undefined,
});

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Controller: handle contact form
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, phone, message, locale = "en" } = req.body || {};
        if (!name || !email || !phone)
            return res.status(400).json({ error: "Missing required fields" });

        const to = getRecipientFromLocale(locale);
        if (!to)
            return res.status(500).json({
                error: "Recipient email not configured in properties",
            });

        const html = `
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Message:</strong></p>
            <pre style="white-space:pre-wrap">${escapeHtml(message || "")}</pre>
            `;
        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject: `Contact form — ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${
                message || ""
            }`,
            html,
        });

        return res.json({ ok: true, id: info.messageId });
    } catch (err) {
        console.error("Contact error:", err);
        return res.status(500).json({ error: "Failed to send email" });
    }
});

function escapeHtml(s = "") {
    return String(s).replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            }[c])
    );
}

const PORT = process.env.PORT || 3017;
app.listen(PORT, () =>
    console.log(`API listening on http://localhost:${PORT}`)
);
app.get("/api/health", (req, res) => res.json({ ok: true }));

