
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { ValidationService } from '../../providers/validation.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage() 
@Component({
     selector: 'page-login',
     templateUrl: 'login.html',
})
export class LoginPage {
     loading: Loading;
     loginCredentials = { email: '', password: '' };
     loginForm: FormGroup;
     constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
         // create login formBuilder
    this.loginForm = this.formBuilder.group({
       
        email: [this.loginCredentials.email, [Validators.required, ValidationService.emailValidator]],
        password: [this.loginCredentials.password, Validators.required]
      });
  
      }

     public createAccount() {
          this.nav.push('SignupPage');
     }

     public login() {
          this.showLoading()
          this.auth.login(this.loginCredentials).subscribe(allowed => {
               if (allowed._id) {
                    this.nav.setRoot('TabsPage');
               } else {
                    this.showError("Access Denied");
               }
          },
               error => {
                    this.showError(error);
               },
               () => console.log("Done"));
     }

     showLoading() {
          this.loading = this.loadingCtrl.create({
               content: 'Please wait...',
               dismissOnPageChange: true
          });
          this.loading.present();
     }

     showError(text) {
          this.loading.dismiss();

          let alert = this.alertCtrl.create({
               title: 'Fail',
               subTitle: text,
               buttons: ['OK']
          });
          alert.present();
     }
}
