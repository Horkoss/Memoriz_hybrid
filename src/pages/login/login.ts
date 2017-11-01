import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { MenuPage } from '../../pages/menu/menu';
import { Toast } from '@ionic-native/toast';
import { User } from '../../model/User'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	isLoading: boolean;
	registerCredentials = { email: 'jltang@gmail.com', password: 'password' };

	constructor(public navCtrl: NavController, private apiRequest: ApiRequestProvider, private toast: Toast) {
		this.isLoading = false;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	signIn() {
		this.isLoading = true;
		this.apiRequest.signIn(this.registerCredentials).subscribe(
			data => {
				console.log(data);
				this.navCtrl.setRoot(MenuPage, {user: data.user as User});
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
