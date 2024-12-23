import { inject, Injectable } from "@angular/core";
import { User } from "@core/classes/entities/User/user.class";
import { SECRET_COFING } from "@core/config/secret.config";
import { ISetting } from "@core/models/entities/settings.model";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { from, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SettingsService{

    private supabase = inject(SupabaseService);

    getUserSettings(user: User | null): Observable<ISetting | null>{
        return from(
            this.supabase.supabase.from('settings')
                .select("*")
                .eq("user_id", user?.id)
                .single()
        ).pipe(
            map((response: any) => {

                let data = response.data;
                let settings: ISetting;

                if(data === null){
                    // this.supabase.supabase.from('settings')
                    // .insert({
                    //     language: SECRET_COFING.defaultSettings.language,
                    //     theme: SECRET_COFING.defaultSettings.theme,
                    //     userToken: SECRET_COFING.defaultSettings.token,
                    //     user_id: user?.id
                    // })
                    // .select()
                    // .then((response) => {
                    //     if(response.error){
                    //         console.error("Error during inserting settings if data is null: " + response.error.message);
                    //     }
                    // })
                    settings = SECRET_COFING.defaultSettings;

                } else {
                    settings = {
                        language: data.language,
                        theme: data.theme,
                        token: data.token ?? null
                    }
                }

                return settings;

            })
        );
    }

}