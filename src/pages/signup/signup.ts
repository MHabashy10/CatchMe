import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { ValidationService } from '../../providers/validation.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// RegisterCredentials class 
export class RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;

  constructor() {
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.firstName = "";
    this.lastName = "";
  }

}
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  createSuccess = false;
  registerCredentials: RegisterCredentials = new RegisterCredentials();
  private registerForm: FormGroup;

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.registerCredentials = new RegisterCredentials();
    // create register formBuilder
    this.registerForm = this.formBuilder.group({
      firstName: [this.registerCredentials.firstName, Validators.required],
      lastName: [this.registerCredentials.lastName, Validators.required],
      email: [this.registerCredentials.email, [Validators.required, ValidationService.emailValidator]],
      password: [this.registerCredentials.password, Validators.required],
      confirmPassword: [this.registerCredentials.confirmPassword, Validators.required]
    });


  }

  public register() {
    //disable when submitted
    this.registerForm.disable();

    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.setRoot('TabsPage');
            }
          }
        }
      ]
    });
    alert.present();
  }
}
