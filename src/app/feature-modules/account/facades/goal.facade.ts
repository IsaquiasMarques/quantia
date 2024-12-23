import { Injectable } from "@angular/core";
import { FacadeExtender } from "@core/classes/facades.extender";
import { IGoal } from "@core/models/entities/goals.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GoalFacade extends FacadeExtender{
    get getGoals(): Observable<any>{
        return this.dataByKey('goals');
    }
}