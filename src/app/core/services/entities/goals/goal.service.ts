import { inject, Injectable } from "@angular/core";
import { DataLimitsConfig } from "@core/config/data-limits.config";
import { ICard } from "@core/models/entities/cards.model";
import { IGoalAmount } from "@core/models/entities/goal-amount.model";
import { IGoal } from "@core/models/entities/goals.model";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { from, map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GoalService{

    private supabaseClient = inject(SupabaseService);

    getGoals(): Observable<IGoal[]>{
        return from([]);
    }

    getGoalsByCard(card_id: string): Observable<IGoal[]>{
        return from(
            this.supabaseClient.supabase.from('cardGoals').select(`
                id,
                name,
                description,
                achievement_amount,
                goal_icon,
                card_id,
                goalAmount(
                    id,
                    amount
                )
            `).eq('card_id', card_id)
        ).pipe(
            map((incoming: any) => {
                let outcoming: IGoal[] = [];

                incoming.data.forEach((goal: any) => {

                    let goalAmount: IGoalAmount;
                    goalAmount = (goal.goalAmount.length > 0) ? goal.goalAmount[0] : { id: 'empty', amount: 0 };

                    outcoming.push({
                        id: goal.id,
                        name: goal.name,
                        description: goal.description,
                        iconRef: goal.goal_icon,
                        achievement_amount: goal.achievement_amount,
                        goal_amount: goalAmount
                    });
                });

                return outcoming;

            })
        );
    }

}