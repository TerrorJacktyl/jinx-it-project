import { AxiosRequestConfig } from "axios";

// Type for user context state
export interface IUserContext {
  username: string;
  firstName: string;
  token: string;
  // Set true when user logged in; set false when token is invalid
  authenticated: boolean;
  theme: "lightTheme" | "darkTheme";
  config: AxiosRequestConfig;
}
