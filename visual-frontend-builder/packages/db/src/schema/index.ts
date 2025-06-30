import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  description: text('description'),
  userId: text('user_id').notNull().references(() => users.id),
  components: text('components', { mode: 'json' }).$type<Record<string, any>[]>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const components = sqliteTable('components', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  code: text('code').notNull(),
  props: text('props', { mode: 'json' }).$type<Record<string, any>>(),
  projectId: text('project_id').notNull().references(() => projects.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});
