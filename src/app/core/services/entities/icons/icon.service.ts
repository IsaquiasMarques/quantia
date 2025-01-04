import { inject, Injectable } from "@angular/core";
import { Icon } from "@core/models/icon.model";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { from, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class IconService{
    private supabaseClient = inject(SupabaseService);

    get all(): Observable<Icon[]>{
        return from(
            this.supabaseClient.supabase.from('icons').select('id,reference,display,embedded_svg')
        ).pipe(
            map(incoming => {
                if(incoming.error){
                    throw new Error("error fetching icons");
                }

                return incoming.data.flatMap((icon: any) => ({
                    id: icon.id,
                    reference: icon.reference,
                    display: icon.display,
                    embedded_svg: icon.embedded_svg
                }))
            })
        );
    }
}