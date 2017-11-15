import { Component, ViewChild, ElementRef } from '@angular/core';
import {IonicPage} from 'ionic-angular'


import { Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {
  map: object[] = [{
    "name": "Monona Terrace Convention Center",
    "lat": 43.071584,
    "lng": -89.380120,
    "center": true
  }, {
    "name": "Ionic HQ",
    "lat": 43.074395,
    "lng": -89.381056
  }, {
    "name": "Afterparty - Brocach Irish Pub",
    "lat": 43.07336,
    "lng": -89.38335
  }]
  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor( public platform: Platform) {
  }

  ionViewDidLoad() {

    Observable.of(this.map).subscribe((mapData: any) => {
      let mapEle = this.mapElement.nativeElement;

      let map = new google.maps.Map(mapEle, {
        center: mapData.find((d: any) => d.center),
        zoom: 16
      });

      mapData.forEach((markerData: any) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: markerData,
          map: map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

    });

  }
}
