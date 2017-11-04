import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { Toast } from '@ionic-native/toast';
import { ContentArray, Content } from '../../model/Content'
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
 	contentList: Array<any> = [];
 	page: number = 1;
 	per: number = 5;
 	totalContent: Number = 0;

 	constructor(private app:App, public navCtrl: NavController, public navParams: NavParams, private apiRequest: ApiRequestProvider, private toast: Toast) {
 	}

 	ngOnInit() {
 		this.getContent(null);
 	}

 	getContent(refresher) {
 		this.apiRequest.getUserContent(1, this.per).subscribe(			
 			data => {
 				if (refresher != null)
 					refresher.complete();
 				let contentArray = data as ContentArray;
 				this.totalContent = contentArray.count;
 				this.contentList = contentArray.contents;
 			},
 			err => {
 				if (refresher != null)
 					refresher.complete();
 				this.showToast(err);
 			},
 			() => {
 				console.log('Content loaded');
 			});
 	}
 	
 	loadMore() {
 		return new Promise((resolve) => {
 			this.apiRequest.getUserContent(this.page + 1, 5).subscribe(			
 				data => {
 					let contentArray = data as ContentArray;
 					this.totalContent = contentArray.count;
 					this.contentList = this.contentList.concat(contentArray.contents);
 					this.per = this.contentList.length;
 					this.page = this.page + 1;
 					resolve();
 				},
 				err => {
 					resolve();
 					this.showToast(err);
 				},
 				() => {
 					console.log('Content loaded');
 				});
 		});
 	}

 	refreshContent(refresher) {
 		this.getContent(refresher);
 	}

 	addNewContent() {
 		this.app.getRootNav().push(AddNewContentPage);
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
