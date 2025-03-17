import {
  boolean,
  char,
  date,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { books } from './books'
import { libraries } from './libraries'

export const borrowings = pgTable('borrowings', {
  id: char('id', { length: 12 }).primaryKey().notNull(),

  bookId: char('book_id', { length: 12 }).references(() => books.id),

  libraryId: char('library_id', { length: 12 }).references(() => libraries.id, {
    onDelete: 'cascade',
  }),

  collectedAt: date('created_at').notNull(),

  returned: boolean('returned').default(false),

  returnedAt: date('returned_at'),

  notes: text('notes'),

  userName: varchar('user_name'),

  userEmail: varchar('user_email'),

  userTel: varchar('user_tel'),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .defaultNow(),
})
