import { Order } from "./order";
import { Review } from "./review";
import { Supplier } from "./supplier";
import { Shipper } from "./shipper";

export interface UserDetail {
  Id: number;
  Username: string;
  Email: string;
  Password: string;
  role: string;
  CreatedAt: string;
  Phone: string;
  Address: string;
  AreaCode: string | null;
  ImageUrl: string;
  IsActive: boolean;
  FullName: string;

  orders: Order[];
  product_reviews: Review[];
  suppliers: Supplier[];
  shipper: Shipper | null;
}

export interface UserListItem {
  Id: number;
  FullName: string;
  Username: string;
  Email: string;
  Phone: string;
  Role: string;
  IsActive: boolean;
  ImageUrl: string;
}

export interface AssignAreaResponse {
  statusCode: number
  message: string
}
