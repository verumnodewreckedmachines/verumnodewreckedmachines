import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const OTS_DIR = path.resolve("uploads", "opentimestamps");
const OTS_CLI = path.resolve("node_modules", "javascript-opentimestamps", "ots-cli.js");

export interface OpenTimestampResult {
  status: "pending";
  algorithm: "sha256";
  hash: string;
  proofFilename: string;
  proofBase64: string;
}

export function openTimestampsConfigured(): boolean {
  return process.env.OPENTIMESTAMPS_ENABLED === "true";
}

export async function stampSha256(hash: string): Promise<OpenTimestampResult> {
  if (!/^[a-f0-9]{64}$/i.test(hash)) throw new Error("Invalid SHA-256 hash");

  await fs.mkdir(OTS_DIR, { recursive: true });
  const proofFilename = `${hash}.ots`;
  const proofPath = path.join(OTS_DIR, proofFilename);

  try {
    await fs.access(proofPath);
  } catch {
    await execFileAsync(process.execPath, [OTS_CLI, "stamp", "-d", hash], {
      cwd: OTS_DIR,
      timeout: 45_000,
      windowsHide: true,
    });
  }

  const proof = await fs.readFile(proofPath);
  return {
    status: "pending",
    algorithm: "sha256",
    hash: hash.toLowerCase(),
    proofFilename,
    proofBase64: proof.toString("base64"),
  };
}
