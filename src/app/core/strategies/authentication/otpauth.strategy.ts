import { OTPAuth } from "@core/models/otpauth.model";
import { AuthenticationContext } from "./authentication.context";
import { IAuthentication } from "@core/interfaces/authentication/IAuthentication";
import { SupabaseService } from "@core/services/supabase/supabase.service";

export class OTPAuthStrategy implements IAuthentication{
    
    constructor(private supabaseService: SupabaseService){}

    async login(userData: OTPAuth): Promise<any> {
        try {
            
            const { data, error } = await this.supabaseService.supabase.auth.signInWithOtp({
                email: userData.email,
                options: {
                    emailRedirectTo: 'http://localhost:4200/account',
                    shouldCreateUser: true,
                    
                }
            });

            if(error){}

        } catch (error) {
            throw new Error("Error during authentication: " + error);
        }
    }
    
    register(...args: any) {
        throw new Error("OAuth authentication do not support registration");
    }

    resetPassword(...args: any) {
        throw new Error("OAuth authentication do not support password reseting");
    }

    recoverAccount(...args: any) {
        throw new Error("OAuth authentication do not support account recovery");
    }

}