import { inject, Injectable } from "@angular/core";
import { FacadeExtender } from "@core/classes/facades.extender";
import { TransactionService } from "@core/services/entities/transactions/transaction.service";
import { catchError, forkJoin, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { GoalFacade } from "./goal.facade";
import { SUPABASE_RESPONSE_STATUS } from "@core/enums/supabase-response-status.enum";
import { IGoal } from "@core/models/entities/goals.model";
import { ICard } from "@core/models/entities/cards.model";

@Injectable({
    providedIn: 'root'
})
export class TransactionFacade extends FacadeExtender{

    private transactionService = inject(TransactionService);
    private goalFacade = inject(GoalFacade);

    get getTransactions(): Observable<any>{
        return this.dataByKey('transactions');
    }

    create(transaction: any, target_goals: IGoal[], targetCards: ICard[]): Observable<any>{
        return this.transactionService.create(transaction).pipe(
            map(response => {
                return {
                    supabase_response: response,
                    origin_goal: (transaction.origin_goal_id) ? target_goals.filter(it => it.id === transaction.origin_goal_id) : [],
                    destination_goal: (transaction.destination_goal_id) ? target_goals.filter(it => it.id === transaction.destination_goal_id) : []
                }
            }),
            map(response => {
                if(response.supabase_response.error){
                    throw new Error("Não foi possível registrar esta transação");
                }
                return response;
            }),
            switchMap(response => {

                const updates: Observable<any>[] = [];

                if(response.supabase_response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_WITH_DATA){
                    if(response.origin_goal.length > 0){
                        const currentAmount = Number(response.origin_goal[0].goal_amount.amount);
                        const transactionAmount = Number(transaction.amount);
                        const updatedAmount = currentAmount - transactionAmount;
                        updates.push(this.goalFacade.updateGoalAmount(transaction.origin_goal_id, updatedAmount));
                    }

                    if(response.destination_goal.length > 0){
                        const currentAmount = Number(response.destination_goal[0].goal_amount.amount);
                        const transactionAmount = Number(transaction.amount);
                        const updatedAmount = currentAmount + transactionAmount;
                        updates.push(this.goalFacade.updateGoalAmount(transaction.destination_goal_id, updatedAmount));
                    }
                }
                return updates.length > 0 ? forkJoin(updates).pipe(map(() => response.supabase_response)) : of(response.supabase_response);
            }),
            tap(() => {
                this.actions.getCards();
                if(transaction.origin_goal_id){
                    this.actions.getGoalsByCardId(targetCards[0].id);
                    this.actions.getTransactionsByGoalId(transaction.origin_goal_id, 1);

                    this.actions.getGoalsByCardId(targetCards[0].id);
                }
                if(transaction.destination_goal_id){
                    this.actions.getGoalsByCardId(targetCards[0].id);
                    this.actions.getTransactionsByGoalId(transaction.destination_goal_id, 1);
                    if(transaction.origin_goal_id){
                        this.actions.getGoalsByCardId(targetCards[1].id); // se tem origem significa que o index do cartão de destino é 1
                    } else {
                        this.actions.getGoalsByCardId(targetCards[0].id); // se não tiver origem significa que o index do cartão de destino é 0
                    }
                }

            }),
            catchError(error => throwError(() => error))
        );
    }
}