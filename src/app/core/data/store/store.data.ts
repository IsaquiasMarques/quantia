import { Injectable } from "@angular/core";
import { SECRET_COFING } from "@core/config/secret.config";
import { IStore } from "@core/interfaces/store.model";
import { IPlan } from "@core/models/entities/plan.model";
import { BehaviorSubject, map, Observable, take, tap } from "rxjs";
import { StoreMeta } from "./store-meta.data";

@Injectable({
    providedIn: 'root'
})
export class Store extends StoreMeta{

    get(): Observable<IStore>{
        return this.storeObj.asObservable();
    }

    set(object: IStore): void{
        this.storeObj.next(object);
    }

}