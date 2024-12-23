import { inject, Injectable } from "@angular/core";
import { ICurrency } from "@core/models/entities/currencies.model";
import { PopupLogService } from "@core/services/loggers/pop-up-log.service";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { from, map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService{

    private supabase = inject(SupabaseService);
    private logService = inject(PopupLogService);
    
    get all(): Observable<ICurrency[]>{
        return from(
            this.supabase.supabase.from('currencies').select('id,name,description')
        ).pipe(
            map(response => {
                const { data, error } = response;
                if(error){
                    console.error("Ocorreu um erro ao carregar os dados: currencies");
                    this.logService.add("Ocorreu um erro ao carregar os dados: currencies");
                    return [];
                }
                return data.flatMap(currency => ({ id: currency.id, name: currency.name, description: currency.description }));
            })
        )
    }

}