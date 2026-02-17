import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260217144000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      alter table if exists "sales_store"
      alter column "lat" type double precision using "lat"::double precision;
    `)
    this.addSql(`
      alter table if exists "sales_store"
      alter column "lng" type double precision using "lng"::double precision;
    `)
  }

  override async down(): Promise<void> {
    this.addSql(`
      alter table if exists "sales_store"
      alter column "lat" type integer using round("lat")::integer;
    `)
    this.addSql(`
      alter table if exists "sales_store"
      alter column "lng" type integer using round("lng")::integer;
    `)
  }
}
