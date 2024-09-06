import { Injectable } from "@angular/core";
import { IAuthentication } from "@core/interfaces/authentication/IAuthentication";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { Provider, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OAuthStrategy implements IAuthentication{

    constructor(private supabaseService: SupabaseService){}

    async login(provider: Provider, origin: 'login' | 'register') {
        try {
            const { data, error } = await this.supabaseService.supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: (origin === 'login') ? environment.domain + '/auth/sign-in' : environment.domain + '/auth/sign-up'
                }
            });

            if(error){
                console.error(error);
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