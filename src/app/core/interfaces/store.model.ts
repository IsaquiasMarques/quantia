import { ICard } from "@core/models/entities/cards.model"
import { IGoal } from "@core/models/entities/goals.model"
import { IPlan } from "@core/models/entities/plan.model"
import { ISetting } from "@core/models/entities/settings.model"
import { ITransaction } from "@core/models/entities/transaction.model"

export interface IStore{
    plan: IPlan | undefined,
    settings: ISetting | undefined
    cards: ICard[],
    goals: { [card_id: string]: IGoal[] },
    // transactions: {
    //     [pageNumber: number]: {
    //         [goal_id: string]: ITransaction[]
    //     }
    // },
}