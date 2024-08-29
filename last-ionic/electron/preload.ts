import { contextBridge, ipcRenderer } from 'electron';

// Expose a secure API to the renderer process
contextBridge.exposeInMainWorld('api', {
  // Function to send messages from the renderer process to the main process
  send: (channel: string, data: any) => {
    // List of channels that are allowed to be used for communication
    const validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      // Send the message to the main process if the channel is valid
      ipcRenderer.send(channel, data);
    }
  },
  
  // Function to receive messages from the main process in the renderer process
  receive: (channel: string, func: (...args: any[]) => void) => {
    // List of channels that are allowed to be used for receiving messages
    const validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // Remove all existing listeners for the channel to avoid multiple handlers
      ipcRenderer.removeAllListeners(channel);
      // Register a new listener for the channel that calls the provided callback function
      ipcRenderer.on(channel, (event, ...args: any[]) => func(...args));
    }
  }
});