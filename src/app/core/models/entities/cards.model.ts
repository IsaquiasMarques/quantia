import { IconEnum } from "@core/enums/icon.enum"
import { ICardObjective } from "./card-objective.model"
import { ICardSettings } from "./card-settings.model"
import { Icon } from "../icon.model"

export interface ICard{
    id: string,
    name: string,
    objective: ICardObjective,
    settings: ICardSettings,
    amount: number
}