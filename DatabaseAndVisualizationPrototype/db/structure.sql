CREATE TABLE IF NOT EXISTS "schema_migrations" ("version" varchar NOT NULL PRIMARY KEY);
CREATE TABLE IF NOT EXISTS "ar_internal_metadata" ("key" varchar NOT NULL PRIMARY KEY, "value" varchar, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
CREATE TABLE IF NOT EXISTS "datasets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "source" varchar, "source_agency" varchar, "dataset_type_id" integer, "information_source_id" integer, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
CREATE TABLE sqlite_sequence(name,seq);
CREATE INDEX "index_datasets_on_dataset_type_id" ON "datasets" ("dataset_type_id");
CREATE INDEX "index_datasets_on_information_source_id" ON "datasets" ("information_source_id");
CREATE TABLE IF NOT EXISTS "dataset_types" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
CREATE TABLE IF NOT EXISTS "information_sources" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
INSERT INTO "schema_migrations" (version) VALUES
('20231127152312'),
('20231127152305'),
('20231127150819');

