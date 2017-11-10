import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, User } from '../../providers/auth-service';

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

    user: User;
    private profileForm: FormGroup;


    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private auth: AuthService) {

        this.user = new User()// { firstName: "", lastName: "", email: "", phone: null };
        // create profile formBuilder
        this.profileForm = this.formBuilder.group({
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            email: [this.user.email, Validators.required],
            phone: [this.user.phone, Validators.required]
        });
        // by default disable the form
        this.profileForm.disable()

    }
    logForm() {
        console.log(this.profileForm.value);
        // this.profileForm.disable()
    }

    toggleForm() {

        console.log(this.profileForm.value);
        // enable the form for editing
        this.profileForm.enable()

    }
    ionViewCanEnter() {
        console.log('ionViewCanEnter ProfilePage');
        // get currentUser info
        return this.auth.getUserInfo().then((userData => this.user = userData))

    }

    ionViewWillEnter() {

    }

}

