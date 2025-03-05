import { boolean, date, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const borrowings = pgTable('borrowings', {
  id: serial('id').primaryKey().notNull(),

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
