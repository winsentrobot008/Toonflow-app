import fs from "fs";
import path from "path";

function getDataDir(): string {
  // On Vercel, /tmp is the only writable directory
  if (process.env.VERCEL === "1") {
    return "/tmp/data";
  }
  // Locally, store data in the project root's data/ directory
  return path.join(process.cwd(), "..", "data");
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readJSON(filename: string): any[] {
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
  const dir = getDataDir();
  const filePath = path.join(dir, filename);
  ensureDir(dir);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}
