import { Injectable } from "@angular/core";
import { UserSetup } from "./user-setup.service";
import { SupabaseService } from "../../supabase/supabase.service";
import { Observable, of } from "rxjs";
import { IPlan } from "@core/models/entities/plan.model";
import { ISetting } from "@core/models/entities/settings.model";
import { ICard } from "@core/models/entities/cards.model";
import { CardService } from "../cards/card.service";
import { PlanService } from "../plans/plan.service";
import { SettingsService } from "../settings/settings.service";

@Injectable({
    providedIn: 'root'
})
export class UserService extends UserSetup{
    constructor(
        private supabase: SupabaseService,
        private cardService: CardService,
        private planService: PlanService,
        private settingsService: SettingsService,
    ){
        super();
    }

    update(){
        this.supabase.supabase.from('users');
    }

    myCards(): Observable<ICard[]>{
        return this.cardService.getCardsFromUser(this.getUser());
    }

    plan(): Observable<IPlan | undefined>{
        return this.planService.getUserPlan(this.getUser());
    }

    settings(): Observable<ISetting | undefined>{
       return this.settingsService.getUserSettings(this.getUser());
    }

}