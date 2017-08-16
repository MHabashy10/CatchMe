import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FriendsPage } from '../friends/friends';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // set the root pages for each tab
  hello: any = HelloIonicPage;
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
