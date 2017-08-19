import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { FriendsPage } from '../friends/friends';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // set the root pages for each tab
  hello: any = 'HomePage';
  map: any = MapPage;
  friends: any = FriendsPage;
  list: any = ListPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
