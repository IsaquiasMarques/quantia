export interface IPlan{
    id: string,
    name: string,
    limits: {
        cards: number,
        goalsPerCard: number
    }
}