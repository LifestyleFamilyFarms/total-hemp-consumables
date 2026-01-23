import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260122212658 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "sales_store" ("id" text not null, "name" text null, "address" text not null, "normalized_address" text not null, "lat" integer null, "lng" integer null, "source" text null, "stage" text null, "stage_updated_at" timestamptz null, "notes" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "sales_store_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sales_store_deleted_at" ON "sales_store" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "sales_store_stage" ("id" text not null, "store_id" text not null, "stage" text not null, "occurred_at" timestamptz not null, "notes" text null, "source" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "sales_store_stage_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sales_store_stage_deleted_at" ON "sales_store_stage" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "sales_store" cascade;`);

    this.addSql(`drop table if exists "sales_store_stage" cascade;`);
  }

}
