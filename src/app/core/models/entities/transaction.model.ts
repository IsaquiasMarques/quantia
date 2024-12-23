import { TransactionOriginType } from "@core/enums/entities/transaction-origin-type.enum";
import { TransationType } from "@core/enums/entities/transation-type.enum";
import { IGoal } from "./goals.model";

export interface ITransaction{
    id: string,
    type: TransationType,
    amount: number,
    from: TransactionOriginType,
    originGoalId: string,
    destinationGoalId: string,
    created_at: string,
    description: string,
    notes: string
}