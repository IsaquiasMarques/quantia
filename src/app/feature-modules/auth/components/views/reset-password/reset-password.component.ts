import { Component, OnInit, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationLoader } from '@core/classes/abstracts/authentication-loader.class';
import { RedirectTo } from '@core/classes/redirect.class';
import { translateErrorMessage } from '@core/constants/errors/message-translator';
import { LogStatus, PopupLogService } from '@core/services/loggers/pop-up-log.service';
import { AuthenticationFacade } from '@feature-modules/auth/facades/authentication.facade';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent
extends AuthenticationLoader
implements OnInit {
  private popup = inject(PopupLogService);
  private authenticationFacade = inject(AuthenticationFacade);
  private redirectTo = inject(RedirectTo);

  private activatedRoute = inject(ActivatedRoute);

  passwordResetFormGroup: any;
  submitted: boolean = false;

  passwordFieldIsFocused = false;
  passwordCriteria = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  }

  passwordsMatch: boolean = false;

  ngOnInit(): void {

    this.activatedRoute.fragment.subscribe((fragments: any) => {
      if (fragments) {
        const params = new URLSearchParams(fragments);
        const error = params.get('error');
        const errorCode = params.get('error_code');
        const errorDescription = params.get('error_description');

        if(error && errorCode){
          this.redirectTo.route(['/auth/sign-in']).withError(translateErrorMessage(errorDescription ?? ''));
        }
      }
    });

    this.passwordResetFormGroup = new FormGroup({
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      'confirm-password': new FormControl('', [])
    });

    this.passwordResetFormGroup.get('password')?.valueChanges.subscribe((password: any) => {
      this.passwordCriteria = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&#]/.test(password)
      }
      this.validatePasswordCriterias();
    })

  }

  validatePasswordCriterias(){
    if(
      !this.passwordCriteria.minLength      ||
      !this.passwordCriteria.hasUpperCase   || 
      !this.passwordCriteria.hasLowerCase   ||
      !this.passwordCriteria.hasNumber      ||
      !this.passwordCriteria.hasSpecialChar
    ){
      this.passwordResetFormGroup.get('password').setErrors({ unmatchedCriteria: 'Verifique se a sua senha cumpre com os critérios necessários.' });
      // this.popupLog.add('Verifique se a sua senha cumpre com os critérios necessários.');
    }
  }

  focusOnPassword(){
    this.passwordFieldIsFocused = true;
  }

  blurOnPassword(){
    this.passwordFieldIsFocused = false;
  }

  get formGroupControls(){
    return this.passwordResetFormGroup.controls;
  }

  resetPassword(accessToken: string, data: { password: string }){
    this.authenticationFacade.ResetPassword(accessToken, data);
  }

  confirmPassword(){
    if(this.passwordResetFormGroup.get('confirm-password').value === this.passwordResetFormGroup.get('password').value){
      this.passwordsMatch = true;

    } else {
      this.passwordsMatch = false;
    }
  }

  submit(){
    this.submitted = true;

    if(!this.passwordsMatch){
      this.popup.add("As senhas não coincidem. Por favor, verifique e confirme a nova senha corretamente.", LogStatus.ERROR);
      return;
    }
    if(this.passwordResetFormGroup.invalid) return;

    let data: { password: string } = {
      password: this.passwordResetFormGroup.get('password').value
    }

    this.resetPassword('', data);
  }
}
