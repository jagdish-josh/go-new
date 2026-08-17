import { API_ENDPOINTS } from "./constants";

const API_BASE_URL = "http://localhost:8080";

export interface HealthCheck {
  response_time: string;
  status: string;
}

export interface HealthResponse {
  checks: {
    database: HealthCheck;
    redis: HealthCheck;
  };
  environment: string;
  status: string;
  timestamp: string;
}

export const getHealthStatus = async (): Promise<HealthResponse> => {
  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.HEALTH}`
  );

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }

  return response.json();
};