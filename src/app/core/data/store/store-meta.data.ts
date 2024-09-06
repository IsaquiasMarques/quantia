import { IStore } from "@core/interfaces/store.model";
import { ICard } from "@core/models/entities/cards.model";
import { IGoal } from "@core/models/entities/goals.model";
import { IPlan } from "@core/models/entities/plan.model";
import { ISetting } from "@core/models/entities/settings.model";
import { ITransaction } from "@core/models/entities/transaction.model";
import { BehaviorSubject, map, take, tap } from "rxjs";

export class StoreMeta{

    protected storeObj: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
        plan: undefined,
        settings: undefined,
        cards: [],
        goals: { 'empty': [] },
        transactions: {
            0: {
                'empty': []
            }
        }
    });

    storePlanMeta(plan: IPlan | undefined): void{
        this.storeObj.pipe(
            take(1),
            map(data => {
                data.plan = plan;
                return data;
            }),
        ).subscribe((updated) => this.storeObj.next(updated))
    }

    storeSettingsMeta(setting: ISetting | undefined): void{
        this.storeObj.pipe(
            take(1),
            map(data => {
                data.settings = setting;
                return data;
            }),
        ).subscribe(updated => this.storeObj.next(updated));
    }

    storeCardsMeta(cards: ICard[]): void{
        this.storeObj.pipe(
            take(1),
            map(data => {
                data.cards = cards
                return data;
            })
        ).subscribe(updated => this.storeObj.next(updated))
    }

    storeGoalsMeta(card_id: string, goals: IGoal[]): void{
        this.storeObj.pipe(
            take(1),
            map(data => {
                return {
                    ...data,
                    goals: {
                        ...data.goals,
                        [card_id]: goals
                    }
                }
            })
        ).subscribe(updated => this.storeObj.next(updated));
    }

    storeTransactionsMeta(page: number, goal_id: string, transactions: ITransaction[]): void{
        this.storeObj.pipe(
            take(1),
            map(data => {
                return {
                    ...data,
                    transactions: {
                        ...data.transactions,
                        [page]: {
                            ...data.transactions[page],
                            [goal_id]: transactions
                        }
                    }
                }
            })
        ).subscribe(updated => this.storeObj.next(updated));
    }
}