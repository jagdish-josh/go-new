import { useEffect, useState } from "react";
import {
  getHealthStatus,
  type HealthResponse,
} from "../api/healthApi.ts";

const HealthStatus = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const data = await getHealthStatus();
        setHealth(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch health status"
        );
      }
    };

    fetchHealthStatus();
  }, []);

  if (error) {
    return <div>Unable to fetch health status: {error}</div>;
  }

  if (!health) {
    return <div>Checking health...</div>;
  }

  return (
    <div>
      <h2>System Health</h2>

      <div>
        <strong>Status:</strong> {health.status}
      </div>

      <div>
        <strong>Environment:</strong> {health.environment}
      </div>

      <div>
        <strong>Timestamp:</strong>{" "}
        {new Date(health.timestamp).toLocaleString()}
      </div>

      <h3>Services</h3>

      {Object.entries(health.checks).map(([service, check]) => (
        <div key={service}>
          <strong>{service}</strong>
          <div>Status: {check.status}</div>
          <div>Response time: {check.response_time}</div>
        </div>
      ))}
    </div>
  );
};

export default HealthStatus;