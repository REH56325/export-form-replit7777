// Production API configuration for Netlify deployment
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Enhanced fetch with retry logic for production
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  for (let attempt = 1; attempt <= API_CONFIG.RETRY_ATTEMPTS; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: 'include',
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      if (attempt === API_CONFIG.RETRY_ATTEMPTS) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
    }
  }
  
  throw new Error('Max retry attempts reached');
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await apiRequest(endpoint);
  return response.json();
}

export async function apiPost<T>(endpoint: string, data?: unknown): Promise<T> {
  const response = await apiRequest(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });
  return response.json();
}