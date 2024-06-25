import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Store{

    private storeObj = {

        profile: {
            user: {
                first_name: '',
                last_name: '',
                plan: '',
                settings: {
                    language: '',
                    theme: '',
                }
            }
        },
        cards: {
            
        }

    }

}