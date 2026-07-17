import pool from "../config/db.js";
import logger from "../utils/logger.js";

const createTable = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id UUID PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            task TEXT NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        `);

        // Add priority column if it doesn't exist yet (safe to run on existing DBs)
        await pool.query(`
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name='tasks' AND column_name='priority'
            ) THEN
                ALTER TABLE tasks
                ADD COLUMN priority TEXT NOT NULL DEFAULT 'Medium'
                CHECK (priority IN ('High', 'Medium', 'Low'));
            END IF;
        END$$;
        `);

        logger.info("tables ready");
    } catch (error) {
        logger.error(`something went wrong creating tables: ${error}`);
    }
};

export default createTable;
