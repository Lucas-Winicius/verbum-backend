import { char, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { books } from './books'
import { createInsertSchema } from 'drizzle-zod'
import createId from '../../libs/idGen'
import { z } from 'zod'

export const comments = pgTable('comments', {
  id: char('id', { length: 12 }).primaryKey().notNull(),

  userId: char('user_id', { length: 12 }).references(() => users.id, {
    onDelete: 'set null',
  }),

  bookId: char('book_id', { length: 12 }).references(() => books.id, {
    onDelete: 'cascade',
  }),

  content: text('content'),

  rating: integer('rating').default(5),

  createdAt: timestamp('created_at').defaultNow(),
})

export const insertCommentsSchema = createInsertSchema(comments, {
  id: z.string().transform(createId),

  userId: z.string().length(12),

  bookId: z.string().length(12),

  content: z.string().min(5),

  rating: z.number().min(0).max(5).default(5),
})
