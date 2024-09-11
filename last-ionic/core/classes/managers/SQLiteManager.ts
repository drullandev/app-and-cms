import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * ISQLiteManager defines the contract for SQLiteManager operations.
 * This interface ensures that the SQLiteManager can handle SQLite database management consistently.
 */
export interface ISQLiteManager {
  connect(): Promise<void>;
  createTable(tableName: string, columns: string): Promise<void>;
  insert(tableName: string, data: Record<string, any>): Promise<void>;
  query(tableName: string, columns?: string): Promise<any[]>;
  close(): Promise<void>;
}

/**
 * SQLiteManager provides a simple interface for interacting with an SQLite database.
 * It includes methods for connecting to a database, creating tables, inserting data,
 * querying tables, and closing the connection.
 *
 * This class is designed to be easy to use and provides basic database management
 * functionality for Node.js applications using SQLite.
 *
 * It supports multiple instances based on the database path (dbPath), meaning
 * that each path corresponds to a unique SQLiteManager instance.
 *
 * @example
 * const dbManager = SQLiteManager.getInstance('./my-database.db');
 * await dbManager.connect();
 * await dbManager.createTable('users', 'id INTEGER PRIMARY KEY, name TEXT, email TEXT');
 * await dbManager.insert('users', { name: 'John Doe', email: 'john@example.com' });
 * const users = await dbManager.query('users');
 * await dbManager.close();
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
class SQLiteManager implements ISQLiteManager {
  private static instances: Map<string, SQLiteManager> = new Map(); // Store instances by dbPath
  private db: Database | null = null;
  private dbPath: string;
  private logger: LoggerUtils;
  private debug: boolean = false; // Debug mode flag

  /**
   * Private constructor to enforce instantiation control.
   *
   * @param dbPath - The path to the SQLite database file.
   * @param debug - Optional flag to enable or disable debug mode.
   */
  private constructor(dbPath: string, debug?: boolean) {
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug, 100);
    this.dbPath = dbPath;

    if (this.debug) {
      this.logger.info("SQLiteManager initialized", { dbPath });
    }
  }

  /**
   * Retrieves or creates a new SQLiteManager instance for the given database path.
   *
   * @param dbPath - The path to the SQLite database file.
   * @param debug - Optional flag to enable or disable debug mode.
   * @returns {SQLiteManager} The SQLiteManager instance for the specified path.
   */
  public static getInstance(dbPath: string = './default-database.db', debug?: boolean): SQLiteManager {
    if (!this.instances.has(dbPath)) {
      this.instances.set(dbPath, new SQLiteManager(dbPath, debug));
    }
    return this.instances.get(dbPath)!;
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
   * This operation can only be executed when debug mode is enabled.
   *
   * @param tableName - The name of the table to create.
   * @param columns - A string defining the columns and their types, e.g., 'id INTEGER PRIMARY KEY, name TEXT'.
   * @returns A promise that resolves when the table creation is complete.
   * @throws Error if debug mode is disabled.
   */
  async createTable(tableName: string, columns: string): Promise<void> {
    if (!this.debug) {
      this.logger.error("Attempted to create a table while debug mode is disabled.");
      throw new Error("Table creation is only allowed in debug mode.");
    }

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