export type UserType = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    create_at: Date;
    phone: number;
    address: string;
    image_url : string;
    is_active: boolean;
    full_name: string; 
}

export type UserLoginType = {
    UserId: string;
    FullName: string;
    Role: string;
}