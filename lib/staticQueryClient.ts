import { QueryClient, QueryFunction } from "@tanstack/react-query";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const API_TIMEOUT = 10000;
const MAX_RETRIES = 3;

// Enhanced API request with retry logic
async function apiRequestWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = MAX_RETRIES
): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return apiRequestWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

// Production-ready query function that connects to your backend API
export const getProductionQueryFn: QueryFunction = async ({ queryKey }) => {
  const [endpoint] = queryKey as [string, ...any[]];
  
  try {
    const response = await apiRequestWithRetry(endpoint);
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Production API request function for mutations
export async function productionApiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  return apiRequestWithRetry(url, {
    method,
    headers: data ? { 'Content-Type': 'application/json' } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
  });
}

export const productionQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getProductionQueryFn,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
    mutations: {
      retry: 1,
    },
  },
});