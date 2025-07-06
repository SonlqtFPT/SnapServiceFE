export interface registerRequest {
    fullname: string;
    email: string;
    phone: string;
    password: string;
}

export interface loginRequest {
    emailOrPhone: string;
    password: string;
}

export interface UserRequest {
    Id: number;
    UserName: string;
    Email: string;
    Password: string;
    Role: string;
    CreateAt: Date;
    Phone: number;
    Address: string;
    ImageUrl : string;
    IsActive: boolean;
    FullName: string; 
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  fullname: string;
}
