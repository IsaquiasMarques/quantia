import { inject, Injectable } from "@angular/core";
import { ICardObjective } from "@core/models/entities/card-objective.model";
import { PopupLogService } from "@core/services/loggers/pop-up-log.service";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { from, map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ObjectiveService{
    
    private supabase = inject(SupabaseService);
    private logService = inject(PopupLogService);

    get all(): Observable<ICardObjective[]>{
        return from(
            this.supabase.supabase.from('cardObjectives').select('id,description')
        ).pipe(
            map(response => {
                const { data, error } = response;
                if(error){
                    console.error('Ocorreu um erro ao carregar os dados: objectives');
                    this.logService.add('Ocorreu um erro ao carregar os dados: objectives');
                    return [];
                }
                return data.flatMap(objective => ({ id: objective.id, description: objective.description }))
            })
        )
    }

}