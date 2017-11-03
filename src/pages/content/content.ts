import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { User } from '../../model/User'
import { Toast } from '@ionic-native/toast';
import { ContentArray } from '../../model/ContentArray'
/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-content',
 	templateUrl: 'content.html',
 })
 export class ContentPage implements OnInit {
 	user: User;
 	contentArray: ContentArray;
 	contentList: Array<any> = [];
 	page: number = 1;
 	per: number = 5;

 	constructor(public navCtrl: NavController, public navParams: NavParams, private apiRequest: ApiRequestProvider, private toast: Toast) {
 	}

 	ngOnInit() {
 		this.user = this.navParams.data;
 		console.log(this.user);
 		this.getContent(null);
 	}

 	getContent(refresher) {
 		this.apiRequest.getAllContent(this.user.authentication_token, this.page, this.per).subscribe(			
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

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad HomePage');
 	}

 	refreshContent(refresher) {
 		this.getContent(refresher);
 	}

 	private showToast(text) {
 		this.toast.showShortBottom(text).subscribe(
 			toast => {
 				console.log(toast);
 			});
 	}
 }
