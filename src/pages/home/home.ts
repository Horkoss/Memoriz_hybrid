import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/User'
import { ContentPage } from '../../pages/content/content'
import { UserContentPage } from '../../pages/user-content/user-content'

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
 export class HomePage implements OnInit{
 	user: User;
 	content = 'ContentPage';
 	userContent = 'UserContentPage';

 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ngOnInit() {
 		this.user = this.navParams.data;
 		console.log(this.user);
	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad HomePage');
 		console.log(this.user);
 	}
 }
