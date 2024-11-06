export interface UserTokenPayload {
    access: string;
    refresh: string;
    user_id: number;
}

export interface CustomJwtPayload {
    username: string;
    email: string;
    exp: number;
    iat: number;
}

export interface RegisterError {
    field: string;
    messages: string[];
}
