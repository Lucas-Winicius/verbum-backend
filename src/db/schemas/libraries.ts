import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const libraries = pgTable('libraries', {
  id: serial('id').primaryKey().notNull(),

  publicId: varchar('public_id').notNull().unique(),

  private: boolean('private').notNull(),

  name: varchar('name').notNull(),

  about: text('about').notNull(),

  location: varchar('location').notNull(),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .defaultNow(),
})
