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
import createId from '../../libs/idGen'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { normalize } from '../../libs/generic'

export const libraries = pgTable('libraries', {
  id: char('id', { length: 12 }).primaryKey().notNull(),

  publicId: varchar('public_id').notNull().unique(),

  private: boolean('private').notNull(),

  name: varchar('name').notNull(),

  about: text('about').notNull(),

  owner: char('owner').references(() => users.id, { onDelete: 'set null' }),

  location: varchar('location'),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .defaultNow(),
})

export const librariesRelations = relations(libraries, ({ many }) => ({
  books: many(books),
  moderators: many(users),
}))

export const insertLibrarySchema = createInsertSchema(libraries, {
  id: z.string().transform(createId),

  publicId: z.string().transform(normalize),

  private: z.boolean().default(false),

  name: z.string().max(255),

  about: z.string(),

  owner: z.string().length(12),
  
  location: z.string().max(255),
})
