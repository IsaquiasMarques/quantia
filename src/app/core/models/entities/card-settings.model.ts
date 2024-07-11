import { ICurrency } from "./currencies.model";

export interface ICardSettings{
    id: string,
    highlightColor: string,
    currency: ICurrency
}