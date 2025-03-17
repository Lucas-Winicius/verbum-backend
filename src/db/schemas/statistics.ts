import { char, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { libraries } from './libraries'

export const statistics = pgTable('statistics', {
  id: char('id', { length: 12 }).primaryKey().notNull(),

  libraryId: char('library_id', { length: 12 }).references(() => libraries.id, {
    onDelete: 'cascade',
  }),

  monthYear: varchar('month_year', { length: 7 }),

  booksAdded: integer('books_added'),

  totalBooks: integer('total_books'),

  averageBorrowTime: integer('average_borrow_time'),

  totalBorrows: integer('total_borrows'),

  totalReturns: integer('total_returns'),

  createdAt: timestamp('created_at').defaultNow(),
})
