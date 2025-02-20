export interface ITableStand {
  unit_amount: number;
  price_id: string;
  product_id: string;
}

export type ApiResponse = {
  data: Product[];
};

export type Product = {
  _id: string;
  title: string;
  image: string | null;
  description: string;
  active: boolean;
  prices: Price[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type Price = {
  _id: string;
  product_id: string;
  active: boolean;
  currency: string; // e.g., "eur"
  recurringInterval: string; // e.g., "month"
  unit_amount: number; // amount in the smallest currency unit (e.g., cents)
  type: string; // e.g., "recurring"
  __v: number;
};

export type Offer = {
  _id: string;
  restaurant_id: string;
  name: string;
  discount: number;
  code: string;
  start_date: number; // timestamp
  end_date: number; // timestamp
  image: string;
  description: string;
  offer_type: string; // e.g., "percentage"
  currency: string;
  deleted: string; // e.g., "N"
  created: number; // timestamp
  updated: number; // timestamp
  __v: number;
};
