import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import LoggerClass from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * SQLiteManager provides a simple interface for interacting with an SQLite database.
 * It includes methods for connecting to a database, creating tables, inserting data,
 * querying tables, and closing the connection.
 *
 * This class is designed to be easy to use and provides basic database management
 * functionality for Node.js applications using SQLite.
 *
 * @example
 * const dbManager = new SQLiteManager('./my-database.db');
 * await dbManager.connect();
 * await dbManager.createTable('users', 'id INTEGER PRIMARY KEY, name TEXT, email TEXT');
 * await dbManager.insert('users', { name: 'John Doe', email: 'john@example.com' });
 * const users = await dbManager.query('users');
 * await dbManager.close();
 *
 *
 * @author David Rullán - https://github.com/drullandev
 * @date Agoust 31, 2024
 */
class SQLiteManager {
  // The SQLite database instance
  private db: Database | null = null;

  // Path to the SQLite database file
  private dbPath: string;

  // Logger instance
  private logger: LoggerClass;
  private debug: boolean;

  /**
   * Constructs a new SQLiteManager instance.
   *
   * @param dbPath - The path to the SQLite database file.
   */
  constructor(dbPath: string) {
    this.dbPath = dbPath;
    this.debug = DebugUtils.setDebug(false); // Set debug mode based on environment
    this.logger = LoggerClass.getInstance(this.constructor.name, this.debug, 100);

    if (this.debug) {
      this.logger.info("SQLiteManager initialized", { dbPath });
    }
  }

  /**
   * Opens a connection to the SQLite database.
   * This method initializes the `db` property with a connected Database instance.
   *
   * @returns A promise that resolves when the connection is established.
   */
  async connect(): Promise<void> {
    try {
      this.db = await open({
        filename: this.dbPath,
        driver: sqlite3.Database,
      });
      this.logger.info("Connected to the database.", { dbPath: this.dbPath });
    } catch (error) {
      this.logger.error("Failed to connect to the database.", error);
      throw error;
    }
  }

  /**
   * Creates a new table in the SQLite database if it does not already exist.
   *
   * @param tableName - The name of the table to create.
   * @param columns - A string defining the columns and their types, e.g., 'id INTEGER PRIMARY KEY, name TEXT'.
   * @returns A promise that resolves when the table creation is complete.
   */
  async createTable(tableName: string, columns: string): Promise<void> {
    try {
      const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
      await this.db!.run(query);
      this.logger.info(`Table ${tableName} created.`, { columns });
    } catch (error) {
      this.logger.error(`Failed to create table ${tableName}.`, error);
      throw error;
    }
  }

  /**
   * Inserts a new row into a specified table.
   *
   * @param tableName - The name of the table to insert into.
   * @param data - An object containing the column names as keys and the corresponding values.
   * @returns A promise that resolves when the insertion is complete.
   */
  async insert(tableName: string, data: Record<string, any>): Promise<void> {
    try {
      const columns = Object.keys(data).join(", ");
      const placeholders = Object.keys(data)
        .map(() => "?")
        .join(", ");
      const values = Object.values(data);

      const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders});`;
      await this.db!.run(query, values);
      this.logger.info(`Data inserted into ${tableName}.`, { data });
    } catch (error) {
      this.logger.error(`Failed to insert data into ${tableName}.`, error);
      throw error;
    }
  }

  /**
   * Queries a table in the SQLite database.
   *
   * @param tableName - The name of the table to query.
   * @param columns - The columns to retrieve, defaults to '*'.
   * @returns A promise that resolves to an array of rows matching the query.
   */
  async query(tableName: string, columns: string = "*"): Promise<any[]> {
    try {
      const query = `SELECT ${columns} FROM ${tableName};`;
      const rows = await this.db!.all(query);
      this.logger.info(`Query executed on table ${tableName}.`, { columns });
      return rows;
    } catch (error) {
      this.logger.error(`Failed to execute query on table ${tableName}.`, error);
      throw error;
    }
  }

  /**
   * Closes the connection to the SQLite database.
   *
   * @returns A promise that resolves when the connection is closed.
   */
  async close(): Promise<void> {
    try {
      await this.db!.close();
      this.logger.info("Database connection closed.");
    } catch (error) {
      this.logger.error("Failed to close the database connection.", error);
      throw error;
    }
  }
}

export default SQLiteManager;

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
