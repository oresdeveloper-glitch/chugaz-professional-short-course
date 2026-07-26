import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import os from "os"

const SMTP_USER = process.env.SMTP_USER?.trim() || ""
const SMTP_PASS = process.env.SMTP_PASS?.trim() || ""
const isConfigured = !!(SMTP_USER && SMTP_PASS)

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT?.trim() || "587", 10),
      secure: process.env.SMTP_SECURE?.trim() === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null

const logFile = path.join(process.env.CHUGAZ_DATA_DIR || os.tmpdir(), "chugaz_email.log")

function log(msg: string) {
  try {
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${msg}\n`)
  } catch {}
}

export async function sendResetCodeEmail(to: string, code: string): Promise<{ ok: boolean; error?: string }> {
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"Chugaz Stationery" <${SMTP_USER}>`,
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
      log(`Email sent to ${to}: ${info.messageId}`)
      return { ok: true }
    } catch (e: any) {
      const msg = e?.response?.includes?.("534") ? "Gmail requires an App Password (not your regular password). Generate one at https://myaccount.google.com/apppasswords" :
        e?.code === "EAUTH" ? "SMTP authentication failed. Check SMTP_USER and SMTP_PASS." :
        e?.code === "ESOCKET" ? "Cannot connect to SMTP server. Check SMTP_HOST and SMTP_PORT." :
        e?.message || "Unknown SMTP error"
      log(`SMTP error for ${to}: ${msg}`)
      return { ok: false, error: msg }
    }
  }
  const tmpDir = process.env.CHUGAZ_DATA_DIR || os.tmpdir()
  fs.appendFileSync(path.join(tmpDir, "chugaz_reset_codes.log"), `[${new Date().toISOString()}] ${to} -> ${code}\n`)
  log(`Dev mode: code ${code} for ${to} written to reset_codes.log`)
  return { ok: true }
}

export function testConnection(): Promise<{ ok: boolean; error?: string }> {
  if (!transporter) {
    return Promise.resolve({ ok: false, error: "SMTP not configured. Set SMTP_USER and SMTP_PASS in .env.local" })
  }
  return new Promise((resolve) => {
    transporter.verify((err) => {
      if (err) {
        const msg = err.message?.includes?.("534") ? "Gmail requires an App Password. See .env.example" :
          err.message || "SMTP verification failed"
        resolve({ ok: false, error: msg })
      } else {
        resolve({ ok: true })
      }
    })
  })
}

export { isConfigured }
