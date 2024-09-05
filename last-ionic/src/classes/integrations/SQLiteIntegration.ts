import SQLiteManager, { ISQLiteManager } from "../managers/SQLiteManager";

/**
 * The path to the SQLite database file.
 * - Purpose: This is specifically configured for use in a Node.js application using SQLite.
 * This is configured using an environment variable, with a fallback to a default database path.
 */
const DB_PATH = process.env.DB_PATH || './default-database.db';

/**
 * Creates and exports an instance of SQLiteManager configured with the specified database path.
 * 
 * @returns An instance of SQLiteManager configured with the database path.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 1, 2024
 */

const AppDatabase: ISQLiteManager = SQLiteManager.getInstance(DB_PATH);

export default AppDatabase;
