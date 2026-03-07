// import {
//   pgTable,
//   text,
//   timestamp,
//   uuid,
//   integer,
//   jsonb,
// } from 'drizzle-orm/pg-core';

// // export const moods = pgTable('moods', {
// //   id: uuid('id').defaultRandom().primaryKey(),
// //   userId: text('user_id').notNull(),
// //   mood: text('mood').notNull(), // e.g., 'happy', 'sad', 'anxious'
// //   intensity: integer('intensity').notNull(), // 1-10 scale
// //   notes: text('notes'),
// //   symptoms: jsonb('symptoms'), // array of symptom strings
// //   triggers: jsonb('triggers'), // array of trigger strings
// //   createdAt: timestamp('created_at').defaultNow().notNull(),
// //   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// // });

// // export const users = pgTable('users', {
// //   id: uuid('id').defaultRandom().primaryKey(),
// //   authId: text('auth_id').unique().notNull(),
// //   email: text('email').unique().notNull(),
// //   displayName: text('display_name'),
// //   createdAt: timestamp('created_at').defaultNow().notNull(),
// //   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// // });
