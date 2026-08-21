const DEFAULT_CLUSTER_API_URL = "http://127.0.0.1:9094";

export interface IpfsAddResult {
  cid: string;
  name?: string;
  size?: string;
}

export async function addToIpfsCluster(buffer: Buffer, filename: string): Promise<IpfsAddResult | null> {
  const apiUrl = process.env.IPFS_CLUSTER_API_URL?.trim() || "";
  if (!apiUrl) return null;

  const form = new FormData();
  form.append("file", new Blob([buffer], { type: "application/pdf" }), filename);
  const headers: Record<string, string> = {};
  if (process.env.IPFS_CLUSTER_BASIC_AUTH) {
    headers.Authorization = `Basic ${Buffer.from(process.env.IPFS_CLUSTER_BASIC_AUTH).toString("base64")}`;
  }

  const response = await fetch(`${apiUrl.replace(/\/$/, "")}/add?stream-channels=true`, {
    method: "POST",
    headers,
    body: form,
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`IPFS Cluster add failed: ${response.status} ${response.statusText}`);
  }

  const raw = await response.text();
  const records = raw.trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as { cid?: string; Hash?: string; name?: string; size?: string });
  const record = records.at(-1);
  const cid = record?.cid || record?.Hash;
  if (!cid) throw new Error("IPFS Cluster returned no CID");
  return { cid, name: record?.name, size: record?.size };
}

export function ipfsClusterConfigured(): boolean {
  return Boolean(process.env.IPFS_CLUSTER_API_URL?.trim());
}