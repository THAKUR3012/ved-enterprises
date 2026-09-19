import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionUri =
  process.env.DATABASE_URL || "mysql://root:password@localhost:3306/ved_enterprises";

let connectionPool: mysql.Pool | null = null;

export function getDbPool() {
  if (!connectionPool) {
    connectionPool = mysql.createPool({
      uri: connectionUri,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return connectionPool;
}

export const db = drizzle(getDbPool(), { schema, mode: "default" });
