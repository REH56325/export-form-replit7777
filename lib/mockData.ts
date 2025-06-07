// API Configuration for Netlify deployment
export const API_CONFIG = {
  // Base URL for your backend API - configure in Netlify environment variables
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
  
  // Timeout settings
  TIMEOUT: 10000,
  
  // Retry configuration
  MAX_RETRIES: 3,
};

// API Status Messages
export const API_STATUS = {
  LOADING: 'Loading educational content...',
  ERROR: 'Unable to load content. Please check your connection.',
  EMPTY: 'No content available at this time.',
  RETRY: 'Retrying connection...',
};

// Enhanced API request with retry logic
export async function apiRequestWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = API_CONFIG.MAX_RETRIES
): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
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