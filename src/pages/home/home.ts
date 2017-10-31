import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/User'

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-home',
 	templateUrl: 'home.html',
 })
 export class HomePage {
 	user: User;
 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 		this.user = navParams.get('user');
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad HomePage');
 	}

 }
