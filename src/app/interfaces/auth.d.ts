export interface IAuth {
  login(): void;
  logout(): void;
  getProfile(): Record<string, any>;
  getIdToken(): string;
  getIsLoggedIn(): boolean;
}
