export interface RootData {
  name: string;
  age: number;
  email: string;
  isEmployed: boolean;
  address: Address;
  hobbies: string[];
  day: number;
}

export interface Address {
  street: string;
  city: string;
  country: string;
}
