import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps'
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { Event } from '../../model/Events'

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
 	map: GoogleMap;
 	mapReady: boolean = false;

 	constructor(public navCtrl: NavController, public navParams: NavParams, private apiRequest: ApiRequestProvider, private googleMaps: GoogleMaps) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad ProfilePage');
 		this.loadMap();
 	}

 	loadMap(){
 		this.map = this.googleMaps.create('map');

 		this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
 			this.mapReady = true;
 			this.map.setMyLocationEnabled(true);
 			this.map.getMyLocation().then((location) => {
 				this.map.animateCamera({
 					target: location.latLng,
 					zoom: 10,
 					tilt: 15
 				}).then(() => {
 					this.apiRequest.getEvents().subscribe(
 						data => {
 							let events = data.events as Array<Event>;
 							for (let event of events) {
 								this.map.addMarker({
 									title: event.name.toString(),
 									icon: 'red',
 									snippet: event.description.toString(),
 									position: {
 										lat: event.lat,
 										lng: event.lng
 									}
 								});
 							}
 						},
 						err => {
 							console.log(err);
 						},
 						() => {
 							console.log('Login completed');
 						});
 				});
 			});
 		});
 	}
}
