import { char, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import createId from '../../libs/idGen'
import { capitalize } from '../../libs/generic'
import hash from '../../libs/hash'

export const users = pgTable('users', {
  id: char('id', { length: 12 }).primaryKey().notNull(),

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

export const insertUserSchema = createInsertSchema(users, {
  id: z.string().transform(() => createId()),

  name: z
    .string()
    .trim()
    .transform((name) => capitalize(name)),

  username: z.string().trim().toLowerCase().nonempty(),

  email: z.string().trim().toLowerCase().email(),

  about: z.string().trim(),

  password: z
    .string()
    .nonempty()
    .trim()
    .transform(async (pass) => {
      const myhash = await hash(pass)
      return myhash.hash
    }),
})
