import { inject, Injectable } from "@angular/core";
import { ICardObjective } from "@core/models/entities/card-objective.model";
import { ObjectiveService } from "@core/services/entities/objectives/objective.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ObjectiveFacade{
    private objectiveService = inject(ObjectiveService);

    getObjectives(): Observable<ICardObjective[]>{
        return this.objectiveService.all;
    }
}