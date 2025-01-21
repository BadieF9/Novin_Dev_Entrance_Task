export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserCreate {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}
