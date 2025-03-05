import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const status = pgEnum('staus', [
  'scheduled', // Agendado
  'cancelled', // Cancelado
  'postponed', // Adiado
  'completed', // Completedado
])

export const events = pgTable('events', {
  id: serial('id').primaryKey().notNull(),

  title: varchar('title').notNull(),

  description: text('description').notNull(),

  eventDate: timestamp('event_date').notNull(),

  endsAt: timestamp('ends_at').notNull(),

  status: status('status').default('scheduled'),

  link: varchar('link'),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .defaultNow(),
})
