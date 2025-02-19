import { uuid } from "drizzle-orm/pg-core";

const generateId = uuid("id").primaryKey().defaultRandom().notNull();

export { generateId };
