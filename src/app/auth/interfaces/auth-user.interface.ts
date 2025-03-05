export interface AuthUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // Auth0 user id
}
