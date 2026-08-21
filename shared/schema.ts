import { pgTable, text, serial, integer, boolean, timestamp, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";
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
}, (table) => ({
  ownerModifiedIdx: index("documents_owner_modified_idx").on(table.ownerId, table.lastModified),
  typeIdx: index("documents_type_idx").on(table.type),
}));

export const terminalCommands = pgTable("terminal_commands", {
  id: serial("id").primaryKey(),
  command: text("command").notNull(),
  output: text("output"),
  userId: integer("user_id").references(() => users.id),
  executedAt: timestamp("executed_at").defaultNow(),
}, (table) => ({
  userExecutedIdx: index("terminal_commands_user_executed_idx").on(table.userId, table.executedAt),
}));

export const systemMetrics = pgTable("system_metrics", {
  id: serial("id").primaryKey(),
  cpuUsage: integer("cpu_usage"),
  memoryUsage: integer("memory_usage"), // in GB
  diskUsage: integer("disk_usage"),
  networkActivity: integer("network_activity"),
  securityStatus: text("security_status").default('secure'),
  witnessProtocolActive: boolean("witness_protocol_active").default(true),
  recordedAt: timestamp("recorded_at").defaultNow(),
}, (table) => ({
  recordedAtIdx: index("system_metrics_recorded_at_idx").on(table.recordedAt),
}));

export const omegameshNodes = pgTable("omegamesh_nodes", {
  nodeId: text("node_id").primaryKey(),
  publicKey: text("public_key").notNull(),
  endpoint: text("endpoint"),
  lastSeenAt: timestamp("last_seen_at").defaultNow().notNull(),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
});

export const omegameshEvents = pgTable("omegamesh_events", {
  eventId: text("event_id").primaryKey(),
  nodeId: text("node_id").notNull().references(() => omegameshNodes.nodeId),
  sequence: integer("sequence").notNull(),
  eventType: text("event_type").notNull(),
  payloadHash: text("payload_hash").notNull(),
  createdAt: timestamp("created_at").notNull(),
  signature: text("signature").notNull(),
}, (table) => ({
  nodeSequenceIdx: uniqueIndex("omegamesh_events_node_sequence_idx").on(table.nodeId, table.sequence),
  payloadHashIdx: index("omegamesh_events_payload_hash_idx").on(table.payloadHash),
}));

export const systemAlerts = pgTable("system_alerts", {
  eventId: text("event_id").primaryKey(),
  severity: text("severity").notNull(),
  source: text("source").notNull(),
  message: text("message").notNull(),
  audioCacheKey: text("audio_cache_key"),
  deliveryStatus: text("delivery_status").default("pending").notNull(),
  acknowledgedAt: timestamp("acknowledged_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  createdAtIdx: index("system_alerts_created_at_idx").on(table.createdAt),
  sourceIdx: index("system_alerts_source_idx").on(table.source),
}));

// VERUM Music System Tables
export const musicTracks = pgTable("music_tracks", {
  id: serial("id").primaryKey(),
  trackId: text("track_id").notNull().unique(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  album: text("album").notNull(),
  genre: text("genre").notNull(),
  year: integer("year").notNull(),
  duration: integer("duration").notNull(), // in seconds
  bpm: integer("bpm"),
  key: text("key"),
  energy: integer("energy"), // 0-100
  valence: integer("valence"), // 0-100
  danceability: integer("danceability"), // 0-100
  loudness: integer("loudness"), // in dB
  filename: text("filename"),
  audioUrl: text("audio_url"),
  uploadedBy: integer("uploaded_by").references(() => users.id),
  isActive: boolean("is_active").default(true),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const musicAnalysis = pgTable("music_analysis", {
  id: serial("id").primaryKey(),
  trackId: integer("track_id").references(() => musicTracks.id),
  analysisEngine: text("analysis_engine").notNull(), // 'librosa', 'verum-ai', 'synthetic'
  tempo: integer("tempo"),
  estimatedKey: text("estimated_key"),
  spectralCentroid: integer("spectral_centroid"),
  spectralRolloff: integer("spectral_rolloff"),
  spectralBandwidth: integer("spectral_bandwidth"),
  zeroCrossingRate: integer("zero_crossing_rate"),
  mfccCoefficients: jsonb("mfcc_coefficients"),
  harmonicPercussiveRatio: integer("harmonic_percussive_ratio"),
  spectrogramData: text("spectrogram_data"), // base64 encoded image
  analysisNotes: text("analysis_notes"),
  processingTime: integer("processing_time"), // in milliseconds
  analyzedAt: timestamp("analyzed_at").defaultNow(),
});

export const musicPlaylists = pgTable("music_playlists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: integer("owner_id").references(() => users.id),
  isPublic: boolean("is_public").default(false),
  trackCount: integer("track_count").default(0),
  totalDuration: integer("total_duration").default(0), // in seconds
  coverImageUrl: text("cover_image_url"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const playlistTracks = pgTable("playlist_tracks", {
  id: serial("id").primaryKey(),
  playlistId: integer("playlist_id").references(() => musicPlaylists.id),
  trackId: integer("track_id").references(() => musicTracks.id),
  position: integer("position").notNull(),
  addedBy: integer("added_by").references(() => users.id),
  addedAt: timestamp("added_at").defaultNow(),
});

export const musicListeningHistory = pgTable("music_listening_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  trackId: integer("track_id").references(() => musicTracks.id),
  playDuration: integer("play_duration"), // in seconds
  completedPercentage: integer("completed_percentage"), // 0-100
  deviceInfo: text("device_info"),
  likedTrack: boolean("liked_track").default(false),
  playedAt: timestamp("played_at").defaultNow(),
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

// Music system insert schemas
export const insertMusicTrackSchema = createInsertSchema(musicTracks).omit({
  id: true,
  createdAt: true,
});

export const insertMusicAnalysisSchema = createInsertSchema(musicAnalysis).omit({
  id: true,
  analyzedAt: true,
});

export const insertMusicPlaylistSchema = createInsertSchema(musicPlaylists).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPlaylistTrackSchema = createInsertSchema(playlistTracks).omit({
  id: true,
  addedAt: true,
});

export const insertMusicListeningHistorySchema = createInsertSchema(musicListeningHistory).omit({
  id: true,
  playedAt: true,
});

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

// Music system types
export type MusicTrack = typeof musicTracks.$inferSelect;
export type InsertMusicTrack = z.infer<typeof insertMusicTrackSchema>;
export type MusicAnalysis = typeof musicAnalysis.$inferSelect;
export type InsertMusicAnalysis = z.infer<typeof insertMusicAnalysisSchema>;
export type MusicPlaylist = typeof musicPlaylists.$inferSelect;
export type InsertMusicPlaylist = z.infer<typeof insertMusicPlaylistSchema>;
export type PlaylistTrack = typeof playlistTracks.$inferSelect;
export type InsertPlaylistTrack = z.infer<typeof insertPlaylistTrackSchema>;
export type MusicListeningHistory = typeof musicListeningHistory.$inferSelect;
export type InsertMusicListeningHistory = z.infer<typeof insertMusicListeningHistorySchema>;
