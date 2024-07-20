import { inject, Injectable } from "@angular/core";
import { ICard } from "@core/models/entities/cards.model";
import { IGoal } from "@core/models/entities/goals.model";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GoalService{

    private supabaseClient = inject(SupabaseService);

    getGoals(): Observable<IGoal[]>{
        return from([]);
    }

    // getGoalsByCard(card_id: string): 

}