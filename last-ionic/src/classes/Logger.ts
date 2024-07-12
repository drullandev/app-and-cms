const Logger = {

  log: (...args: any) => {
    if (process.env.NODE_ENV !== 'production') console.log(...args);
  },

  warn: (...args: any) => {
    if (process.env.NODE_ENV !== 'production') console.warn(...args);
  },

  error: (...args: any) => {
    if (process.env.NODE_ENV !== 'production') console.error(...args);
  },

  info: (...args: any) => {
    if (process.env.NODE_ENV !== 'production') console.info(...args);
  },

  debug: (...args: any) => {
    if (process.env.NODE_ENV !== 'production') console.debug(...args);
  },

  show: (...args: any) => { // Show allways anyway
    console.info(...args);
  }

}

export default Logger;