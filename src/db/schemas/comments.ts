import { char, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { books } from './books'

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
