import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationLoader } from '@core/classes/abstracts/authentication-loader.class';
import { EmailPasswordAuthentication } from '@core/models/authentication/email-password.model';
import { AuthenticationFacade } from '@feature-modules/auth/facades/authentication.facade';
import { Provider } from '@supabase/supabase-js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends AuthenticationLoader {

  private authenticationFacade = inject(AuthenticationFacade);

  signUpFormGroup: any;
  submitted: boolean = false;

  passwordFieldIsFocused = false;
  passwordCriteria = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  }

  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ])
    });

    this.signUpFormGroup.get('password')?.valueChanges.subscribe((password: any) => {
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
      this.signUpFormGroup.get('password').setErrors({ unmatchedCriteria: 'Verifique se a sua senha cumpre com os critérios necessários.' });
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
    return this.signUpFormGroup.controls;
  }

  submit(){
    this.submitted = true;
    if(this.signUpFormGroup.invalid) return;

    let data: EmailPasswordAuthentication = {
      email: this.signUpFormGroup.get('email').value,
      password: this.signUpFormGroup.get('password').value
    }

    this.signUpWithEmailPassword(data);
  }

  signUpWithOAuth(provider: Provider){
    this.authenticationFacade.OAuthLogin(provider);
  }

  signUpWithEmailPassword(userData: EmailPasswordAuthentication){
    this.authenticationFacade.EmailPasswordRegistration(userData);
  }

}
