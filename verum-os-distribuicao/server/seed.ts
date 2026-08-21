import { db } from "./db";
import { 
  users, applications, documents, terminalCommands, systemMetrics,
  type InsertUser, type InsertApplication, type InsertDocument, 
  type InsertTerminalCommand, type InsertSystemMetrics 
} from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Create default user
  const [defaultUser] = await db
    .insert(users)
    .values({
      username: "admin",
      password: "admin123" // In production, this should be hashed
    })
    .returning()
    .catch(() => []);

  if (!defaultUser) {
    console.log("👤 User already exists, skipping user creation");
    return;
  }

  console.log(`👤 Created user: ${defaultUser.username}`);

  // Sample applications
  const sampleApps: InsertApplication[] = [
    {
      name: "VS Code Enterprise",
      description: "Professional code editor with enterprise security features and AXON integration.",
      version: "1.85.2",
      category: "Development",
      developer: "Microsoft",
      iconUrl: null,
      downloadUrl: null,
      size: 245 * 1024 * 1024,
      rating: 5,
      downloads: 125000,
      isVerified: true,
      securityValidated: true,
      metadata: { tags: ["editor", "ide", "enterprise"], license: "MIT" }
    },
    {
      name: "AXON Security Suite",
      description: "Comprehensive security platform with hardware validation and witness protocol integration.",
      version: "2.4.1",
      category: "Security",
      developer: "VERUM Labs",
      iconUrl: null,
      downloadUrl: null,
      size: 89 * 1024 * 1024,
      rating: 5,
      downloads: 87000,
      isVerified: true,
      securityValidated: true,
      metadata: { tags: ["security", "axon", "enterprise"], license: "Proprietary" }
    },
    {
      name: "Holographic Designer",
      description: "Advanced 3D design platform with holographic rendering and enterprise collaboration features.",
      version: "1.2.0",
      category: "Design",
      developer: "VERUM Creative",
      iconUrl: null,
      downloadUrl: null,
      size: 512 * 1024 * 1024,
      rating: 4,
      downloads: 45000,
      isVerified: true,
      securityValidated: true,
      metadata: { tags: ["design", "3d", "holographic"], license: "Commercial" }
    },
    {
      name: "Terminal Infinite Pro",
      description: "Advanced terminal with cross-platform command execution and enterprise automation.",
      version: "3.1.0",
      category: "Development",
      developer: "VERUM Labs",
      iconUrl: null,
      downloadUrl: null,
      size: 67 * 1024 * 1024,
      rating: 5,
      downloads: 92000,
      isVerified: true,
      securityValidated: true,
      metadata: { tags: ["terminal", "automation", "enterprise"], license: "Proprietary" }
    }
  ];

  await db.insert(applications).values(sampleApps);
  console.log(`📱 Created ${sampleApps.length} applications`);

  // Sample documents
  const sampleDocs: InsertDocument[] = [
    {
      title: "Enterprise Architecture Blueprint",
      type: "writer",
      content: { text: "Comprehensive enterprise architecture documentation...", format: "rich-text" },
      size: 247 * 1024,
      ownerId: defaultUser.id,
      isEncrypted: true,
      syncStatus: "synced"
    },
    {
      title: "Q4 Performance Analysis",
      type: "calc",
      content: { data: "Financial performance data and analytics...", format: "spreadsheet" },
      size: 1200 * 1024,
      ownerId: defaultUser.id,
      isEncrypted: true,
      syncStatus: "syncing"
    },
    {
      title: "VERUM OS Product Demo",
      type: "present",
      content: { slides: "Product demonstration presentation...", format: "presentation" },
      size: 15700 * 1024,
      ownerId: defaultUser.id,
      isEncrypted: true,
      syncStatus: "synced"
    }
  ];

  await db.insert(documents).values(sampleDocs);
  console.log(`📄 Created ${sampleDocs.length} documents`);

  // Sample terminal commands
  const sampleCommands: InsertTerminalCommand[] = [
    {
      command: "gibmacos --list-versions",
      output: "[INFO] Fetching macOS versions from Apple servers...\n[SUCCESS] Found 47 available versions\n14.2.1 (23C71) - macOS Sonoma - Available",
      userId: defaultUser.id
    },
    {
      command: "axon-omega --status",
      output: "[AXON] OMEGA EXECUTOR Status: ACTIVE\n[AXON] Security Level: MAXIMUM\n[AXON] Witness Protocol: ENABLED\n[AXON] Hardware Validation: PASSED",
      userId: defaultUser.id
    },
    {
      command: "verum-office --launch-decentralized",
      output: "[VERUM] Initializing decentralized office suite...\n[VERUM] P2P Document Sync: ENABLED\n[VERUM] Offline Capabilities: ACTIVE\n[VERUM] Enterprise Security: ENFORCED",
      userId: defaultUser.id
    },
    {
      command: "npm run build:universal",
      output: "[BUILD] TOML Universal Build System\n[BUILD] Cross-platform compilation: Windows, macOS, Linux\n[BUILD] Package generation: .exe, .app, .deb, .rpm\n[SUCCESS] Build completed in 45.2s",
      userId: defaultUser.id
    }
  ];

  await db.insert(terminalCommands).values(sampleCommands);
  console.log(`💻 Created ${sampleCommands.length} terminal commands`);

  // Sample system metrics
  const currentMetrics: InsertSystemMetrics = {
    cpuUsage: 12,
    memoryUsage: 8,
    diskUsage: 65,
    networkActivity: 24,
    securityStatus: "secure",
    witnessProtocolActive: true
  };

  await db.insert(systemMetrics).values(currentMetrics);
  console.log("📊 Created system metrics");

  console.log("✅ Database seeded successfully!");
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };