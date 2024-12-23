import { IconEnum } from "@core/enums/icon.enum"
import { ICardObjective } from "./card-objective.model"
import { ICardSettings } from "./card-settings.model"

export interface ICard{
    id: string,
    name: string,
    objective: ICardObjective,
    settings: ICardSettings,
    iconRef: IconEnum,
    amount: number
}