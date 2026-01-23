import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260123034422 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "sales_person" ("id" text not null, "name" text not null, "email" text null, "phone" text null, "rep_code" text not null, "active" boolean not null default true, "notes" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "sales_person_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sales_person_deleted_at" ON "sales_person" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "sales_person_assignment" ("id" text not null, "sales_person_id" text not null, "sales_store_id" text not null, "assigned_at" timestamptz not null, "notes" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "sales_person_assignment_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sales_person_assignment_deleted_at" ON "sales_person_assignment" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "sales_person" cascade;`);

    this.addSql(`drop table if exists "sales_person_assignment" cascade;`);
  }

}
