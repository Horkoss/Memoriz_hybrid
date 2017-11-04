import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../../pages/menu/menu';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { Toast } from '@ionic-native/toast';
import { User } from '../../model/User'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-register',
 	templateUrl: 'register.html',
 })
 export class RegisterPage {
 	isLoading: boolean;
 	registerCredentials = { firstname: '', lastname: '', email: '', password: '', password_confirmation: '', birthday: '' };

 	constructor(public navCtrl: NavController, public navParams: NavParams, private apiRequest: ApiRequestProvider, private toast: Toast) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad RegisterPage');
 	}

 	register() {
 		this.isLoading = true;
 		this.apiRequest.register(this.registerCredentials).subscribe(
 			data => {
 				console.log(data);
 				this.apiRequest.user = data.user as User;
 				this.navCtrl.setRoot(MenuPage);
 			},
 			err => {
 				this.showToast(err);
 				console.log(err);
 				this.isLoading = false;
 			},
 			() => {
 				console.log('Login completed');
 				this.isLoading = false;
 			}
 			);
 	}

 	private showToast(text) {
 		this.toast.showShortBottom(text).subscribe(
 			toast => {
 				console.log(toast);
 			});
 	}
 }
