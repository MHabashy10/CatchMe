import { Component } from '@angular/core';
import {  NavController, NavParams, IonicPage } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { ItemDetailsPage } from '../item-details/item-details';

import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  items: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.items = db.list('users').valueChanges();
  }
  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
