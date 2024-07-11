export interface IUser{
    id: string;
    fullname?: string | undefined;
    avatar?: string | undefined;
    email: string;
    token: string;
    expiresIn: number;
    expiresAt: number | undefined;
    authType: 'normal' | 'recovery';
}