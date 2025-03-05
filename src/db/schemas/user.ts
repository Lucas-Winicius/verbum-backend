import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),

  name: varchar('username').notNull(),

  username: varchar('usernames').unique(),

  email: varchar('email').unique(),

  about: text('about'),

  password: varchar('password').notNull(),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .defaultNow(),
})
