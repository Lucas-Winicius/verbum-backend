import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const statistics = pgTable('statistics', {
  id: serial('id').primaryKey().notNull(),

  monthYear: varchar('month_year', { length: 7 }),

  booksAdded: integer('books_added'),

  totalBooks: integer('total_books'),

  averageBorrowTime: integer('average_borrow_time'),

  totalBorrows: integer('total_borrows'),

  totalReturns: integer('total_returns'),

  createdAt: timestamp('created_at').defaultNow(),
})
