import { Injectable } from "@angular/core";
import { IAuthentication } from "@core/interfaces/authentication/IAuthentication";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { Provider, SupabaseClient } from "@supabase/supabase-js";

@Injectable({
    providedIn: 'root'
})
export class OAuthStrategy implements IAuthentication{

    constructor(private supabaseService: SupabaseService){}

    async login(provider: Provider) {
        try {
            
            const { data, error } = await this.supabaseService.supabase.auth.signInWithOAuth({ provider });
            if(error){
                
            }

        } catch (error) {
            throw new Error("Error during authentication: " + error);
        }
    }

    register(...args: any) {
        throw new Error("OAuth authentication do not support registration");
    }

    recoverAccount(...args: any) {
        throw new Error("OAuth authentication do not support account recovery");
    }

    resetPassword(...args: any) {
        throw new Error("OAuth authentication do not support password reseting");
    }

}