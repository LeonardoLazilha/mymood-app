import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const logs = pgTable('logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  mood: integer('mood').notNull(),
  note: text('note'),
  symptoms: text('symptoms').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const insights = pgTable('insights', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull(),
    content: text('content').notNull(),
    generatedAt: timestamp('generated_at').defaultNow().notNull(),
})