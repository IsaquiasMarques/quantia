import { inject, Injectable } from "@angular/core";
import { FacadeExtender } from "@core/classes/facades.extender";
import { IGoal } from "@core/models/entities/goals.model";
import { GoalService } from "@core/services/entities/goals/goal.service";
import { catchError, map, Observable, switchMap, take, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GoalFacade extends FacadeExtender{

    private goalService = inject(GoalService);

    get getGoals(): Observable<any>{
        return this.dataByKey('goals');
    }

    getGoalsByCard(card_id: string): Observable<IGoal[]>{
        return this.getGoals.pipe(
            map(incoming => incoming[card_id])
        );
    }

    create(goal: any): Observable<any>{
        return this.getGoals.pipe(
            take(1),
            map(existingGoals => {
                if(existingGoals[goal.card_id].length >= this.userService.getUser()!.plan!.limits.goalsPerCard){
                    throw new Error("Limite de cartões atingido para o plano seu actual");
                }
                return existingGoals[goal.card_id];
            }),
            switchMap(() => {
                return this.goalService.create(goal);
            }),
            tap(response => {
                if(response.status === 201){
                    this.actions.getGoalsByCardId(goal.card_id)
                }
                return response;
            }),
            catchError(error => throwError(() => error))
        );
    }
}