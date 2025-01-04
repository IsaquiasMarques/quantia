import { IconEnum } from "@core/enums/icon.enum";
import { IGoalAmount } from "./goal-amount.model";
import { Icon } from "../icon.model";

export interface IGoal{
    id: string,
    name: string,
    description: string,
    achievement_amount: number,
    icon: Icon,
    goal_amount: IGoalAmount
}