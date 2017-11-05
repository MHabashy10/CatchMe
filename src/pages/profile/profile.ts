import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  user: ProfileInterface;
  private profileForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

    this.user = {
      firstName: "Mohamed",
      lastName: "Habashy",
      email: "any",
      phone: 528799333
    };
    this.profileForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone, Validators.required]
    });

    this.profileForm.disable()
  }
  logForm() {
    console.log(this.profileForm.value);
    // this.profileForm.disable()
  }

  toggleForm() {
    console.log(this.profileForm.value);
   
    setTimeout(()=> this.profileForm.enable())

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');




  }

}
export interface ProfileInterface {
  firstName: string;
  lastName: string;
  email: any;
  phone: number;
}
