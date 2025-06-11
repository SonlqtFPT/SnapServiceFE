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