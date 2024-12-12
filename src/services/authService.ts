import axios, { AxiosInstance } from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

class AuthService {
  // Initialize baseUrl in the constructor
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    // Use environment variable or default fallback
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    
    // Create axios instance in the constructor
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Setup interceptor during initialization
    this.setupAuthInterceptor();
  }

  // Interceptor to attach token to requests
  private setupAuthInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Login method
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    try {
      const response = await this.axiosInstance.post<AuthTokens>('/token/', credentials);
      
      // Store tokens in local storage
      this.setTokens(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  // Register method
  async register(userData: RegisterCredentials): Promise<UserProfile> {
    try {
      const response = await this.axiosInstance.post<UserProfile>('/register/', userData);
      return response.data;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  }

  // Refresh token method
  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    
    try {
      const response = await this.axiosInstance.post<AuthTokens>('/token/refresh/', {
        refresh: refreshToken
      });
      
      // Update tokens
      this.setTokens(response.data);
      
      return response.data;
    } catch (error) {
      // If refresh fails, logout user
      this.logout();
      throw error;
    }
  }

  // Logout method
  logout(): void {
    // Remove tokens from storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Optional: Redirect to login page
    window.location.href = '/login';
  }

  // Token storage methods
  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const response = await this.axiosInstance.get<UserProfile>('/profile/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      return null;
    }
  }

  // Password reset methods
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await this.axiosInstance.post('/password-reset/', { email });
    } catch (error) {
      console.error('Password reset request failed', error);
      throw error;
    }
  }

  async confirmPasswordReset(
    uid: string, 
    token: string, 
    newPassword: string
  ): Promise<void> {
    try {
      await this.axiosInstance.post('/password-reset-confirm/', {
        uid,
        token,
        new_password: newPassword
      });
    } catch (error) {
      console.error('Password reset confirmation failed', error);
      throw error;
    }
  }
}

// Export a singleton instance
export default new AuthService();