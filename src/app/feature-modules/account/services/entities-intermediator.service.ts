import { Injectable, signal, Signal } from "@angular/core";
import { ICard } from "@core/models/entities/cards.model";
import { IGoal } from "@core/models/entities/goals.model";

@Injectable({
    providedIn: 'root'
})
export class EntitiesIntermediator{

    private activeCard: Signal<ICard[]> = signal([]);
    private activeGoal: Signal<IGoal[]> = signal([]);

    set card(card: ICard){
        this.activeCard = signal([card]);
    }

    set goal(goal: IGoal){
        this.activeGoal = signal([goal]);
    }

    get card(): ICard[]{
        return this.activeCard();
    }

    get goal(): IGoal[]{
        return this.activeGoal();
    }

}