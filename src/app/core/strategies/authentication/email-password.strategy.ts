import { Injectable, inject } from "@angular/core";
import { RedirectTo } from "@core/classes/redirect.class";
import { translateErrorMessage } from "@core/constants/errors/message-translator";
import { LoaderActionEnum } from "@core/enums/loader/loader.enum";
import { IAuthentication } from "@core/interfaces/authentication/IAuthentication";
import { EmailPasswordAuthentication } from "@core/models/authentication/email-password.model";
import { AuthService } from "@core/services/auth/auth.service";
import { Loader } from "@core/services/loader/loader.service";
import { LogStatus, PopupLogService } from "@core/services/loggers/pop-up-log.service";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { isAuthApiError } from "@supabase/supabase-js";

@Injectable({
    providedIn: 'root'
})
export class EmailPasswordAuthStrategy implements IAuthentication{
    
    constructor(
        private supabaseService: SupabaseService,
        private loggerService: PopupLogService,
        private loaderService: Loader,
        private redirectTo: RedirectTo,
        private authService: AuthService
    ) {}

    async login(authenticationData: EmailPasswordAuthentication) {
        this.loaderService.changeState(LoaderActionEnum.USER_AUTHENTICATION, true);
        try{
            const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword( authenticationData );
            if(error){
                if (isAuthApiError(error)) {
                    this.loggerService.add(translateErrorMessage(error.message), LogStatus.ERROR)
                } else {
                    console.error(error.message);
                    this.loggerService.add('Ocorreu um erro inesperado durante o login', LogStatus.ERROR);
                }
                return;
            }
        } catch (error: any) {
            this.loggerService.add("Erro ao fazer login: " + error.message, LogStatus.ERROR);
            console.error("Erro ao fazer login: " + error.message);
            throw new Error("Error during sign-in: " + error);

        } finally {
            this.loaderService.changeState(LoaderActionEnum.USER_AUTHENTICATION, false);
        }
    }

    async register(registrationData: EmailPasswordAuthentication) {
        this.loaderService.changeState(LoaderActionEnum.USER_AUTHENTICATION, true)
        try {
            const { data, error } = await this.supabaseService.supabase.auth.signUp(registrationData)
            if(error){
                if(isAuthApiError(error)){
                    this.loggerService.add(translateErrorMessage(error.message), LogStatus.ERROR);
                } else {
                    this.loggerService.add('Ocorreu um erro inesperado durante o cadastro. ', LogStatus.ERROR);
                }
                return;
            }
        } catch (error: any) {
            this.loggerService.add("Erro ao registrar: " + error.message, LogStatus.ERROR);
            console.error("Erro ao registrar: " + error.message);
            throw new Error("Error during registration: " + error);
        } finally {
            this.loaderService.changeState(LoaderActionEnum.USER_AUTHENTICATION, false);
        }

    }

    async recoverAccount(recoveryData: { email: string }) {
        this.loaderService.changeState(LoaderActionEnum.USER_AUTHENTICATION, true);
        try{
            const { data, error } = await this.supabaseService.supabase.auth.resetPasswordForEmail(recoveryData.email, {
                redirectTo: "http://localhost:4200/auth/reset-password"
                // redirectTo: AuthenticationConnstants.RECOVER_PASSWORD_URL
            });
            if(error){
                if(isAuthApiError(error)){
                    this.loggerService.add(translateErrorMessage(error.message), LogStatus.ERROR);
                } else {
                    this.loggerService.add('Ocorreu um erro inesperado durante ao recuperar a conta', LogStatus.ERROR);
                }
                return;
            }
            this.loggerService.add('Enviamos um email com o link para a redefinição da senha.', LogStatus.SUCCESS);
            // this.redirectTo.route(['/auth/sign-in']).with(LogStatus.SUCCESS, 'Enviamos um email com o link para a redefinição da senha.');

        } catch (error: any){
            this.loggerService.add("Erro ao tentar acessar a página de reset da senha: " + translateErrorMessage(error.message), LogStatus.ERROR);
            console.error("Erro ao tentar acessar a página de reset da senha: " + translateErrorMessage(error.message));
            throw new Error("Error while trying call reset-password page: " + translateErrorMessage(error.message));
        } finally {
            this.loaderService.changeState(LoaderActionEnum.USER_AUTHENTICATION, false);
        }
    }

    async resetPassword(accessToken: string, resetData: { password: string }) {
        this.loaderService.changeState(LoaderActionEnum.USER_AUTHENTICATION, true);
        try {
            
            const { data, error } = await this.supabaseService.supabase.auth.updateUser(resetData);
            if(error){
                console.log(error);
                if(isAuthApiError(error)){
                    this.loggerService.add(translateErrorMessage(error.message), LogStatus.ERROR);
                } else {
                    this.loggerService.add('Ocorreu um erro inesperado durante à autenticação', LogStatus.ERROR);
                }
                return;
            }

            this.authService.resettinPassword.update(val => val = false);
            this.loggerService.add('Sua senha foi redefinida com sucesso. Por favor, faça login novamente', LogStatus.SUCCESS);
            this.authService.SignOut();

        } catch (error: any) {
            this.loggerService.add("Erro ao resetar a senha: " + translateErrorMessage(error.message), LogStatus.ERROR);
            console.error("Erro ao resetar a senha: " + translateErrorMessage(error.message));
            throw new Error("Error during password reseting: " + translateErrorMessage(error.message));
        } finally {
            this.loaderService.changeState(LoaderActionEnum.USER_AUTHENTICATION, false);
        }

    }

}