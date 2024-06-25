import { Injectable, inject, signal } from "@angular/core";
import { AuthenticationContext } from "@core/strategies/authentication/authentication.context";
import { SupabaseService } from "../supabase/supabase.service";
import { User } from "@core/classes/User/user.class";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";
import { LogStatus, PopupLogService } from "../loggers/pop-up-log.service";
import { AuthChangeEvent, Session, SupabaseClient, isAuthApiError } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { Observable } from "rxjs";
import { translateErrorMessage } from "@core/constants/errors/message-translator";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends AuthenticationContext{

    private authChangeEvent!: AuthChangeEvent;
    resettinPassword = signal(false);
    private loggerService = inject(PopupLogService);

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

                    this.setUserFromSession(session, 'normal');
                    this.router.navigate(['/account']);
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

                    this.setUserFromSession(session, 'recovery');
                    this.resettinPassword.update(val => val = true);
                    this.router.navigate(['/auth/reset-password'], { queryParamsHandling: 'preserve', preserveFragment: true });
                    break;
            }
        });
    }

    private setUserFromSession(session: Session, authType: 'normal' | 'recovery'){
        let user = new User(
            session.user.id,
            session.user.user_metadata['fullname'],
            session.user.user_metadata['avatar'],
            session.user.email,
            session.access_token,
            session.expires_in,
            session.expires_at,
            authType
        );
        this.userService.setUser(user);
    }

    changeEvent(): AuthChangeEvent{
        return this.authChangeEvent;
    }

    get supabaseClient(): SupabaseClient{
        return this.supabaseService.supabase;
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
}