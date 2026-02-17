import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260217113300 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "sales_store" add column if not exists "assigned_sales_person_id" text null;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "sales_store" drop column if exists "assigned_sales_person_id";`
    )
  }
}
