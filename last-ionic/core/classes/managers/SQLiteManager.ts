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
 * @class SQLiteManager
 * @author David Rullán - https://github.com/drullandev
 * @date September 10, 2024
 */
class SQLiteManager implements ISQLiteManager {
  private static instances: Map<string, SQLiteManager> = new Map(); // Store instances per database path
  private dbPath: string;
  private db?: Database;
  private logger: LoggerUtils;
  private debug: boolean = false;

  /**
   * Private constructor to prevent direct instantiation. Use getInstance() instead.
   * 
   * @param dbPath - The path to the SQLite database file.
   */
  private constructor(dbPath: string) {
    this.dbPath = dbPath;
    this.debug = DebugUtils.setDebug(this.debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug);
  }

  /**
   * Retrieves the singleton instance of SQLiteManager for the specified database path.
   * 
   * @param dbPath - The path to the SQLite database file.
   * @returns {SQLiteManager} The SQLiteManager instance for the specified path.
   */
  public static getInstance(dbPath: string): SQLiteManager {
    if (!this.instances.has(dbPath)) {
      this.instances.set(dbPath, new SQLiteManager(dbPath));
    }
    return this.instances.get(dbPath)!;
  }

  /**
   * Connects to the SQLite database. If already connected, it will reuse the existing connection.
   */
  public async connect(): Promise<void> {
    try {
      if (!this.db) {
        this.db = await open({
          filename: this.dbPath,
          driver: sqlite3.Database,
        });
        this.logger.info(`Connected to SQLite database at ${this.dbPath}`);
      }
    } catch (error) {
      this.logger.error("Failed to connect to the SQLite database", error);
      throw new Error("Database connection failed");
    }
  }

  /**
   * Creates a new table in the database with the specified columns.
   * 
   * @param tableName - The name of the table to create.
   * @param columns - The columns to include in the table, formatted as a SQL string.
   */
  public async createTable(tableName: string, columns: string): Promise<void> {
    try {
      await this.db?.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`);
      this.logger.info(`Table '${tableName}' created successfully`);
    } catch (error) {
      this.logger.error(`Failed to create table '${tableName}'`, error);
      throw new Error(`Failed to create table '${tableName}'`);
    }
  }

  /**
   * Inserts data into the specified table.
   * 
   * @param tableName - The name of the table to insert data into.
   * @param data - A record containing key-value pairs of the data to insert.
   */
  public async insert(tableName: string, data: Record<string, any>): Promise<void> {
    try {
      const columns = Object.keys(data).join(", ");
      const placeholders = Object.keys(data).map(() => "?").join(", ");
      const values = Object.values(data);

      await this.db?.run(`INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`, values);
      this.logger.info(`Data inserted into '${tableName}'`, data);
    } catch (error) {
      this.logger.error(`Failed to insert data into table '${tableName}'`, error);
      throw new Error(`Failed to insert data into '${tableName}'`);
    }
  }

  /**
   * Queries data from the specified table.
   * 
   * @param tableName - The name of the table to query.
   * @param columns - Optional columns to select. Defaults to '*'.
   * @returns {Promise<any[]>} The query result.
   */
  public async query(tableName: string, columns: string = "*"): Promise<any[]> {
    try {
      const rows = await this.db?.all(`SELECT ${columns} FROM ${tableName}`);
      this.logger.info(`Query executed on table '${tableName}'`);
      return rows || [];
    } catch (error) {
      this.logger.error(`Failed to query table '${tableName}'`, error);
      throw new Error(`Failed to query table '${tableName}'`);
    }
  }

  /**
   * Closes the database connection.
   */
  public async close(): Promise<void> {
    try {
      await this.db?.close();
      this.logger.info(`Connection to SQLite database at ${this.dbPath} closed`);
    } catch (error) {
      this.logger.error("Failed to close the database connection", error);
      throw new Error("Failed to close the database connection");
    }
  }
}

export default SQLiteManager;
