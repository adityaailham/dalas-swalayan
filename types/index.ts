export interface Category {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  category_id: number;
  category?: Category;
  CategoryName?: string;
  image_url: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Promo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  banner_url?: string;
  start_date?: string;
  end_date?: string;
  sort_order?: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}
