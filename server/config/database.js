import pg from 'pg';
import './dotenv.js';

// Enable SSL when DB_SSL=true, in production, or when connecting to a hosted provider (e.g. render.com)
const useSSL = (process.env.DB_SSL === 'true') || (process.env.NODE_ENV === 'production') || (process.env.PGHOST && process.env.PGHOST.includes('render.com'));

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: useSSL ? { rejectUnauthorized: false } : false
}

export const pool = new pg.Pool(config);