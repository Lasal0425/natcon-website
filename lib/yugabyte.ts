// lib/yugabyte.ts
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

// Database connection pool
const pool = new Pool({
  host: process.env.YUGABYTE_HOST!,
  port: parseInt(process.env.YUGABYTE_PORT!) || 5433,
  database: process.env.YUGABYTE_DATABASE!,
  user: process.env.YUGABYTE_USER!,
  password: process.env.YUGABYTE_PASSWORD!,
  ssl: {
    rejectUnauthorized: false, // YugabyteDB Aeon typically requires SSL
  },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Type definitions for your database schema
interface Database {
  orders: {
    id: string | undefined; // Make id optional for insert operations
    order_id: string;
    customer_name: string;
    customer_email: string;
    contact_number: string;
    home_address: string;
    entity: string;
    attending_event: boolean;
    total_items: number;
    total_amount: number;
    order_date: string;
    order_items_summary: string;
    has_merch_pack: boolean;
    email_sent: boolean;
    created_at: Date;
    updated_at: Date;
  };
  order_items: {
    id: string | undefined; // Make id optional for insert operations
    order_id: string;
    item_id: string;
    item_name: string;
    item_size: string | null;
    item_color: string | null;
    price: number;
    quantity: number;
    total_price: number;
    is_merch_pack: boolean;
    tshirt_size: string | null;
    wristband_color: string | null;
    merch_pack_id: string | null;
    created_at: Date;
  };
  merch_packs: {
    id: number | undefined; // SERIAL PRIMARY KEY, auto-increments
    customer: string;
    customer_entity: string;
    order_date: string;
    tshirt_size: string | null;
    wristband_color: string | null;
    created_at: Date | undefined; // Has default value
  };
}

// Kysely instance for type-safe queries
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
});

// Raw pool for direct queries if needed
export const yugabytePool = pool;
