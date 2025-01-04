import { inject, Injectable } from "@angular/core";
import { Icon } from "@core/models/icon.model";
import { IconService } from "@core/services/entities/icons/icon.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class IconFacade{

    private iconService = inject(IconService);

    get all(): Observable<Icon[]>{
        return this.iconService.all;
    }

}