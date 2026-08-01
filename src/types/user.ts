export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: "ADMIN" | "CUSTOMER";
}
