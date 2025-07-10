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

export type User = {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    imageUrl: string;
    role: string;
    isActive: boolean;
    createdAt: string;
};