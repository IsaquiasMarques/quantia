import { Directive, computed, inject } from "@angular/core";
import { LoaderActionEnum } from "@core/enums/loader/loader.enum";
import { Loader } from "@core/services/loader/loader.service";

@Directive()
export abstract class AuthenticationLoader{
    loaderService = inject(Loader);
    authLoader$ = computed(() => {
        const state = this.loaderService.getState(LoaderActionEnum.USER_AUTHENTICATION)
        if(state){
        return state();
        }else{
        return false;
        }
    });
}