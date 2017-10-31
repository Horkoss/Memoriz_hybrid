import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { User } from '../../model/User'
import { Toast } from '@ionic-native/toast';
import { ContentArray, Content } from '../../model/ContentArray'

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
 	contentList: ContentArray;

 	constructor(public navCtrl: NavController, public navParams: NavParams, private apiRequest: ApiRequestProvider, private toast: Toast) {
 		this.user = navParams.get('user');
 		console.log(this.user);
 		this.apiRequest.getAllContent(this.user.authentication_token, 1, 5).subscribe(			
 			data => {
				console.log(data);
				this.contentList = data as ContentArray;
			},
			err => {
				this.showToast(err);
				console.log(err);
			},
			() => {
				console.log('Content loaded');
			});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad HomePage');
 	}

	private showToast(text) {
/*		this.toast.showShortBottom(text).subscribe(
			toast => {
				console.log(toast);
			});*/
	}
 }
