import { Directive, computed, inject } from "@angular/core";
import { LoaderActionEnum } from "@core/enums/loader/loader.enum";
import { Loader } from "@core/services/loader/loader.service";

@Directive()
export abstract class LoaderSupporter{
    private loaderService = inject(Loader);
    loaderActionEnum!: LoaderActionEnum;
    loader$ = computed(() => {
        const state = this.loaderService.getState(this.loaderActionEnum)
        if(state){
            return state();
        }else{
            return false;
        }
    });
}