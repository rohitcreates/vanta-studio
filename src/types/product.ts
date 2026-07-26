export type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  trending: boolean;
};