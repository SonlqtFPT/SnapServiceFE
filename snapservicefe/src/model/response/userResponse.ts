import { Order } from "./order";
import { ReviewType } from "./review";
import { Supplier } from "./supplier";
import { Shipper } from "./shipper";

export interface UserDetail {
  Id: number;
  Username: string;
  Email: string;
  Password: string;
  Role: string;
  CreatedAt: string;
  Phone: string;
  Address: string;
  AreaCode: string | null;
  ImageUrl: string;
  IsActive: boolean;
  FullName: string;

  orders: Order[];
  product_reviews: ReviewType[];
  suppliers: Supplier[];
  shipper: Shipper | null;
}

export interface UserListItem {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  imageUrl: string;
  createdAt?: string;
   registeredDate?: string;
}

export interface AssignAreaResponse {
  statusCode: number
  message: string
}
export interface UsersByMonthResponse {
    month: number;
    year: number;
    total: number;
}
