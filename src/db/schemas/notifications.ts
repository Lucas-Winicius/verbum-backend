import { char, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { libraries } from './libraries'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { createId } from '@paralleldrive/cuid2'
import { title } from '../../libs/generic'

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

export const insertNotificationsSchema = createInsertSchema(notifications, {
  id: z.string().transform(() => createId()),

  title: z
    .string()
    .trim()
    .min(5)
    .transform((notTitle) => title(notTitle)),

  content: z.string().trim().min(10),

  hideAt: z.date(),

  libraryId: z.string().length(12),
})
