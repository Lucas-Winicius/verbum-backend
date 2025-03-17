import {
  boolean,
  char,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { users } from './users'
import { relations } from 'drizzle-orm'
import { books } from './books'

export const libraries = pgTable('libraries', {
  id: char('id', { length: 12 }).primaryKey().notNull(),

  publicId: varchar('public_id').notNull().unique(),

  private: boolean('private').notNull(),

  name: varchar('name').notNull(),

  about: text('about').notNull(),

  owner: char('owner').references(() => users.id, { onDelete: 'set null' }),

  location: varchar('location').notNull(),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .defaultNow(),
})

export const librariesRelations = relations(libraries, ({ many }) => ({
  books: many(books),
  moderators: many(users),
}))
