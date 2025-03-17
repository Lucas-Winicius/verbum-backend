import { char, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { libraries } from './libraries'

export const notifications = pgTable('notifications', {
  id: char('id', { length: 12 }).primaryKey().notNull(),

  title: varchar('title').notNull(),

  content: text('content').notNull(),

  hideAt: timestamp('hide_at').notNull(),

  createdAt: timestamp('created_at').defaultNow(),

  libraryId: char('library_id', { length: 12 }).references(() => libraries.id, {
    onDelete: 'cascade',
  }),

  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .defaultNow(),
})
