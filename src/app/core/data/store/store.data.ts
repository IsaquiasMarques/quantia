import { Injectable } from "@angular/core";
import { IStore } from "@core/interfaces/store.model";
import { map, Observable } from "rxjs";
import { StoreMeta } from "./store-meta.data";

@Injectable({
    providedIn: 'root'
})
export class Store extends StoreMeta{

    get(): Observable<IStore>{
        return this.storeObj.asObservable();
    }

    getByKey(key: keyof(IStore)): Observable<any>{
        return this.storeObj.pipe(
            map(incoming => {
                return incoming[key];
            })
        );
    }

    set(object: IStore): void{
        this.storeObj.next(object);
    }

}