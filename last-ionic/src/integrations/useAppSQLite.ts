import SQLiteManager, { ISQLiteManager } from "../classes/managers/SQLiteManager";
import { sqlitePath } from '../app/config/env'

/**
 * Creates and exports an instance of SQLiteManager configured with the specified database path.
 * 
 * @returns An instance of SQLiteManager configured with the database path.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 1, 2024
 */

const useAppSQLite: ISQLiteManager = SQLiteManager.getInstance(sqlitePath);

export default useAppSQLite;