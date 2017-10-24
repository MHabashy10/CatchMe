import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { ItemDetailsPage } from '../item-details/item-details';
/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  items: AngularFireList<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.items = db.list('users');
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
