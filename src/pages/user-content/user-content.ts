import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { User } from '../../model/User'
import { Toast } from '@ionic-native/toast';
import { ContentArray } from '../../model/ContentArray'
import { AddNewContentPage } from '../../pages/add-new-content/add-new-content'
import { App } from 'ionic-angular';

/**
 * Generated class for the UserContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-user-content',
 	templateUrl: 'user-content.html',
 })
 export class UserContentPage implements OnInit {
 	user: User;
 	contentArray: ContentArray;
 	contentList: Array<any> = [];
 	page: number = 1;
 	per: number = 5;

 	constructor(private app:App, public navCtrl: NavController, public navParams: NavParams, private apiRequest: ApiRequestProvider, private toast: Toast) {
 	}

 	ngOnInit() {
 		this.user = this.navParams.data;
 		console.log(this.user);
 		this.getContent(null);
 	}

 	getContent(refresher) {
 		this.apiRequest.getUserContent(this.user.authentication_token, this.page, this.per).subscribe(			
 			data => {
 				if (refresher != null)
 					refresher.complete();
 				console.log(data);
 				this.contentArray = data as ContentArray;
 				this.contentList = this.contentArray.contents;
 			},
 			err => {
 				if (refresher != null)
 					refresher.complete();
 				this.showToast(err);
 				console.log(err);
 			},
 			() => {
 				console.log('Content loaded');
 			});
 	}

 	refreshContent(refresher) {
 		this.getContent(refresher);
 	}

 	addNewContent() {
 		this.app.getRootNav().push(AddNewContentPage, { token: this.user.authentication_token });
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad UserContentPage');
 	}

 	private showToast(text) {
 		this.toast.showShortBottom(text).subscribe(
 			toast => {
 				console.log(toast);
 			});
 	}
 }
