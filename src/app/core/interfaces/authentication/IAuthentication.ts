export interface IAuthentication{
    login(...args: any): any;
    register(...args: any): any;
    recoverAccount(...args: any): any
    resetPassword(...args: any): any
}