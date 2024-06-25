export class Plan{
    private id: string;
    private name: string;
    private goalsLimit: number;
    private cardsLimit: number;

    constructor(
        id: string,
        name: string,
        goalsLimit: number,
        cardsLimit: number
    ) {
        this.id = id;
        this.name = name;
        this.goalsLimit = goalsLimit;
        this.cardsLimit = cardsLimit;
    }

    get planId(): string{
        return this.id;
    }

    get planName(): string{
        return this.name;
    }

    get limits(): { goals: number, cards: number }{
        return {
            goals: this.goalsLimit,
            cards: this.cardsLimit
        }
    }

}