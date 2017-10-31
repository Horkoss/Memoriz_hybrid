import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { HomePage } from '../../pages/home/home';
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
	user: User;
	registerCredentials = { email: '', password: '' };

	constructor(public navCtrl: NavController, private apiRequest: ApiRequestProvider, public navParams: NavParams) {
		this.isLoading = false;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	signIn() {
		this.isLoading = true;
		this.apiRequest.signIn(this.registerCredentials).subscribe(
			data => {
				this.user = data; 
				console.log(this.user);
				this.navCtrl.setRoot(HomePage);
			},
			err => {
				console.log(err);
				this.isLoading = false;
			},
			() => {
				console.log('Login completed');
				this.isLoading = false;
			}
		);
	}
}
