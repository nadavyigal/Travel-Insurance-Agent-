import React, { useEffect, useState } from 'react';
import { checkGoogleSheetsHealth, checkN8NHealth } from '../utils/googleSheets';

interface HealthStatus {
  sheets: 'ok' | 'error';
  n8n: 'ok' | 'error';
}

const Health: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({
    sheets: 'ok',
    n8n: 'ok'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true);
      try {
        const [sheetsStatus, n8nStatus] = await Promise.all([
          checkGoogleSheetsHealth(),
          checkN8NHealth()
        ]);

        setHealthStatus({
          sheets: sheetsStatus,
          n8n: n8nStatus
        });
      } catch (error) {
        console.error('Health check failed:', error);
        setHealthStatus({
          sheets: 'error',
          n8n: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking health status...</p>
        </div>
      </div>
    );
  }

  // Return JSON response for UptimeRobot
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            System Health Status
          </h1>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Google Sheets</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                healthStatus.sheets === 'ok' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {healthStatus.sheets}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">N8N Webhook</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                healthStatus.n8n === 'ok' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {healthStatus.n8n}
              </span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-medium text-gray-700 mb-2">JSON Response:</h2>
            <pre className="text-sm text-gray-600 font-mono">
              {JSON.stringify(healthStatus, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;