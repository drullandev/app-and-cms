import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

/**
 * FileManager class
 * Manages file operations such as reading, writing, and deleting files
 * using Capacitor's Filesystem API. Works for both Android, iOS, and Web.
 *
 * @class FileManager
 * @example
 * const fileManager = new FileManager();
 * await fileManager.writeFile('myFile.txt', 'Hello World');
 * const content = await fileManager.readFile('myFile.txt');
 * await fileManager.deleteFile('myFile.txt');
 *
 * @author David Rullán
 * @date October 2024
 */
class FileManager {
  /**
   * Writes data to a file in the device's filesystem.
   *
   * @param fileName - The name of the file to write.
   * @param data - The data to write to the file.
   * @returns A promise indicating the completion of the write operation.
   */
  public async writeFile(fileName: string, data: string): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: fileName,
        data: data,
        directory: Directory.Documents, // You can change the directory based on your needs
        encoding: Encoding.UTF8,
      });
      console.log(`File written successfully: ${fileName}`);
    } catch (error) {
      console.error(`Error writing file ${fileName}:`, error);
    }
  }

  /**
   * Reads the content of a file from the device's filesystem.
   *
   * @param fileName - The name of the file to read.
   * @returns A promise that resolves with the content of the file as a string.
   */
  public async readFile(fileName: string): Promise<string | undefined> {
    try {
      const result = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Documents,
        encoding: Encoding.UTF8, // Ensure encoding is UTF-8 to force string result
      });

      return result.data as string; // Cast result.data to string to avoid Blob issues
    } catch (error) {
      console.error(`Error reading file ${fileName}:`, error);
      return undefined;
    }
  }

  /**
   * Deletes a file from the device's filesystem.
   *
   * @param fileName - The name of the file to delete.
   * @returns A promise indicating the completion of the delete operation.
   */
  public async deleteFile(fileName: string): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Documents,
      });
      console.log(`File deleted successfully: ${fileName}`);
    } catch (error) {
      console.error(`Error deleting file ${fileName}:`, error);
    }
  }

  /**
   * Checks if a file exists in the device's filesystem.
   *
   * @param fileName - The name of the file to check.
   * @returns A boolean indicating whether the file exists or not.
   */
  public async fileExists(fileName: string): Promise<boolean> {
    try {
      await Filesystem.stat({
        path: fileName,
        directory: Directory.Documents,
      });
      return true;
    } catch (error) {
      console.log(`File not found: ${fileName}`);
      return false;
    }
  }

  /**
   * Lists all files in the specified directory.
   *
   * @param directory - The directory to list files from. Defaults to 'Documents'.
   * @returns A promise that resolves with an array of file names.
   */
  public async listFiles(
    directory: Directory = Directory.Documents
  ): Promise<string[]> {
    try {
      const result = await Filesystem.readdir({
        path: "",
        directory: directory,
      });

      // Map FileInfo[] to string[]
      return result.files.map((file) => file.name); // Access the 'name' property of FileInfo
    } catch (error) {
      console.error(`Error listing files in directory ${directory}:`, error);
      return [];
    }
  }
}

export default FileManager;
