import { Injectable, OnInit, inject } from "@angular/core";
import { EmailPasswordAuthentication } from "@core/models/authentication/email-password.model";
import { AuthService } from "@core/services/auth/auth.service";
import { EmailPasswordAuthStrategy } from "@core/strategies/authentication/email-password.strategy";
import { OAuthStrategy } from "@core/strategies/authentication/oauth.strategy";
import { Provider } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationFacade implements OnInit{

  private authService = inject(AuthService);
  private oauthStrategy = inject(OAuthStrategy);
  private emailPasswordStrategy = inject(EmailPasswordAuthStrategy);

  ngOnInit(): void {

  }

  get auth$(): SupabaseAuthClient{
    return this.authService.auth;
  }

  OAuthLogin(provider: Provider, origin: 'login' | 'register' = 'login'): any{
    this.authService.setStrategy(this.oauthStrategy);
    this.authService.login(provider, origin);
  }

  EmailPasswordLogin(data: EmailPasswordAuthentication): any{
    this.authService.setStrategy(this.emailPasswordStrategy);
    return this.authService.login(data);
  }

  EmailPasswordRegistration(data: EmailPasswordAuthentication): any{
    this.authService.setStrategy(this.emailPasswordStrategy);
    this.authService.register(data);
  }

  RecoverAccount(data: { email: string }): any{
    this.authService.setStrategy(this.emailPasswordStrategy);
    this.authService.recoverAccount(data);
  }

  ResetPassword(accessToken: string, data: { password: string }): any{
    this.authService.setStrategy(this.emailPasswordStrategy);
    this.authService.resetPassword(accessToken, data);
  }

}