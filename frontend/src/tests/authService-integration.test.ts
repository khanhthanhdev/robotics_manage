/**
 * Enhanced AuthService Integration Tests
 * 
 * Simple integration tests for the EnhancedAuthService implementation.
 * Tests basic functionality and error handling.
 * 
 * @author Robotics Tournament Management System
 * @version 1.0.0
 */

import { 
  EnhancedAuthService, 
  AuthError, 
  AuthErrorType, 
  createAuthService,
  IAuthCredentials,
  IRegistrationData,
  IAuthServiceConfig 
} from '../services/authService';
import { User, UserRole } from '../lib/types';

/**
 * Simple test runner
 */
class TestRunner {
  private tests: Array<{ name: string; test: () => Promise<void> | void }> = [];
  private results: Array<{ name: string; passed: boolean; error?: string }> = [];

  describe(name: string, tests: () => void) {
    console.log(`\n=== ${name} ===`);
    tests();
  }

  it(name: string, test: () => Promise<void> | void) {
    this.tests.push({ name, test });
  }

  async run() {
    console.log('Running Enhanced AuthService Tests...\n');
    
    for (const { name, test } of this.tests) {
      try {
        await test();
        this.results.push({ name, passed: true });
        console.log(`✓ ${name}`);
      } catch (error) {
        this.results.push({ 
          name, 
          passed: false, 
          error: error instanceof Error ? error.message : String(error) 
        });
        console.log(`✗ ${name}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    this.printResults();
  }

  private printResults() {
    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    
    console.log(`\n=== Test Results ===`);
    console.log(`Passed: ${passed}/${total}`);
    
    if (passed < total) {
      console.log('\nFailed tests:');
      this.results.filter(r => !r.passed).forEach(r => {
        console.log(`- ${r.name}: ${r.error}`);
      });
    }
  }
}

// Mock API client for testing
class MockApiClient {
  private responses: Map<string, any> = new Map();
  private shouldFail: Map<string, any> = new Map();

  setResponse(key: string, response: any) {
    this.responses.set(key, response);
  }

  setFailure(key: string, error: any) {
    this.shouldFail.set(key, error);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest('GET', endpoint);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest('POST', endpoint, data);
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest('PATCH', endpoint, data);
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest('PUT', endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest('DELETE', endpoint);
  }

  private async makeRequest<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const key = `${method}:${endpoint}`;
    
    if (this.shouldFail.has(key)) {
      throw this.shouldFail.get(key);
    }

    if (this.responses.has(key)) {
      return this.responses.get(key);
    }

    throw new Error(`No mock response configured for ${key}`);
  }

  reset() {
    this.responses.clear();
    this.shouldFail.clear();
  }
}

// Test data
const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  role: UserRole.TEAM_LEADER,
};

const validCredentials: IAuthCredentials = {
  username: 'testuser',
  password: 'password123',
};

const validRegistrationData: IRegistrationData = {
  username: 'newuser',
  password: 'password123',
  email: 'newuser@example.com',
  role: UserRole.TEAM_MEMBER,
};

// Test utilities
function assertEquals(actual: any, expected: any, message?: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message || 'Assertion failed'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertThrows(fn: () => any, expectedError?: any, message?: string) {
  try {
    fn();
    throw new Error(`${message || 'Expected function to throw'}`);
  } catch (error) {
    if (expectedError && !(error instanceof expectedError)) {
      const errorName = error instanceof Error ? error.constructor.name : typeof error;
      throw new Error(`${message || 'Wrong error type'}: expected ${expectedError.name}, got ${errorName}`);
    }
  }
}

async function assertThrowsAsync(fn: () => Promise<any>, expectedError?: any, message?: string) {
  try {
    await fn();
    throw new Error(`${message || 'Expected function to throw'}`);
  } catch (error) {
    if (expectedError && !(error instanceof expectedError)) {
      const errorName = error instanceof Error ? error.constructor.name : typeof error;
      throw new Error(`${message || 'Wrong error type'}: expected ${expectedError.name}, got ${errorName}`);
    }
  }
}

// Run tests
const runner = new TestRunner();
const mockApiClient = new MockApiClient();

runner.describe('Enhanced AuthService Tests', () => {
  
  runner.describe('AuthError', () => {
    runner.it('should create AuthError with correct properties', () => {
      const error = new AuthError(
        AuthErrorType.INVALID_CREDENTIALS,
        'Test error',
        401,
        { context: 'test' }
      );

      assertEquals(error.type, AuthErrorType.INVALID_CREDENTIALS);
      assertEquals(error.message, 'Test error');
      assertEquals(error.statusCode, 401);
      assertEquals(error.details, { context: 'test' });
      assertEquals(error.name, 'AuthError');
    });

    runner.it('should identify recoverable errors correctly', () => {
      const networkError = new AuthError(AuthErrorType.NETWORK_ERROR, 'Network error');
      const credentialsError = new AuthError(AuthErrorType.INVALID_CREDENTIALS, 'Invalid credentials');

      assertEquals(networkError.isRecoverable(), true);
      assertEquals(credentialsError.isRecoverable(), false);
    });

    runner.it('should identify errors requiring user action', () => {
      const credentialsError = new AuthError(AuthErrorType.INVALID_CREDENTIALS, 'Invalid credentials');
      const networkError = new AuthError(AuthErrorType.NETWORK_ERROR, 'Network error');

      assertEquals(credentialsError.requiresUserAction(), true);
      assertEquals(networkError.requiresUserAction(), false);
    });
  });

  runner.describe('Service Creation', () => {
    runner.it('should create service with factory function', () => {
      const service = createAuthService();
      
      if (!service) {
        throw new Error('Service creation failed');
      }
    });

    runner.it('should create service with custom config', () => {
      const customConfig = {
        baseURL: 'https://custom-api.com',
        retryAttempts: 5,
      };

      const service = createAuthService(customConfig);
      
      if (!service) {
        throw new Error('Service creation with custom config failed');
      }
    });
  });

  runner.describe('Authentication Methods', () => {
    runner.it('should validate credentials before login', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      const invalidCredentials = { username: '', password: 'password' };
      
      await assertThrowsAsync(
        () => authService.login(invalidCredentials),
        AuthError,
        'Should throw AuthError for invalid credentials'
      );
    });

    runner.it('should validate email format in registration', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      const invalidData = { ...validRegistrationData, email: 'invalid-email' };
      
      await assertThrowsAsync(
        () => authService.register(invalidData),
        AuthError,
        'Should throw AuthError for invalid email'
      );
    });

    runner.it('should handle successful login', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      mockApiClient.setResponse('POST:/auth/login', { user: mockUser });
      
      const result = await authService.login(validCredentials);
      assertEquals(result, mockUser);
    });

    runner.it('should handle login failure', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      const error = { status: 401, response: { data: { message: 'Invalid credentials' } } };
      mockApiClient.setFailure('POST:/auth/login', error);
      
      await assertThrowsAsync(
        () => authService.login(validCredentials),
        AuthError,
        'Should throw AuthError for login failure'
      );
    });

    runner.it('should handle getCurrentUser when authenticated', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      mockApiClient.setResponse('GET:/auth/check-auth', { user: mockUser });
      
      const result = await authService.getCurrentUser();
      assertEquals(result, mockUser);
    });

    runner.it('should return null when not authenticated', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      const error = { status: 401 };
      mockApiClient.setFailure('GET:/auth/check-auth', error);
      
      const result = await authService.getCurrentUser();
      assertEquals(result, null);
    });

    runner.it('should handle logout gracefully', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      mockApiClient.setResponse('POST:/auth/logout', {});
      
      // Should not throw
      await authService.logout();
    });

    runner.it('should handle logout failure gracefully', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      const error = new Error('Server error');
      mockApiClient.setFailure('POST:/auth/logout', error);
      
      // Should not throw even if logout fails
      await authService.logout();
    });
  });

  runner.describe('Session Management', () => {
    runner.it('should validate session successfully', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      mockApiClient.setResponse('GET:/auth/check-auth', {});
      
      const result = await authService.validateSession();
      assertEquals(result, true);
    });

    runner.it('should return false for invalid session', async () => {
      const config: IAuthServiceConfig = {
        baseURL: 'http://localhost:3001',
        enableLogging: false,
      };
      
      const authService = new EnhancedAuthService(config, mockApiClient as any);
      
      const error = new Error('Invalid session');
      mockApiClient.setFailure('GET:/auth/check-auth', error);
      
      const result = await authService.validateSession();
      assertEquals(result, false);
    });
  });
});

// Run the tests
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  runner.run().catch(console.error);
} else {
  // Browser environment
  console.log('Enhanced AuthService tests ready to run');
  console.log('Call runner.run() to execute tests');
}

export { runner };
