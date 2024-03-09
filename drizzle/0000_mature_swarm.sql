CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"strava_id" serial NOT NULL,
	"firstname" varchar(64),
	"lastname" varchar(64),
	"avatar" varchar(256),
	"refresh_token" varchar(256),
	"access_token" varchar(256),
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
