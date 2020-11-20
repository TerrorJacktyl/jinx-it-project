import { AxiosRequestConfig } from "axios";

// Type for user context state
export interface IUserContext {
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  // Set true when user logged in; set false when token is invalid
  authenticated: boolean;
  lightThemeMode: boolean;
  portfolioId: number;
  theme: string;
  isSaving: boolean; 
  config: AxiosRequestConfig;
}
