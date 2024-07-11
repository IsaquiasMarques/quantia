import { ICard } from "@core/models/entities/cards.model"
import { IPlan } from "@core/models/entities/plan.model"
import { ISetting } from "@core/models/entities/settings.model"

export interface IStore{
    plan: IPlan | undefined,
    settings: ISetting | undefined
    cards: ICard[]
}