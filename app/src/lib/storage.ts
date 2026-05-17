import fs from "fs";
import path from "path";

// In-memory store for Vercel (writable area may be limited in serverless)
const memoryStore: Record<string, any[]> = {};

function isVercel(): boolean {
  return process.env.VERCEL === "1";
}

function getDataDir(): string {
  if (isVercel()) {
    return "/tmp/data";
  }
  return path.join(process.cwd(), "..", "data");
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readJSON(filename: string): any[] {
  // On Vercel, use in-memory store to avoid EROFS issues
  if (isVercel()) {
    if (!memoryStore[filename]) {
      memoryStore[filename] = [];
    }
    return memoryStore[filename];
  }

  const dir = getDataDir();
  const filePath = path.join(dir, filename);
  ensureDir(dir);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
    return [];
  }
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

export function writeJSON(filename: string, data: any[]) {
  // On Vercel, use in-memory store to avoid EROFS issues
  if (isVercel()) {
    memoryStore[filename] = data;
    return;
  }

  const dir = getDataDir();
  const filePath = path.join(dir, filename);
  ensureDir(dir);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}
