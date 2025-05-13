const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * API client for making requests to the backend
 */
class ApiClient {
  /**
   * Makes a GET request to the API
   */
  async get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint);
  }

  /**
   * Makes a POST request to the API
   */
  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>('POST', endpoint, data);
  }

  /**
   * Makes a PUT request to the API
   */
  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>('PUT', endpoint, data);
  }

  /**
   * Makes a PATCH request to the API
   */
  async patch<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>('PATCH', endpoint, data);
  }

  /**
   * Makes a DELETE request to the API
   */
  async delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  }

  /**
   * Makes a request to the API with the specified method
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any
  ): Promise<T> {
    // Fix URL construction to prevent double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const url = `${API_URL}/${cleanEndpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };


    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        // Handle API errors
        const error = new Error(
          responseData.message || 'An error occurred during the API request.'
        ) as Error & { status?: number };
        error.status = response.status;
        throw error;
      }

      return responseData;
    } catch (error: any) {
      // Add more context to fetch errors
      if (!error.status) {
        console.error(`Network error while accessing: ${url}`, error);
        throw new Error(`Network error: Unable to connect to ${url}. Please check if the API server is running.`);
      }
      throw error;
    }
  }
}

export const apiClient = new ApiClient();