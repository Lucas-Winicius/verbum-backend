import {
  char,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { libraries } from './libraries'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import createId from '../../libs/idGen'
import { title } from '../../libs/generic'

export const status = pgEnum('staus', [
  'scheduled', // Agendado
  'cancelled', // Cancelado
  'postponed', // Adiado
  'completed', // Completedado
])

export const events = pgTable('events', {
  id: char('id', { length: 12 }).primaryKey().notNull(),

  libraryeId: char('librarye_id', { length: 12 }).references(
    () => libraries.id,
    { onDelete: 'cascade' }
  ),

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

export const insertEventsSchema = createInsertSchema(events, {
  id: z.string().transform(createId),

  libraryeId: z.string().length(12),

  title: z.string().max(255).transform(title),

  description: z.string(),

  eventDate: z.date(),

  status: z.enum(status.enumValues).default('scheduled'),

  link: z.string().url().optional().or(z.literal('')),
})
