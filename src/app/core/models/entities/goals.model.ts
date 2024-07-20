import { IconEnum } from "@core/enums/icon.enum";
import { IGoalAmount } from "./goal-amount.model";

export interface IGoal{
    id: string,
    name: string,
    description: string,
    achievement_amount: number,
    iconRef: IconEnum,
    goal_amount: IGoalAmount
}