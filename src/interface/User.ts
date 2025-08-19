export interface User{
    id: number;
    username: string;
    email: string;
    role: string;
    enabled: boolean;
    authProvider: string;
}