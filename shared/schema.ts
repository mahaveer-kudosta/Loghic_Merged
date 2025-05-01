import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Project model for the merger UI
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  repoUrl: text("repo_url").notNull(),
  sourceType: text("source_type").notNull(), // "frontend" or "backend"
  path: text("path"),
});

// Merge configuration model
export const mergeConfigs = pgTable("merge_configs", {
  id: serial("id").primaryKey(),
  projectName: text("project_name").notNull(),
  description: text("description"),
  mainScript: text("main_script").notNull(),
  nodeVersion: text("node_version").notNull(),
  scripts: text("scripts").notNull(), // JSON string
  dependencies: text("dependencies").notNull(), // JSON string
  environmentVariables: text("environment_variables").notNull(), // JSON string
  apiEndpoints: text("api_endpoints").notNull(), // JSON string
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  repoUrl: true,
  sourceType: true,
  path: true,
});

export const insertMergeConfigSchema = createInsertSchema(mergeConfigs).pick({
  projectName: true,
  description: true,
  mainScript: true,
  nodeVersion: true,
  scripts: true,
  dependencies: true,
  environmentVariables: true,
  apiEndpoints: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertMergeConfig = z.infer<typeof insertMergeConfigSchema>;
export type MergeConfig = typeof mergeConfigs.$inferSelect;
