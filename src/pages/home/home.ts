import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
 export class HomePage {
 	content = 'ContentPage';
 	userContent = 'UserContentPage';

 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad HomePage');
 	}
 }
