import { inject, Injectable } from "@angular/core";
import { Store } from "../store/store.data";
import { UserService } from "@core/services/entities/user/user.service";
import { take } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class Actions{

    private store = inject(Store);
    private userService = inject(UserService);

    getPlan(): void{
        this.userService.plan().pipe(take(1)).subscribe(incoming => this.store.storePlanMeta(incoming));
    }

    getSettings(): void{
        this.userService.settings().pipe(take(1)).subscribe(incoming => this.store.storeSettingsMeta(incoming));
    }

    getCards(): void{
        this.userService.myCards().pipe(take(1)).subscribe(incoming => this.store.storeCardsMeta(incoming));
    }
}