export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface Order {
  id: number;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  items: OrderItem[];
}