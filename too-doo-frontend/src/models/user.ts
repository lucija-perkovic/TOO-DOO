export interface UserCreateRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserDataRequest {
    email: string;
    password: string;
}

export interface UserDataResponse {
    token: string;
    userId: string;
}