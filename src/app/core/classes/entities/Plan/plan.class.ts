import { IPlan } from "@core/models/entities/plan.model";

export class Plan{
    private plan: IPlan;

    constructor(
        plan: IPlan
    ) {
        this.plan = plan;
    }

    get(): IPlan{
        return this.plan;
    }

}