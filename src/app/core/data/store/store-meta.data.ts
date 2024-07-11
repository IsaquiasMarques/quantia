import { IStore } from "@core/interfaces/store.model";
import { ICard } from "@core/models/entities/cards.model";
import { IPlan } from "@core/models/entities/plan.model";
import { ISetting } from "@core/models/entities/settings.model";
import { BehaviorSubject, map, take } from "rxjs";

export class StoreMeta{

    protected storeObj: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
        plan: undefined,
        settings: undefined,
        cards: []
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
}