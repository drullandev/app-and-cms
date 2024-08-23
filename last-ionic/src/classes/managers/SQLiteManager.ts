import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

/* 
// Example usage:
(async () => {
    const dbManager = new SQLiteManager('./my-database.db');
    await dbManager.connect();
    await dbManager.createTable('users', 'id INTEGER PRIMARY KEY, name TEXT, email TEXT');
    await dbManager.insert('users', { name: 'John Doe', email: 'john@example.com' });
    const users = await dbManager.query('users');
    await dbManager.close();
})();
 */

class SQLiteManager {

    // The SQLite database instance
    private db: Database | null = null;

    // Path to the SQLite database file
    private dbPath: string;

    /**
     * Constructs a new DatabaseManager instance.
     * @param dbPath - The path to the SQLite database file.
     */
    constructor(dbPath: string) {
        this.dbPath = dbPath;
    }

    /**
     * Opens a connection to the SQLite database.
     * This method initializes the `db` property with a connected Database instance.
     * @returns A promise that resolves when the connection is established.
     */
    async connect(): Promise<void> {
        this.db = await open({
            filename: this.dbPath,
            driver: sqlite3.Database
        });
        console.log('Connected to the database.');
    }

    /**
     * Creates a new table in the SQLite database if it does not already exist.
     * @param tableName - The name of the table to create.
     * @param columns - A string defining the columns and their types, e.g., 'id INTEGER PRIMARY KEY, name TEXT'.
     * @returns A promise that resolves when the table creation is complete.
     */
    async createTable(tableName: string, columns: string): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
        await this.db!.run(query);
        console.log(`Table ${tableName} created.`);
    }

    /**
     * Inserts a new row into a specified table.
     * @param tableName - The name of the table to insert into.
     * @param values - An object representing the column-value pairs to insert.
     * @returns A promise that resolves when the insertion is complete.
     */
    async insert(tableName: string, values: Record<string, any>): Promise<void> {
        const columns = Object.keys(values).join(', ');
        const placeholders = Object.keys(values).map(() => '?').join(', ');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders});`;
        await this.db!.run(query, Object.values(values));
        console.log(`Inserted data into ${tableName}.`);
    }

    /**
     * Queries a table for rows that match the specified conditions.
     * @param tableName - The name of the table to query.
     * @param conditions - Optional SQL conditions to apply to the query (e.g., 'WHERE age > ?').
     * @param params - Optional parameters to substitute into the conditions.
     * @returns A promise that resolves with an array of rows matching the query.
     */
    async query(tableName: string, conditions: string = '', params: any[] = []): Promise<any[]> {
        const query = `SELECT * FROM ${tableName} ${conditions};`;
        const rows = await this.db!.all(query, params);
        return rows;
    }

    /**
     * Closes the connection to the SQLite database.
     * @returns A promise that resolves when the connection is closed.
     */
    async close(): Promise<void> {
        await this.db!.close();
        console.log('Database connection closed.');
    }
}

export default SQLiteManager;
