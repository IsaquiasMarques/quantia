import { Plan } from "../Plan/plan.class";

export class PlanRepository{

    private static instance: PlanRepository;
    private plans: Plan[] = [];

    private constructor() { }

    public getInstance(): PlanRepository{
        if(!PlanRepository.instance){
            PlanRepository.instance = new PlanRepository();
        }
        return PlanRepository.instance;
    }

    addPlan(plan: Plan): Plan{
        this.plans.push(plan);
        return plan;
    }

    getPlanById(id: string): Plan | undefined{
        return this.plans.find(plan => plan.planId === id);
    }

}