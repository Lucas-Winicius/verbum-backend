import { char, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { libraries } from './libraries'
import { createInsertSchema } from 'drizzle-zod'
import createId from '../../libs/idGen'
import { z } from 'zod'

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

export const insertStatisticsSchema = createInsertSchema(statistics, {
  id: z.string().transform(() => createId()),

  libraryId: z.string().length(12),

  monthYear: z
    .string()
    .length(7)
    .trim()
    .regex(/^(0[1-9]|1[0-2])-\d{4}$/),

  booksAdded: z.number(),

  totalBooks: z.number(),

  averageBorrowTime: z.number(),

  totalBorrows: z.number()
})
