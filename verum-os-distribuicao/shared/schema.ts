import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  version: text("version").notNull(),
  category: text("category").notNull(),
  developer: text("developer").notNull(),
  iconUrl: text("icon_url"),
  downloadUrl: text("download_url"),
  size: integer("size"), // in bytes
  rating: integer("rating"), // 1-5 stars
  downloads: integer("downloads").default(0),
  isVerified: boolean("is_verified").default(false),
  securityValidated: boolean("security_validated").default(false),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'writer', 'calc', 'present'
  content: jsonb("content"),
  size: integer("size"),
  ownerId: integer("owner_id").references(() => users.id),
  isEncrypted: boolean("is_encrypted").default(true),
  syncStatus: text("sync_status").default('synced'), // 'synced', 'syncing', 'offline'
  lastModified: timestamp("last_modified").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const terminalCommands = pgTable("terminal_commands", {
  id: serial("id").primaryKey(),
  command: text("command").notNull(),
  output: text("output"),
  userId: integer("user_id").references(() => users.id),
  executedAt: timestamp("executed_at").defaultNow(),
});

export const systemMetrics = pgTable("system_metrics", {
  id: serial("id").primaryKey(),
  cpuUsage: integer("cpu_usage"),
  memoryUsage: integer("memory_usage"), // in GB
  diskUsage: integer("disk_usage"),
  networkActivity: integer("network_activity"),
  securityStatus: text("security_status").default('secure'),
  witnessProtocolActive: boolean("witness_protocol_active").default(true),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  lastModified: true,
});

export const insertTerminalCommandSchema = createInsertSchema(terminalCommands).omit({
  id: true,
  executedAt: true,
});

export const insertSystemMetricsSchema = createInsertSchema(systemMetrics).omit({
  id: true,
  recordedAt: true,
});

// Types
// Relations
export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
  terminalCommands: many(terminalCommands),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  owner: one(users, {
    fields: [documents.ownerId],
    references: [users.id],
  }),
}));

export const terminalCommandsRelations = relations(terminalCommands, ({ one }) => ({
  user: one(users, {
    fields: [terminalCommands.userId],
    references: [users.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type TerminalCommand = typeof terminalCommands.$inferSelect;
export type InsertTerminalCommand = z.infer<typeof insertTerminalCommandSchema>;
export type SystemMetrics = typeof systemMetrics.$inferSelect;
export type InsertSystemMetrics = z.infer<typeof insertSystemMetricsSchema>;
