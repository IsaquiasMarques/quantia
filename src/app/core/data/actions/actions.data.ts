import { inject, Injectable } from "@angular/core";
import { Store } from "../store/store.data";
import { UserService } from "@core/services/entities/user/user.service";
import { take } from "rxjs";
import { GoalService } from "@core/services/entities/goals/goal.service";
import { TransactionService } from "@core/services/entities/transactions/transaction.service";
import { LogStatus, PopupLogService } from "@core/services/loggers/pop-up-log.service";

@Injectable({
    providedIn: 'root'
})
export class Actions{

    private store = inject(Store);
    private userService = inject(UserService);
    private goalService = inject(GoalService);
    private transactionService = inject(TransactionService);
    private loggerService = inject(PopupLogService);

    getPlan(): void{
        this.userService.planAsObservable().pipe(take(1)).subscribe({
            next: incoming => this.store.storePlanMeta(incoming),
            error: error => this.loggerService.add(error, LogStatus.ERROR)
        });
    }

    getSettings(): void{
        this.userService.settingsAsObservable().pipe(take(1)).subscribe({
            next: incoming => this.store.storeSettingsMeta(incoming),
            error: error => this.loggerService.add(error, LogStatus.ERROR)
        });
    }

    getCards(): void{
        this.userService.myCards().pipe(take(1)).subscribe({
            next: incoming => this.store.storeCardsMeta(incoming),
            error: error => this.loggerService.add(error, LogStatus.ERROR)
        });
    }

    getGoalsByCardId(card_id: string): void{
        this.goalService.getGoalsByCard(card_id).pipe(take(1)).subscribe({
            next: incoming => this.store.storeGoalsMeta(card_id, incoming),
            error: error => this.loggerService.add(error, LogStatus.ERROR)
        });
    }

    getTransactionsByGoalId(goal_id: string, current_page: number): void{
        this.transactionService.getByGoal(goal_id, current_page).pipe(take(1)).subscribe({
            next: incoming => this.store.storeTransactionsMeta(current_page, goal_id, incoming),
            error: error => this.loggerService.add(error, LogStatus.ERROR)
        });
    }

}