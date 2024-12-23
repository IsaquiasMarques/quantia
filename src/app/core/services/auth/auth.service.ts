import { Injectable, inject, signal } from "@angular/core";
import { AuthenticationContext } from "@core/strategies/authentication/authentication.context";
import { SupabaseService } from "../supabase/supabase.service";
import { User } from "@core/classes/entities/User/user.class";
import { UserService } from "../entities/user/user.service";
import { Router } from "@angular/router";
import { LogStatus, PopupLogService } from "../loggers/pop-up-log.service";
import { AuthChangeEvent, Provider, Session, SupabaseClient, isAuthApiError } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { forkJoin, Observable, take } from "rxjs";
import { translateErrorMessage } from "@core/constants/errors/message-translator";
import { Loader } from "../loader/loader.service";
import { LoaderActionEnum } from "@core/enums/loader/loader.enum";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends AuthenticationContext{

    private authChangeEvent!: AuthChangeEvent;
    resettinPassword = signal(false);
    private loggerService = inject(PopupLogService);
    private loaderService = inject(Loader);

    constructor(
        private supabaseService: SupabaseService,
        private userService: UserService,
        private router: Router,
        private popupLogService: PopupLogService
    ){
        super();
        this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
            // console.log(event, session);
            switch(event){
                case 'INITIAL_SESSION':
                    // if(!session || session?.user.app_metadata.provider === undefined || session?.user.app_metadata['providers'][1] === undefined) return;
                    // this.identityUnlink(session?.user.app_metadata['providers'][1]);
                    break;

                case 'TOKEN_REFRESHED':
                    break;

                case 'USER_UPDATED':
                    break;
                    
                case 'SIGNED_IN':
                    this.authChangeEvent = event;
                    if(!session){
                        this.popupLogService.add('Erro de autenticação: Sessão inválida');
                        break;
                    }

                    this.setUserFromSessionAndNavigate(session, 'normal');
                    break;
                    
                case 'SIGNED_OUT':
                    this.userService.clearUser();
                    this.router.navigate(['/auth']);
                    break;

                case 'PASSWORD_RECOVERY':
                    if(!session){
                        this.popupLogService.add('Erro de autenticação: Sessão inválida');
                        break;
                    }

                    this.setUserFromSessionAndNavigate(session, 'recovery');
                    break;
            }
        });
    }

    private setUserFromSessionAndNavigate(session: Session, authType: 'normal' | 'recovery'){
        this.loaderService.changeState(LoaderActionEnum.GETTING_USER_DATA, true);
        forkJoin(
            [
                this.userService.planAsObservable().pipe(take(1)),
                this.userService.settingsAsObservable().pipe(take(1))
            ]
        ).subscribe({
            next: ([plan, settings]) => {

                let user: User = new User(
                    {
                        id: session.user.id,
                        fullname: session.user.user_metadata['full_name'],
                        avatar: session.user.user_metadata['avatar_url'],
                        email: session.user.email!,
                        token: session.access_token,
                        expiresIn: session.expires_in,
                        expiresAt: session.expires_at,
                        authType: authType
                    },
                    plan,
                    settings
                );

                this.userService.setUser(user);

                switch(authType){
                    case 'normal':
                        this.router.navigate(['/account']);
                        break;
                    case 'recovery':
                        this.resettinPassword.update(val => val = true);
                        this.router.navigate(['/auth/reset-password'], { queryParamsHandling: 'preserve', preserveFragment: true });
                        break;
                }
                this.loaderService.changeState(LoaderActionEnum.GETTING_USER_DATA, false);
            },
            error: error => {
                console.error("Error during getting user data: " + error);
                this.loggerService.add("Error ao carregar as suas informações", LogStatus.ERROR);
                this.loaderService.changeState(LoaderActionEnum.GETTING_USER_DATA, false);
            }
        })

    }

    changeEvent(): AuthChangeEvent{
        return this.authChangeEvent;
    }

    get auth(): SupabaseAuthClient{
        return this.supabaseService.supabase.auth;
    }

    get user(): User | null{
        return this.userService.getUser();
    }

    get user$(): Observable<User | null>{
        return this.userService.getUserAsObservable();
    }

    async SignOut(): Promise<void>{
        try{

            const { error } = await this.supabaseService.supabase.auth.signOut();
            if(error){
                if(isAuthApiError(error)){
                    this.loggerService.add(translateErrorMessage(error.message), LogStatus.ERROR);
                } else {
                    this.loggerService.add('Ocorreu um erro inesperado durante o cadastro. ', LogStatus.ERROR);
                }
                return;
            }

        } catch (error: any) {
            this.loggerService.add("Erro ao fazer o logout: " + error.message, LogStatus.ERROR);
            console.log("Erro ao fazer o logout: " + error.message);
            throw new Error("Error during sign out: " + error);
        }
    }

    async identityUnlink(provider: string){
          
        const { data: identities } = await this.supabaseService.supabase.auth.getUserIdentities()
        if(identities === null) return;
        const googleIdentity = identities.identities.find((identity) => identity.provider === provider)!
        const { data, error } = await this.supabaseService.supabase.auth.unlinkIdentity(googleIdentity)
    }
}