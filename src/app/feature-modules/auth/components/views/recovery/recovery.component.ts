import { Location } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationLoader } from '@core/classes/abstracts/authentication-loader.class';
import { AuthenticationFacade } from '@feature-modules/auth/facades/authentication.facade';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export class RecoveryComponent extends AuthenticationLoader implements OnInit {

  private authenticationFacade = inject(AuthenticationFacade);
  private location = inject(Location);

  recoveryFormGroup: any;

  ngOnInit(): void {
    this.recoveryFormGroup = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ]),
    });
  }

  get formGroupControls(){
    return this.recoveryFormGroup.controls;
  }

  goback(){
    this.location.back();
  }

  submit(){
    if(this.recoveryFormGroup.invalid) return;
    let data: { email: string } = {
      email: this.recoveryFormGroup.get('email').value,
    }
    this.authenticationFacade.RecoverAccount(data);
  }

}
