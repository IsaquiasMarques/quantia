import { Injectable } from "@angular/core";
import { UserSetup } from "./user-setup.service";
import { SupabaseService } from "../../supabase/supabase.service";
import { Plan } from "@core/classes/entities/Plan/plan.class";
import { from, map, Observable, of, tap } from "rxjs";
import { SECRET_COFING } from "@core/config/secret.config";
import { IPlan } from "@core/models/entities/plan.model";
import { ISetting } from "@core/models/entities/settings.model";
import { LogStatus, PopupLogService } from "@core/services/loggers/pop-up-log.service";
import { ICard } from "@core/models/entities/cards.model";
import { ICardObjective } from "@core/models/entities/card-objective.model";
import { ICardSettings } from "@core/models/entities/card-settings.model";

@Injectable({
    providedIn: 'root'
})
export class UserService extends UserSetup{
    constructor(
        private supabase: SupabaseService,
        private popup: PopupLogService
    ){
        super();
    }

    update(){
        this.supabase.supabase.from('users');
    }

    myCards(): Observable<ICard[]>{
        return from(
            this.supabase.supabase.from('users').select('cards(id,name, objective_id:cardObjectives(*), cardSettings(id,highlightColor, currency_id:currencies(id,name,description)))').single()
        ).pipe(
            map(response => {
                let data = response.data;
                let cards: ICard[] = [];

                if(data !== null){
                    if(data.cards){
                        data.cards.forEach((card: any) => {
    
                            let cardObjective: ICardObjective;
                            cardObjective = {
                                id: card.objective_id.id,
                                description: card.objective_id.description
                            }
    
                            let cardSettings: ICardSettings;
                            cardSettings = {
                                id: card.cardSettings[0].id,
                                highlightColor: card.cardSettings[0].highlightColor,
                                currency: {
                                    id: card.cardSettings[0].currency_id.id,
                                    name: card.cardSettings[0].currency_id.name,
                                    description: card.cardSettings[0].currency_id.description
                                }
                            }
    
                            cards.push({
                                id: card.id,
                                name: card.name,
                                objective: cardObjective,
                                settings: cardSettings,
                                goals: []
                            });
    
                        });
                    }
                }
                return cards;
            })
        );
    }

    plan(): Observable<IPlan | undefined>{
        return from(
            this.supabase.supabase.from('users')
            .select('plan_id:plans(*)')
            .single()
        ).pipe(
            map((response: any) => {
                    let data = response.data;
                    let plan: IPlan;

                    if(data === null){
                        do{
                            // console.log("deve adicionar", this.getUser()?.id)
                            this.supabase.supabase.from('users')
                                .insert({ id: this.getUser()?.id, plan_id: SECRET_COFING.defaultPlan.id })
                                .select()
                                .then((response) => {
                                    if(response.error){
                                        console.error("Error during inserting relation between user and plan if data is null: " + response.error.message);
                                    }
                                })
                                break;
                        } while (this.getUser() !== null)

                        plan = new Plan(SECRET_COFING.defaultPlan).get();

                    } else {
                        // console.log("já existe, então ignora");
                        let planData = data.plan_id as any;
                        plan = new Plan({
                            id: planData.id,
                            name: planData.name,
                            limits: {
                                cards: planData.cardsLimit,
                                goals: planData.goalsLimit
                            }
                        }).get();
                    }    
                    return plan;
            })
        )
    }

    settings(): Observable<ISetting | undefined>{
        return from(
            this.supabase.supabase.from('settings')
                .select("*")
                .eq("user_id", this.getUser()?.id)
                .single()
        ).pipe(
            map((response: any) => {

                let data = response.data;
                let settings: ISetting;

                if(data === null){

                    do{
                        this.supabase.supabase.from('settings')
                            .insert({ language: SECRET_COFING.defaultSettings.language, theme: SECRET_COFING.defaultSettings.theme, userToken: SECRET_COFING.defaultSettings.token, user_id: this.getUser()?.id })
                            .select()
                            .then((response) => {
                                if(response.error){
                                    console.error("Error during inserting settings if data is null: " + response.error.message);
                                }
                            })
                        break;

                    } while(this.getUser() !== null);
                    
                    settings = SECRET_COFING.defaultSettings;

                } else {

                    settings = {
                        language: data.language,
                        theme: data.theme,
                        token: data.token ?? null
                    }

                }

                return settings;

            })
        );
    }

}