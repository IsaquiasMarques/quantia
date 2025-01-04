import { IPlan } from "@core/models/entities/plan.model";
import { ISetting } from "@core/models/entities/settings.model";

export class SECRET_COFING{
    static defaultPlan: IPlan = {
        id: '833ad753-9150-4ce4-bfdd-64b27edae54d',
        name: 'Basic',
        limits: {
            cards: 2,
            goalsPerCard: 5
        }
    }

    static defaultSettings: ISetting = {
        language: "pt",
        theme: "light",
        token: null
    }
}