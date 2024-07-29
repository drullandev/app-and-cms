import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

class DatabaseManager {

    private db: sqlite3.Database | null = null;
    private dbPath: string;

    constructor(dbPath: string) {
        this.dbPath = dbPath;
    }

    async connect(): Promise<void> {
        this.db = await open({
            filename: this.dbPath,
            driver: sqlite3.Database
        });
        console.log('Connected to the database.');
    }

    async createTable(tableName: string, columns: string): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
        await this.db!.run(query);
        console.log(`Table ${tableName} created.`);
    }

    async insert(tableName: string, values: Record<string, any>): Promise<void> {
        const columns = Object.keys(values).join(', ');
        const placeholders = Object.keys(values).map(() => '?').join(', ');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders});`;
        await this.db!.run(query, Object.values(values));
        console.log(`Inserted data into ${tableName}.`);
    }

    async query(tableName: string, conditions: string = '', params: any[] = []): Promise<any[]> {
        const query = `SELECT * FROM ${tableName} ${conditions};`;
        const rows = await this.db!.all(query, params);
        return rows;
    }

    async close(): Promise<void> {
        await this.db!.close();
        console.log('Database connection closed.');
    }
}

// Ejemplo de uso:
(async () => {
    const dbManager = new DatabaseManager('./my-database.db');
    
    await dbManager.connect();
    await dbManager.createTable('users', 'id INTEGER PRIMARY KEY, name TEXT, email TEXT');
    await dbManager.insert('users', { name: 'John Doe', email: 'john@example.com' });
    const users = await dbManager.query('users');
    console.log(users);
    
    await dbManager.close();
})();
