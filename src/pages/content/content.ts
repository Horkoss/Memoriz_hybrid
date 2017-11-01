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

 	constructor(public navCtrl: NavController, public navParams: NavParams, private apiRequest: ApiRequestProvider, private toast: Toast) {
 	}

 	ngOnInit() {
 		this.user = this.navParams.data;
 		console.log(this.user);
 		this.apiRequest.getAllContent(this.user.authentication_token, 1, 5).subscribe(			
 			data => {
				console.log(data);
				this.contentArray = data as ContentArray;
				this.contentList = this.contentArray.contents;
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
		this.toast.showShortBottom(text).subscribe(
			toast => {
				console.log(toast);
			});
	}
}
