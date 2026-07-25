import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import os from "os"

const isConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS)

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null

export async function sendResetCodeEmail(to: string, code: string): Promise<boolean> {
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Chugaz Stationery" <${process.env.SMTP_USER}>`,
        to,
        subject: "Password Reset Code - Chugaz Stationery",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#fff;border-radius:12px;border:1px solid #e5e7eb">
            <div style="text-align:center;margin-bottom:24px">
              <h1 style="color:#0B1F4D;font-size:24px;margin:0">Password Reset</h1>
              <p style="color:#6b7280;font-size:14px;margin:8px 0 0">Chugaz Stationery</p>
            </div>
            <p style="color:#374151;font-size:14px;line-height:1.6">Use the code below to reset your password. It expires in 15 minutes.</p>
            <div style="text-align:center;margin:24px 0;padding:16px;background:#f3f4f6;border-radius:8px">
              <span style="font-size:36px;font-weight:700;color:#0B1F4D;letter-spacing:8px">${code}</span>
            </div>
            <p style="color:#9ca3af;font-size:12px;line-height:1.5">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      })
      return true
    } catch { return false }
  }
  const tmpDir = process.env.CHUGAZ_DATA_DIR || os.tmpdir()
  fs.appendFileSync(path.join(tmpDir, "chugaz_reset_codes.log"), `[${new Date().toISOString()}] ${to} -> ${code}\n`)
  return true
}

export { isConfigured }
