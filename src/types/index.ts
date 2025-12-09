export interface Customer {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address?: string;
  picture?: {
    id: string;
    secret: string;
  };
}

export interface Calendar {
  id: string;
  from: string;
  to: string;
  state: CalendarState;
  note?: string;
  carts: Cart[];
  shop?: Shop;
  subject?: Subject;
  employees?: Employee[];
}

export interface Cart {
  id: string;
  name: string;
  item?: Item;
}

export interface Item {
  id: string;
  name: string;
  picture?: File;
}

export interface Shop {
  id: string;
  name: string;
  address?: Address;
  phone?: string;
  email?: string;
}

export interface Address {
  id: string;
  street?: string;
  city?: string;
  zip?: string;
}

export interface Subject {
  id: string;
  name: string;
  alias: string;
  microsite?: Microsite;
}

export interface Microsite {
  id: string;
  logo?: File;
}

export interface File {
  id: string;
  secret: string;
}

export interface Employee {
  id: string;
  userMyFox?: UserMyFox;
}

export interface UserMyFox {
  id: string;
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
}

export enum CalendarState {
  Open = "Open",
  Paid = "Paid",
  Canceled = "Canceled",
  Storno = "Storno",
  Test = "Test",
}
