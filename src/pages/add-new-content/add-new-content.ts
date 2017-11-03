import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { Toast } from '@ionic-native/toast';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the AddNewContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-add-new-content',
	templateUrl: 'add-new-content.html',
})
export class AddNewContentPage {
	imagePath: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		public loadingCtrl: LoadingController, private imagePicker: ImagePicker, private apiRequest: ApiRequestProvider, 
		private transfer: FileTransfer, private toast: Toast, private network: Network) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddNewContentPage');
	}

	selectImage() {
		var options = { maximumImagesCount: 1 };
		this.imagePicker.getPictures(options).then((results) => {
			this.imagePath = results[0];
		}, (err) => { 
			console.log(err);
		});
	}

	sendImage() {
		if (this.network.type != "none") {
			let loading = this.loadingCtrl.create({
				content: 'Uploading image, please wait a moment...'
			});
			const fileTransfer: FileTransferObject = this.transfer.create();
			let imageName = this.imagePath.substr(this.imagePath.lastIndexOf('/') + 1)
			let options: FileUploadOptions = {
				fileKey: 'attachment',
				fileName: imageName,
				chunkedMode: false,
				headers: { token: this.apiRequest.user.authentication_token },
				params: { caption: 'hybrid'}
			}

			loading.present();
			fileTransfer.upload(this.imagePath, 'https://memoriz-api.herokuapp.com' + '/contents' , options)
			.then((data) => {
				this.navCtrl.pop();
				loading.dismiss();
			}, (err) => {
				loading.dismiss();
				this.showToast(err.json().error || 'Please check your network');
			});
		} else
			this.showToast('Please check your network');
	}

	showToast(text) {
		this.toast.showShortBottom(text).subscribe(
			toast => {
				console.log(toast);
			});
	}
}
