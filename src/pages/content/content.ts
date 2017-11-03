import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
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
 	contentList: Array<any> = [];
 	page: number = 1;
 	per: number = 5;
 	totalContent: Number = 0;

 	constructor(public navCtrl: NavController, public navParams: NavParams, private apiRequest: ApiRequestProvider, private toast: Toast) {
 	}

 	ngOnInit() {
 		this.getContent(null);
 	}

 	getContent(refresher) {
 		this.apiRequest.getAllContent(1, this.per).subscribe(			
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

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad HomePage');
 	}

 	loadMore() {
 		return new Promise((resolve) => {
 			this.apiRequest.getAllContent(this.page + 1, 5).subscribe(			
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

 	private showToast(text) {
 		this.toast.showShortBottom(text).subscribe(
 			toast => {
 				console.log(toast);
 			});
 	}
 }
