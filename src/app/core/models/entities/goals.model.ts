import { IGoalAmount } from "./goal-amount.model";

export interface IGoal{
    id: string,
    name: string,
    description: string,
    achievement_amount: number,
    goal_amount: IGoalAmount
}