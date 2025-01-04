import { inject, Injectable } from "@angular/core";
import { Plan } from "@core/classes/entities/Plan/plan.class";
import { User } from "@core/classes/entities/User/user.class";
import { SECRET_COFING } from "@core/config/secret.config";
import { IPlan } from "@core/models/entities/plan.model";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { catchError, from, map, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PlanService{

    private supabase = inject(SupabaseService);

    getUserPlan(user: User | null): Observable<IPlan | null>{
        return from(
            this.supabase.supabase.from('users')
            .select('plan_id:plans(*)')
            .single()
        ).pipe(
            map((response: any) => {
                    let data = response.data;
                    let plan: IPlan;

                    if(data === null){
                        do{
                            this.supabase.supabase.from('users')
                                .insert({ id: user?.id, plan_id: SECRET_COFING.defaultPlan.id })
                                .select()
                                .then((response) => {
                                    if(response.error){
                                        // console.error("Error during inserting relation between user and plan if data is null: " + response.error.message);
                                        throw new Error("Error during inserting relation between user and plan if data is null: " + response.error.message)
                                    }
                                })
                                break;
                        } while (user !== null)

                        plan = new Plan(SECRET_COFING.defaultPlan).get();

                    } else {
                        let planData = data.plan_id as any;
                        plan = new Plan({
                            id: planData.id,
                            name: planData.name,
                            limits: {
                                cards: planData.cardsLimit,
                                goalsPerCard: planData.goalsLimitByCard
                            }
                        }).get();
                    }    
                    return plan;
            }),
            catchError(error => throwError(() => error))
        )
    }

}