import { inject, Injectable } from "@angular/core";
import { DataLimitsConfig } from "@core/config/data-limits.config";
import { ICard } from "@core/models/entities/cards.model";
import { IGoalAmount } from "@core/models/entities/goal-amount.model";
import { IGoal } from "@core/models/entities/goals.model";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { from, map, Observable, of, switchMap, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GoalService{

    private supabaseClient = inject(SupabaseService);

    getGoalsByCard(card_id: string): Observable<IGoal[]>{
        return from(
            this.supabaseClient.supabase.from('cardGoals').select(`
                id,
                name,
                description,
                achievement_amount,
                icon_id:icons(id,reference,display,embedded_svg),
                card_id,
                created_at,
                goalAmount(
                    id,
                    amount
                )
            `)
            .eq('card_id', card_id)
            .order('created_at', { ascending: false })
        ).pipe(
            map((incoming: any) => {
                let outcoming: IGoal[] = [];

                incoming.data.forEach((goal: any) => {

                    let goalAmount: IGoalAmount;
                    goalAmount = (goal.goalAmount) ? goal.goalAmount : { id: 'empty', amount: 0 };

                    outcoming.push({
                        id: goal.id,
                        name: goal.name,
                        description: goal.description,
                        icon: {
                            id: goal.icon_id.id,
                            reference: goal.icon_id.reference,
                            display: goal.icon_id.display,
                            embedded_svg: goal.icon_id.embedded_svg
                        },
                        achievement_amount: goal.achievement_amount,
                        goal_amount: goalAmount
                    });
                });

                return outcoming;

            })
        );
    }

    create(goal: any): Observable<any>{
        return from(
            this.supabaseClient.supabase.from('cardGoals').insert(
                {
                    name: goal.name,
                    description: goal.description,
                    achievement_amount: goal.achievement_amount,
                    card_id: goal.card_id,
                    icon_id: goal.icon_id
                }
            ).select('id').single()
        ).pipe(
            switchMap((latestGoal: any) => {
                return this.createGoalAmount(latestGoal.data.id, goal.actual_amount);
            })
        );
    }

    update(goal_id: string, goal: any): Observable<any>{
        return this.updateGoal(goal_id, goal).pipe(
            switchMap(() => {
                return this.updateGoalAmount(goal_id, goal.actual_amount);
            })
        );
    }

    private updateGoal(goal_id: string, goal: any): Observable<any>{
        return from(
            this.supabaseClient.supabase.from('cardGoals').update(
                {
                    name: goal.name,
                    description: goal.description,
                    achievement_amount: goal.achievement_amount,
                    card_id: goal.card_id,
                    icon_id: goal.icon_id
                }
            ).eq('id', goal_id)
        )
    }

    delete(goal_id: string): Observable<any>{
        return from(
            this.supabaseClient.supabase.from('cardGoals').delete().eq('id', goal_id)
        )
    }

    private createGoalAmount(goal_id: string, amount: number): Observable<any>{
        return from(
            this.supabaseClient.supabase.from('goalAmount').insert({ amount: amount, goal_id: goal_id })
        )
    }

    updateGoalAmount(goal_id: string, amount: number): Observable<any>{
        return from(
            this.supabaseClient.supabase.from('goalAmount').update({ amount: amount }).eq('goal_id', goal_id)
        );
    }

}