import React, { useEffect, useState } from 'react';
import { checkGoogleSheetsHealth, checkN8NHealth } from '../utils/googleSheets';

interface HealthStatus {
  sheets: 'ok' | 'error';
  n8n: 'ok' | 'error';
}

const HealthEndpoint: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({
    sheets: 'ok',
    n8n: 'ok'
  });

  const checkHealth = async () => {
    const [sheetsStatus, n8nStatus] = await Promise.all([
      checkGoogleSheetsHealth(),
      checkN8NHealth()
    ]);

    setHealthStatus({
      sheets: sheetsStatus,
      n8n: n8nStatus
    });
  };

  useEffect(() => {
    // Check health on mount
    checkHealth();

    // Set up periodic health checks every 5 minutes
    const interval = setInterval(checkHealth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Expose health status globally for UptimeRobot
  useEffect(() => {
    (window as any).getHealthStatus = () => healthStatus;
  }, [healthStatus]);

  return null; // This component doesn't render anything
};

export default HealthEndpoint;