import { Component, OnInit, Signal, WritableSignal, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationLoader } from '@core/classes/abstracts/authentication-loader.class';
import { EmailPasswordAuthentication } from '@core/models/authentication/email-password.model';
import { AuthenticationFacade } from '@feature-modules/auth/facades/authentication.facade';
import { Provider } from '@supabase/supabase-js';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent extends AuthenticationLoader implements OnInit {

  private authenticationFacade = inject(AuthenticationFacade);

  signInFormGroup: any;
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
    this.signInFormGroup = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ])
    });

    this.signInFormGroup.get('password')?.valueChanges.subscribe((password: any) => {
      this.passwordCriteria = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&#]/.test(password)
      }
    })

  }

  focusOnPassword(){
    this.passwordFieldIsFocused = true;
  }

  blurOnPassword(){
    this.passwordFieldIsFocused = false;
  }

  get formGroupControls(){
    return this.signInFormGroup.controls;
  }

  submit(){
    this.submitted = true;
    if(this.signInFormGroup.invalid) return;

    let data: EmailPasswordAuthentication = {
      email: this.signInFormGroup.get('email').value,
      password: this.signInFormGroup.get('password').value
    }

    this.signInWithEmailPassword(data);
  }
  
  signInWithOAuth(provider: Provider): void{
    this.authenticationFacade.OAuthLogin(provider);
  }

  signInWithEmailPassword(data: EmailPasswordAuthentication): void{
    this.authenticationFacade.EmailPasswordLogin(data);
  }

}
