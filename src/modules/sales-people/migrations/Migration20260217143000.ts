import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260217143000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      do $$
      begin
        if exists (
          select 1
          from "sales_person"
          where "deleted_at" is null
          group by lower("rep_code")
          having count(*) > 1
        ) then
          raise exception 'Duplicate active rep_code values found in sales_person. Resolve duplicates before running this migration.';
        end if;
      end
      $$;
    `)

    this.addSql(`
      create unique index if not exists "IDX_sales_person_rep_code_unique"
      on "sales_person" (lower("rep_code"))
      where "deleted_at" is null;
    `)
  }

  override async down(): Promise<void> {
    this.addSql(`drop index if exists "IDX_sales_person_rep_code_unique";`)
  }
}
