import React, { useEffect, useState } from 'react';
import Accordion from '../../extra/Accordion'; // Ensure the path is correct
import { default as LoggerUtils } from '../../../classes/utils/LoggerUtils'; // Ensure the path is correct

interface LoggerProps {
  children: React.ReactNode; // Content to render inside the Logger
}

const Logger: React.FC<LoggerProps> = ({ children }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Function to update the logs from LoggerUtils
    const updateLogs = () => {
// TODO: Revisar      setLogs(LoggerUtils.getLogs());
    };

    // Set up an interval to periodically update the logs
    const intervalId = setInterval(updateLogs, 1000); // Updates logs every 1 second (adjust as needed)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Create sections for each log entry
  const logSections = logs.map((log, index) => ({
    title: `Log Entry ${index + 1}`, // Title for each accordion section
    content: <pre>{log}</pre> // Content of each accordion section
  }));

  return (
    <>
      {/* Render the child components passed as props */}
      {children}

      {/* Accordion component to display each log entry as a separate section */}
      <Accordion title="Logger" sections={logSections} />
    </>
  );
};

export default React.memo(Logger);
