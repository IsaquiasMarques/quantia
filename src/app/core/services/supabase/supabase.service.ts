import { Injectable } from "@angular/core";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SupabaseService{

    private supabaseClient: SupabaseClient;
    
    constructor(){
        this.supabaseClient = createClient(
            environment.supabaseUrl,
            environment.supabaseKey
        );
    }

    get supabase(): SupabaseClient{
        return this.supabaseClient;
    }
}