import { inject, Injectable } from "@angular/core";
import { Store } from "../store/store.data";
import { UserService } from "@core/services/entities/user/user.service";
import { take, tap } from "rxjs";
import { IGoal } from "@core/models/entities/goals.model";
import { GoalService } from "@core/services/entities/goals/goal.service";

@Injectable({
    providedIn: 'root'
})
export class Actions{

    private store = inject(Store);
    private userService = inject(UserService);
    private goalService = inject(GoalService);

    getPlan(): void{
        this.userService.plan().pipe(take(1)).subscribe(incoming => this.store.storePlanMeta(incoming));
    }

    getSettings(): void{
        this.userService.settings().pipe(take(1)).subscribe(incoming => this.store.storeSettingsMeta(incoming));
    }

    getCards(): void{
        this.userService.myCards().pipe(take(1)).subscribe(incoming => this.store.storeCardsMeta(incoming));
    }

    getGoalsByCardId(card_id: string): void{
        this.goalService.getGoalsByCard(card_id).pipe(take(1)).subscribe(incoming => this.store.storeGoalsMeta(card_id, incoming));
    }

}