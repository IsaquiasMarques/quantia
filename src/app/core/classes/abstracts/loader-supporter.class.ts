import { Directive, Input, computed, inject } from "@angular/core";
import { LoaderActionEnum } from "@core/enums/loader/loader.enum";
import { Loader } from "@core/services/loader/loader.service";

@Directive()
export abstract class LoaderSupporter{
    protected loader = inject(Loader);
    @Input() loaderActionEnum!: LoaderActionEnum;
    loader$ = computed(() => {
        const state = this.loader.getState(this.loaderActionEnum)
        return (state) ? state() : false;
    });
}