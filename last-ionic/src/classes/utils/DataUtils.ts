import { Schedule, Session } from '../../interfaces/models/Schedule';
import { Preferences } from '@capacitor/preferences';
import Logger from '../utils/LoggerUtils';
import DebugUtils from './DebugUtils';

const debug = DebugUtils.setDebug(false) // Adjust based on environment or build configuration

/**
 * Parses sessions from a schedule by flattening groups.
 * @param schedule The schedule containing groups of sessions.
 * @returns An array of sessions extracted from the schedule.
 */
export const parseSessions = (schedule: Schedule): Session[] => {
  const sessions: Session[] = [];
  schedule.groups.forEach((group) => group.sessions.forEach((session) => sessions.push(session)));
  return sessions;
};

/**
 * Sets or removes a value in preferences asynchronously.
 * @param key The key under which to store the value.
 * @param value The value to set or remove.
 * @param def The default value if removing (optional).
 * @param string Indicates if the value is a string (default true).
 * @returns A promise that resolves after setting or removing the value.
 */
export const setOrRemove = async (key: string, value: any, def: any, string: boolean = true) => {
  try {
    //if (debug) Logger.log(' • DataApi::setOrRemove', { key: key, value: value, string: string });
    return ! value
      ? await Preferences.remove({ key: key })
      : await Preferences.set({ key: key, value: value });
  } catch (error) {
    //Logger.error('• Error setting or removing preference:', error);
    throw error; // Propagate the error for higher-level handling
  }
};

/**
 * Toggles a boolean value in preferences asynchronously.
 * @param key The key under which to store the boolean value.
 * @param value The boolean value to toggle.
 * @param def The default value if setting (optional).
 * @returns A promise that resolves after toggling the boolean value.
 * DEPRECATED // TODO: REFORGE!!
 */
export const toggleBool = async (key: string, value: any, def: boolean = true) => {
  try {
    //if (debug) Logger.log(' • DataApi::toggleBool', { key: key, value: value });
    await Preferences.set({ key: key, value: value });
  } catch (error) {
    //if (debug) Logger.error('• Error toggling boolean preference:', error);
    throw error; // Propagate the error for higher-level handling
  }
};
