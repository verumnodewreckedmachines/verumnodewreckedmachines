CREATE TABLE "system_alerts" (
	"event_id" text PRIMARY KEY NOT NULL,
	"severity" text NOT NULL,
	"source" text NOT NULL,
	"message" text NOT NULL,
	"audio_cache_key" text,
	"delivery_status" text DEFAULT 'pending' NOT NULL,
	"acknowledged_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "system_alerts_created_at_idx" ON "system_alerts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "system_alerts_source_idx" ON "system_alerts" USING btree ("source");