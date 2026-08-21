import { 
  users, applications, documents, terminalCommands, systemMetrics,
  type User, type InsertUser,
  type Application, type InsertApplication,
  type Document, type InsertDocument,
  type TerminalCommand, type InsertTerminalCommand,
  type SystemMetrics, type InsertSystemMetrics
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Application methods
  getAllApplications(): Promise<Application[]>;
  getApplication(id: number): Promise<Application | undefined>;
  getApplicationsByCategory(category: string): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, updates: Partial<InsertApplication>): Promise<Application | undefined>;

  // Document methods
  getAllDocuments(userId?: number, type?: string): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  getDocumentsByUser(userId: number): Promise<Document[]>;
  getDocumentsByType(type: string): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: number, updates: Partial<InsertDocument>): Promise<Document | undefined>;

  // Terminal command methods
  getTerminalCommands(userId?: number, limit?: number): Promise<TerminalCommand[]>;
  createTerminalCommand(command: InsertTerminalCommand): Promise<TerminalCommand>;

  // System metrics methods
  getSystemMetrics(limit?: number): Promise<SystemMetrics[]>;
  getLatestSystemMetrics(): Promise<SystemMetrics | undefined>;
  createSystemMetrics(metrics: InsertSystemMetrics): Promise<SystemMetrics>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private applications: Map<number, Application>;
  private documents: Map<number, Document>;
  private terminalCommands: Map<number, TerminalCommand>;
  private systemMetrics: Map<number, SystemMetrics>;
  private currentUserId: number;
  private currentApplicationId: number;
  private currentDocumentId: number;
  private currentTerminalCommandId: number;
  private currentSystemMetricsId: number;

  constructor() {
    this.users = new Map();
    this.applications = new Map();
    this.documents = new Map();
    this.terminalCommands = new Map();
    this.systemMetrics = new Map();
    this.currentUserId = 1;
    this.currentApplicationId = 1;
    this.currentDocumentId = 1;
    this.currentTerminalCommandId = 1;
    this.currentSystemMetricsId = 1;

    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize sample applications
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
      }
    ];

    sampleApps.forEach(app => this.createApplication(app));

    // Initialize sample documents
    const sampleDocs: InsertDocument[] = [
      {
        title: "Enterprise Architecture Blueprint",
        type: "writer",
        content: { text: "Comprehensive enterprise architecture documentation...", format: "rich-text" },
        size: 247 * 1024,
        ownerId: 1,
        isEncrypted: true,
        syncStatus: "synced"
      },
      {
        title: "Q4 Performance Analysis",
        type: "calc",
        content: { data: "Financial performance data and analytics...", format: "spreadsheet" },
        size: 1200 * 1024,
        ownerId: 1,
        isEncrypted: true,
        syncStatus: "syncing"
      },
      {
        title: "VERUM OS Product Demo",
        type: "present",
        content: { slides: "Product demonstration presentation...", format: "presentation" },
        size: 15700 * 1024,
        ownerId: 1,
        isEncrypted: true,
        syncStatus: "synced"
      }
    ];

    sampleDocs.forEach(doc => this.createDocument(doc));

    // Initialize sample terminal commands
    const sampleCommands: InsertTerminalCommand[] = [
      {
        command: "gibmacos --list-versions",
        output: "[INFO] Fetching macOS versions from Apple servers...\n[SUCCESS] Found 47 available versions\n14.2.1 (23C71) - macOS Sonoma - Available",
        userId: 1
      },
      {
        command: "axon-omega --status",
        output: "[AXON] OMEGA EXECUTOR Status: ACTIVE\n[AXON] Security Level: MAXIMUM\n[AXON] Witness Protocol: ENABLED\n[AXON] Hardware Validation: PASSED",
        userId: 1
      },
      {
        command: "verum-office --launch-decentralized",
        output: "[VERUM] Initializing decentralized office suite...\n[VERUM] P2P Document Sync: ENABLED\n[VERUM] Offline Capabilities: ACTIVE\n[VERUM] Enterprise Security: ENFORCED",
        userId: 1
      }
    ];

    sampleCommands.forEach(cmd => this.createTerminalCommand(cmd));

    // Initialize sample system metrics
    const currentMetrics: InsertSystemMetrics = {
      cpuUsage: 12,
      memoryUsage: 8,
      diskUsage: 65,
      networkActivity: 24,
      securityStatus: "secure",
      witnessProtocolActive: true
    };

    this.createSystemMetrics(currentMetrics);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Application methods
  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applications.values())
      .sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  }

  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationsByCategory(category: string): Promise<Application[]> {
    return Array.from(this.applications.values())
      .filter(app => app.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = {
      ...insertApplication,
      id,
      createdAt: new Date(),
      description: insertApplication.description ?? null,
      iconUrl: insertApplication.iconUrl ?? null,
      downloadUrl: insertApplication.downloadUrl ?? null,
      size: insertApplication.size ?? null,
      rating: insertApplication.rating ?? null,
      downloads: insertApplication.downloads ?? null,
      isVerified: insertApplication.isVerified ?? null,
      securityValidated: insertApplication.securityValidated ?? null,
      metadata: insertApplication.metadata ?? null
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplication(id: number, updates: Partial<InsertApplication>): Promise<Application | undefined> {
    const existing = this.applications.get(id);
    if (!existing) return undefined;

    const updated: Application = { ...existing, ...updates };
    this.applications.set(id, updated);
    return updated;
  }

  // Document methods
  async getAllDocuments(userId?: number, type?: string): Promise<Document[]> {
    let docs = Array.from(this.documents.values());
    
    if (userId) {
      docs = docs.filter(doc => doc.ownerId === userId);
    }
    
    if (type) {
      docs = docs.filter(doc => doc.type === type);
    }
    
    return docs.sort((a, b) => 
      (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0)
    );
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getDocumentsByUser(userId: number): Promise<Document[]> {
    return this.getAllDocuments(userId);
  }

  async getDocumentsByType(type: string): Promise<Document[]> {
    return this.getAllDocuments(undefined, type);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const now = new Date();
    const document: Document = {
      ...insertDocument,
      id,
      lastModified: now,
      createdAt: now,
      size: insertDocument.size ?? null,
      content: insertDocument.content ?? null,
      ownerId: insertDocument.ownerId ?? null,
      isEncrypted: insertDocument.isEncrypted ?? null,
      syncStatus: insertDocument.syncStatus ?? null
    };
    this.documents.set(id, document);
    return document;
  }

  async updateDocument(id: number, updates: Partial<InsertDocument>): Promise<Document | undefined> {
    const existing = this.documents.get(id);
    if (!existing) return undefined;

    const updated: Document = { 
      ...existing, 
      ...updates, 
      lastModified: new Date() 
    };
    this.documents.set(id, updated);
    return updated;
  }

  // Terminal command methods
  async getTerminalCommands(userId?: number, limit: number = 50): Promise<TerminalCommand[]> {
    let commands = Array.from(this.terminalCommands.values());
    
    if (userId) {
      commands = commands.filter(cmd => cmd.userId === userId);
    }
    
    return commands
      .sort((a, b) => (b.executedAt?.getTime() || 0) - (a.executedAt?.getTime() || 0))
      .slice(0, limit);
  }

  async createTerminalCommand(insertCommand: InsertTerminalCommand): Promise<TerminalCommand> {
    const id = this.currentTerminalCommandId++;
    const command: TerminalCommand = {
      ...insertCommand,
      id,
      executedAt: new Date(),
      output: insertCommand.output ?? null,
      userId: insertCommand.userId ?? null
    };
    this.terminalCommands.set(id, command);
    return command;
  }

  // System metrics methods
  async getSystemMetrics(limit: number = 50): Promise<SystemMetrics[]> {
    return Array.from(this.systemMetrics.values())
      .sort((a, b) => (b.recordedAt?.getTime() || 0) - (a.recordedAt?.getTime() || 0))
      .slice(0, limit);
  }

  async getLatestSystemMetrics(): Promise<SystemMetrics | undefined> {
    const metrics = await this.getSystemMetrics(1);
    return metrics[0];
  }

  async createSystemMetrics(insertMetrics: InsertSystemMetrics): Promise<SystemMetrics> {
    const id = this.currentSystemMetricsId++;
    const metrics: SystemMetrics = {
      ...insertMetrics,
      id,
      recordedAt: new Date(),
      cpuUsage: insertMetrics.cpuUsage ?? null,
      memoryUsage: insertMetrics.memoryUsage ?? null,
      diskUsage: insertMetrics.diskUsage ?? null,
      networkActivity: insertMetrics.networkActivity ?? null,
      securityStatus: insertMetrics.securityStatus ?? null,
      witnessProtocolActive: insertMetrics.witnessProtocolActive ?? null
    };
    this.systemMetrics.set(id, metrics);
    return metrics;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Application methods
  async getAllApplications(): Promise<Application[]> {
    return await db.select().from(applications).orderBy(desc(applications.downloads));
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const [app] = await db.select().from(applications).where(eq(applications.id, id));
    return app || undefined;
  }

  async getApplicationsByCategory(category: string): Promise<Application[]> {
    return await db.select().from(applications)
      .where(eq(applications.category, category))
      .orderBy(desc(applications.downloads));
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [app] = await db
      .insert(applications)
      .values(insertApplication)
      .returning();
    return app;
  }

  async updateApplication(id: number, updates: Partial<InsertApplication>): Promise<Application | undefined> {
    const [app] = await db
      .update(applications)
      .set(updates)
      .where(eq(applications.id, id))
      .returning();
    return app || undefined;
  }

  // Document methods
  async getAllDocuments(userId?: number, type?: string): Promise<Document[]> {
    if (userId && type) {
      return await db.select().from(documents)
        .where(and(eq(documents.ownerId, userId), eq(documents.type, type)))
        .orderBy(desc(documents.lastModified));
    } else if (userId) {
      return await db.select().from(documents)
        .where(eq(documents.ownerId, userId))
        .orderBy(desc(documents.lastModified));
    } else if (type) {
      return await db.select().from(documents)
        .where(eq(documents.type, type))
        .orderBy(desc(documents.lastModified));
    }
    
    return await db.select().from(documents).orderBy(desc(documents.lastModified));
  }

  async getDocument(id: number): Promise<Document | undefined> {
    const [doc] = await db.select().from(documents).where(eq(documents.id, id));
    return doc || undefined;
  }

  async getDocumentsByUser(userId: number): Promise<Document[]> {
    return this.getAllDocuments(userId);
  }

  async getDocumentsByType(type: string): Promise<Document[]> {
    return this.getAllDocuments(undefined, type);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [doc] = await db
      .insert(documents)
      .values(insertDocument)
      .returning();
    return doc;
  }

  async updateDocument(id: number, updates: Partial<InsertDocument>): Promise<Document | undefined> {
    const [doc] = await db
      .update(documents)
      .set(updates)
      .where(eq(documents.id, id))
      .returning();
    return doc || undefined;
  }

  // Terminal command methods
  async getTerminalCommands(userId?: number, limit: number = 50): Promise<TerminalCommand[]> {
    if (userId) {
      return await db.select().from(terminalCommands)
        .where(eq(terminalCommands.userId, userId))
        .orderBy(desc(terminalCommands.executedAt))
        .limit(limit);
    }
    
    return await db.select().from(terminalCommands)
      .orderBy(desc(terminalCommands.executedAt))
      .limit(limit);
  }

  async createTerminalCommand(insertCommand: InsertTerminalCommand): Promise<TerminalCommand> {
    const [cmd] = await db
      .insert(terminalCommands)
      .values(insertCommand)
      .returning();
    return cmd;
  }

  // System metrics methods
  async getSystemMetrics(limit: number = 50): Promise<SystemMetrics[]> {
    return await db
      .select()
      .from(systemMetrics)
      .orderBy(desc(systemMetrics.recordedAt))
      .limit(limit);
  }

  async getLatestSystemMetrics(): Promise<SystemMetrics | undefined> {
    const metrics = await this.getSystemMetrics(1);
    return metrics[0];
  }

  async createSystemMetrics(insertMetrics: InsertSystemMetrics): Promise<SystemMetrics> {
    const [metrics] = await db
      .insert(systemMetrics)
      .values(insertMetrics)
      .returning();
    return metrics;
  }
}

export const storage = new DatabaseStorage();
