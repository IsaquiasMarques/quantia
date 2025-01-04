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
            this.supabase.supabase.from('cardObjectives').select('id,description,icon_id:icons(id,reference,embedded_svg)')
        ).pipe(
            map((response: any) => {
                const { data, error } = response;
                if(error){
                    console.error('Ocorreu um erro ao carregar os dados: objectives');
                    this.logService.add('Ocorreu um erro ao carregar os dados: objectives');
                    return [];
                }
                return data.flatMap((objective: any) => ({
                    id: objective.id,
                    description: objective.description,
                    icon: {
                        id: objective.icon_id.id,
                        reference: objective.icon_id.reference,
                        embedded_svg: objective.icon_id.embedded_svg
                    }
                }))
            }),
        )
    }

}