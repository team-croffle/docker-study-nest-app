import { pgTable, text, timestamp, varchar, uuid } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

export const notes = pgTable('notes', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
