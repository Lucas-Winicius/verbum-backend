import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const books = pgTable('books', {
  id: serial('id').primaryKey().notNull(),

  barcode: varchar('barcode').notNull().unique(),

  name: varchar('username').notNull(),

  category: varchar('username').notNull(),

  author: varchar('username').notNull(),

  amount: integer('amount').notNull(),

  synopsis: text('synopsis').notNull(),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .defaultNow(),
})
