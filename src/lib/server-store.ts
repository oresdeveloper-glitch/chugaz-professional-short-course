import fs from "fs"
import path from "path"
import os from "os"

const TMP = process.env.CHUGAZ_DATA_DIR || os.tmpdir()
const DATA_FILE = path.join(TMP, "chugaz_data.json")

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
        password: "admin123",
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

function readData(): StoredData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
    }
  } catch {}
  return getDefaults()
}

function writeData(data: StoredData): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

const counterFile = path.join(TMP, "chugaz_counter.txt")

function getNextRegNumber(): string {
  let counter = 1
  try {
    if (fs.existsSync(counterFile)) {
      counter = parseInt(fs.readFileSync(counterFile, "utf-8").trim(), 10) + 1
    }
  } catch {}
  fs.writeFileSync(counterFile, String(counter))
  return `CHG2026${String(counter).padStart(5, "0")}`
}

export { readData, writeData, getNextRegNumber }
export type { StoredData }
