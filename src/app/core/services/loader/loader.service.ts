import { Injectable, Signal, WritableSignal, computed, signal } from "@angular/core";
import { LoaderActionEnum } from "@core/enums/loader/loader.enum";

interface ILoader{
    action: LoaderActionEnum,
    loading: WritableSignal<boolean>
}

@Injectable({
    providedIn: 'root'
})
export class Loader{
    private loaders: ILoader[] = [
        {
            action: LoaderActionEnum.USER_AUTHENTICATION,
            loading: signal(false)
        },
        {
            action: LoaderActionEnum.GETTING_USER_DATA,
            loading: signal(false)
        },
        {
            action: LoaderActionEnum.SETTINGS,
            loading: signal(false)
        },
        {
            action: LoaderActionEnum.PLAN,
            loading: signal(false)
        },
        {
            action: LoaderActionEnum.CARDS,
            loading: signal(false)
        },
        {
            action: LoaderActionEnum.CREATE_CARD,
            loading: signal(false)
        },
        {
            action: LoaderActionEnum.GOALS,
            loading: signal(false)
        },
        {
            action: LoaderActionEnum.TRANSACTIONS,
            loading: signal(false)
        }
    ];

    changeState(action: LoaderActionEnum, state: boolean): void{
        const theLoader = this.loaders.find(loader => loader.action === action);
        theLoader?.loading.update(loaderState => loaderState = state);
    }

    getState(action: LoaderActionEnum): Signal<boolean>{
        const theLoader = this.loaders.find(loader => loader.action === action)!;
        return theLoader.loading;
    }

    changeStateAfterFirstResponseIsEmpty(action: LoaderActionEnum, state: boolean, timeOutInSeconds: number = 3){
        setTimeout(() => {
            this.changeState(action, state);
        }, timeOutInSeconds * 1000)
    }

}