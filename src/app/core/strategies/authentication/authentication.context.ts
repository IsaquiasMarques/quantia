import { IAuthentication } from "@core/interfaces/authentication/IAuthentication";

export class AuthenticationContext implements IAuthentication{
    
    protected strategy!: IAuthentication;

    setStrategy(strategy: IAuthentication){
        this.strategy = strategy;
    }

    login(...args: any) {
        this.strategy.login(...args);
    }

    register(...args: any) {
        this.strategy.register(...args);
    }
    
    recoverAccount(...args: any) {
        this.strategy.recoverAccount(...args);
    }

    resetPassword(...args: any){
        this.strategy.resetPassword(...args);
    }
}