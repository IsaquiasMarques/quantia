import { inject, Injectable } from "@angular/core";
import { FacadeExtender } from "@core/classes/facades.extender";
import { SUPABASE_RESPONSE_STATUS } from "@core/enums/supabase-response-status.enum";
import { IGoal } from "@core/models/entities/goals.model";
import { GoalService } from "@core/services/entities/goals/goal.service";
import { catchError, map, Observable, of, switchMap, take, tap, throwError } from "rxjs";

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

    getGoalsByCardIdFromService(card_id: string): Observable<IGoal[]>{
        return this.goalService.getGoalsByCard(card_id);
    }

    create(goal: any): Observable<any>{
        return this.getGoals.pipe(
            take(1),
            map(existingGoals => {
                if(existingGoals[goal.card_id].length >= this.userService.getUser()!.plan!.limits.goalsPerCard){
                    throw new Error("O limite de metas para este cartão foi atingido.");
                }
                return existingGoals[goal.card_id];
            }),
            switchMap(() => {
                return this.goalService.create(goal);
            }),
            tap(response => {
                if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_WITH_DATA){
                    this.actions.getCards();
                    this.actions.getGoalsByCardId(goal.card_id);
                }
                return response;
            }),
            catchError(error => throwError(() => error))
        );
    }

    update(goal_id: string, goal: any): Observable<any>{
        return this.goalService.update(goal_id, goal).pipe(
            tap((response) => {
                if(response.status == SUPABASE_RESPONSE_STATUS.SUCCESS_EMPTY){
                    this.actions.getCards();
                    this.actions.getGoalsByCardId(goal.card_id);
                }
                return response
            }),
            catchError(error => throwError(() => error))
        );
    }

    updateGoalAmount(goal_id: string, amount: number): Observable<any>{
        return this.goalService.updateGoalAmount(goal_id, amount);
    }

    delete(goal_id: string, card_id: string): Observable<any>{
        return this.goalService.delete(goal_id).pipe(
            tap(response => {
                if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_EMPTY){
                    this.actions.getCards();
                    this.actions.getGoalsByCardId(card_id);
                }
                return response;
            })
        );
    }
}