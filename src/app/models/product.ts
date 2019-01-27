export interface Product {
  id: number;
  name: string;
  price: number;
  img_path: string;
  quantity?: number;
  transaction_token?: string;
  purchase_date?: Date;
}
