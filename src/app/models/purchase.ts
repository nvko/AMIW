export interface Purchase {
  id: number;
  username: string;
  product_id: number;
  quantity: number;
  transaction_token: number;
  purchase_date: Date;
}
