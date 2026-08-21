CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"version" text NOT NULL,
	"category" text NOT NULL,
	"developer" text NOT NULL,
	"icon_url" text,
	"download_url" text,
	"size" integer,
	"rating" integer,
	"downloads" integer DEFAULT 0,
	"is_verified" boolean DEFAULT false,
	"security_validated" boolean DEFAULT false,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"content" jsonb,
	"size" integer,
	"owner_id" integer,
	"is_encrypted" boolean DEFAULT true,
	"sync_status" text DEFAULT 'synced',
	"last_modified" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "music_analysis" (
	"id" serial PRIMARY KEY NOT NULL,
	"track_id" integer,
	"analysis_engine" text NOT NULL,
	"tempo" integer,
	"estimated_key" text,
	"spectral_centroid" integer,
	"spectral_rolloff" integer,
	"spectral_bandwidth" integer,
	"zero_crossing_rate" integer,
	"mfcc_coefficients" jsonb,
	"harmonic_percussive_ratio" integer,
	"spectrogram_data" text,
	"analysis_notes" text,
	"processing_time" integer,
	"analyzed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "music_listening_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"track_id" integer,
	"play_duration" integer,
	"completed_percentage" integer,
	"device_info" text,
	"liked_track" boolean DEFAULT false,
	"played_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "music_playlists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"owner_id" integer,
	"is_public" boolean DEFAULT false,
	"track_count" integer DEFAULT 0,
	"total_duration" integer DEFAULT 0,
	"cover_image_url" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "music_tracks" (
	"id" serial PRIMARY KEY NOT NULL,
	"track_id" text NOT NULL,
	"title" text NOT NULL,
	"artist" text NOT NULL,
	"album" text NOT NULL,
	"genre" text NOT NULL,
	"year" integer NOT NULL,
	"duration" integer NOT NULL,
	"bpm" integer,
	"key" text,
	"energy" integer,
	"valence" integer,
	"danceability" integer,
	"loudness" integer,
	"filename" text,
	"audio_url" text,
	"uploaded_by" integer,
	"is_active" boolean DEFAULT true,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "music_tracks_track_id_unique" UNIQUE("track_id")
);
--> statement-breakpoint
CREATE TABLE "omegamesh_events" (
	"event_id" text PRIMARY KEY NOT NULL,
	"node_id" text NOT NULL,
	"sequence" integer NOT NULL,
	"event_type" text NOT NULL,
	"payload_hash" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"signature" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "omegamesh_nodes" (
	"node_id" text PRIMARY KEY NOT NULL,
	"public_key" text NOT NULL,
	"endpoint" text,
	"last_seen_at" timestamp DEFAULT now() NOT NULL,
	"registered_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "playlist_tracks" (
	"id" serial PRIMARY KEY NOT NULL,
	"playlist_id" integer,
	"track_id" integer,
	"position" integer NOT NULL,
	"added_by" integer,
	"added_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "system_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"cpu_usage" integer,
	"memory_usage" integer,
	"disk_usage" integer,
	"network_activity" integer,
	"security_status" text DEFAULT 'secure',
	"witness_protocol_active" boolean DEFAULT true,
	"recorded_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "terminal_commands" (
	"id" serial PRIMARY KEY NOT NULL,
	"command" text NOT NULL,
	"output" text,
	"user_id" integer,
	"executed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "music_analysis" ADD CONSTRAINT "music_analysis_track_id_music_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."music_tracks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "music_listening_history" ADD CONSTRAINT "music_listening_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "music_listening_history" ADD CONSTRAINT "music_listening_history_track_id_music_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."music_tracks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "music_playlists" ADD CONSTRAINT "music_playlists_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "music_tracks" ADD CONSTRAINT "music_tracks_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "omegamesh_events" ADD CONSTRAINT "omegamesh_events_node_id_omegamesh_nodes_node_id_fk" FOREIGN KEY ("node_id") REFERENCES "public"."omegamesh_nodes"("node_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_tracks" ADD CONSTRAINT "playlist_tracks_playlist_id_music_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."music_playlists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_tracks" ADD CONSTRAINT "playlist_tracks_track_id_music_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."music_tracks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_tracks" ADD CONSTRAINT "playlist_tracks_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "terminal_commands" ADD CONSTRAINT "terminal_commands_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "documents_owner_modified_idx" ON "documents" USING btree ("owner_id","last_modified");--> statement-breakpoint
CREATE INDEX "documents_type_idx" ON "documents" USING btree ("type");--> statement-breakpoint
CREATE UNIQUE INDEX "omegamesh_events_node_sequence_idx" ON "omegamesh_events" USING btree ("node_id","sequence");--> statement-breakpoint
CREATE INDEX "omegamesh_events_payload_hash_idx" ON "omegamesh_events" USING btree ("payload_hash");--> statement-breakpoint
CREATE INDEX "system_metrics_recorded_at_idx" ON "system_metrics" USING btree ("recorded_at");--> statement-breakpoint
CREATE INDEX "terminal_commands_user_executed_idx" ON "terminal_commands" USING btree ("user_id","executed_at");