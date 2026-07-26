import fs from "fs"
import path from "path"
import os from "os"

function getDataDir(): string {
  if (process.env.CHUGAZ_DATA_DIR) return process.env.CHUGAZ_DATA_DIR
  const projectDir = path.join(process.cwd(), "data")
  if (process.env.VERCEL !== "1") return projectDir
  try {
    fs.accessSync(projectDir, fs.constants.W_OK)
    return projectDir
  } catch {
    return os.tmpdir()
  }
}

const DATA_DIR = getDataDir()
const DATA_FILE = path.join(DATA_DIR, "chugaz_data.json")
const LOCK_FILE = path.join(DATA_DIR, "chugaz.lock")
const COUNTER_FILE = path.join(DATA_DIR, "chugaz_counter.txt")

interface StoredData {
  students: any[]
  admins: any[]
  courses: any[]
  messages: any[]
  tokens: any[]
  notifications: any[]
  resetCodes: any[]
}

function getDefaults(): StoredData {
  return {
    students: [],
    admins: [
      {
        id: 1,
        name: "System Administrator",
        email: "admin@chugazstationery.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
        role: "super_admin",
        phone: "+255629849802",
      },
    ],
    courses: [
      { id: 1, title: "Computer Basics", slug: "computer-basics", category: "Computer Skills", fee: 100000 },
      { id: 2, title: "C Programming", slug: "c-programming", category: "Programming Languages", fee: 150000 },
      { id: 3, title: "C++", slug: "c-2", category: "Programming Languages", fee: 150000 },
      { id: 4, title: "Python", slug: "python", category: "Programming Languages", fee: 250000 },
      { id: 5, title: "Java", slug: "java", category: "Programming Languages", fee: 200000 },
      { id: 6, title: "JavaScript", slug: "javascript", category: "Programming Languages", fee: 180000 },
      { id: 7, title: "HTML & CSS", slug: "html-css", category: "Programming Languages", fee: 100000 },
      { id: 8, title: "Website Design", slug: "website-design", category: "Creative Skills", fee: 300000 },
      { id: 9, title: "Graphic Design", slug: "graphic-design", category: "Creative Skills", fee: 250000 },
      { id: 10, title: "AutoCAD", slug: "autocad", category: "Engineering & Design", fee: 150000 },
      { id: 11, title: "ArchiCAD", slug: "archicad", category: "Engineering & Design", fee: 150000 },
      { id: 12, title: "SolidWorks", slug: "solidworks", category: "Engineering & Design", fee: 200000 },
      { id: 13, title: "Microsoft Word", slug: "microsoft-word", category: "Computer Skills", fee: 100000 },
      { id: 14, title: "Microsoft Excel", slug: "microsoft-excel", category: "Computer Skills", fee: 100000 },
      { id: 15, title: "Microsoft PowerPoint", slug: "microsoft-powerpoint", category: "Computer Skills", fee: 100000 },
    ],
    messages: [],
    tokens: [],
    notifications: [],
    resetCodes: [],
  }
}

function ensureDir(): void {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function acquireLock(timeout = 3000): boolean {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      fs.mkdirSync(LOCK_FILE)
      return true
    } catch {
      for (let i = 0; i < 5000; i++) {}
    }
  }
  return false
}

function releaseLock(): void {
  try { fs.rmdirSync(LOCK_FILE) } catch {}
}

function readData(): StoredData {
  try {
    ensureDir()
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
    }
    const oldTmp = path.join(os.tmpdir(), "chugaz_data.json")
    if (fs.existsSync(oldTmp)) {
      const data = JSON.parse(fs.readFileSync(oldTmp, "utf-8"))
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
      try { fs.unlinkSync(oldTmp) } catch {}
      return data
    }
  } catch (e) { console.error("readData error:", e) }
  return getDefaults()
}

function writeData(data: StoredData): void {
  ensureDir()
  if (!acquireLock()) {
    console.error("writeData: could not acquire lock, writing anyway")
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    } catch (e) { console.error("writeData error:", e) }
    return
  }
  try {
    const tmp = DATA_FILE + ".tmp." + Date.now()
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2))
    fs.renameSync(tmp, DATA_FILE)
  } catch (e) { console.error("writeData error:", e) }
  finally { releaseLock() }
}

function getNextRegNumber(): string {
  let counter = 1
  ensureDir()
  if (acquireLock()) {
    try {
      if (fs.existsSync(COUNTER_FILE)) {
        counter = parseInt(fs.readFileSync(COUNTER_FILE, "utf-8").trim(), 10) + 1
      }
      const tmp = COUNTER_FILE + ".tmp." + Date.now()
      fs.writeFileSync(tmp, String(counter))
      fs.renameSync(tmp, COUNTER_FILE)
    } catch (e) { console.error("counter write error:", e) }
    finally { releaseLock() }
  } else {
    if (fs.existsSync(COUNTER_FILE)) {
      try {
        counter = parseInt(fs.readFileSync(COUNTER_FILE, "utf-8").trim(), 10) + 1
      } catch {}
    }
    try { fs.writeFileSync(COUNTER_FILE, String(counter)) } catch (e) { console.error("counter fallback error:", e) }
  }
  return `CHG2026${String(counter).padStart(5, "0")}`
}

export { readData, writeData, getNextRegNumber, DATA_DIR }
export type { StoredData }
