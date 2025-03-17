CREATE TYPE "public"."staus" AS ENUM('scheduled', 'cancelled', 'postponed', 'completed');--> statement-breakpoint
CREATE TABLE "books" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"barcode" varchar NOT NULL,
	"username" varchar NOT NULL,
	"amount" integer NOT NULL,
	"synopsis" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "books_barcode_unique" UNIQUE("barcode")
);
--> statement-breakpoint
CREATE TABLE "borrowings" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"book_id" char(12),
	"library_id" char(12),
	"created_at" timestamp DEFAULT now(),
	"returned" boolean DEFAULT false,
	"returned_at" date,
	"notes" text,
	"user_name" varchar,
	"user_email" varchar,
	"user_tel" varchar,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"user_id" char(12),
	"book_id" char(12),
	"content" text,
	"rating" integer DEFAULT 5,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"librarye_id" char(12),
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"event_date" timestamp NOT NULL,
	"ends_at" timestamp NOT NULL,
	"status" "staus" DEFAULT 'scheduled',
	"link" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "libraries" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"public_id" varchar NOT NULL,
	"private" boolean NOT NULL,
	"name" varchar NOT NULL,
	"about" text NOT NULL,
	"owner" char,
	"location" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "libraries_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"content" text NOT NULL,
	"hide_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"library_id" char(12),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"library_id" char(12),
	"month_year" varchar(7),
	"books_added" integer,
	"total_books" integer,
	"average_borrow_time" integer,
	"total_borrows" integer,
	"total_returns" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"usernames" varchar,
	"email" varchar,
	"about" text,
	"password" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_usernames_unique" UNIQUE("usernames"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "borrowings" ADD CONSTRAINT "borrowings_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrowings" ADD CONSTRAINT "borrowings_library_id_libraries_id_fk" FOREIGN KEY ("library_id") REFERENCES "public"."libraries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_librarye_id_libraries_id_fk" FOREIGN KEY ("librarye_id") REFERENCES "public"."libraries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "libraries" ADD CONSTRAINT "libraries_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_library_id_libraries_id_fk" FOREIGN KEY ("library_id") REFERENCES "public"."libraries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_library_id_libraries_id_fk" FOREIGN KEY ("library_id") REFERENCES "public"."libraries"("id") ON DELETE cascade ON UPDATE no action;