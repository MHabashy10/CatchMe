import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { FriendsPage } from '../pages/friends/friends';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make TabsPage the root (or first) page
  rootPage = TabsPage;
  pages: PageInterface[];

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello', name: 'TabsPage', component: TabsPage, tabComponent: HelloIonicPage, index: 0, icon: 'calendar' },
      { title: 'Map', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 1, icon: 'contacts' },
      { title: 'Friends', name: 'TabsPage', component: TabsPage, tabComponent: FriendsPage, index: 2, icon: 'contacts' },
      { title: 'List', name: 'TabsPage', component: TabsPage, tabComponent: ListPage, index: 3, icon: 'contacts' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs() && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
      // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      // this.userData.logout();
    }

    // close the menu when clicking a link from the menu
    this.menu.close();
  }
}
