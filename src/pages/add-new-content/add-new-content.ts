import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
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

	constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, private apiRequest: ApiRequestProvider, private transfer: FileTransfer) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddNewContentPage');
	}

	selectImage() {
		var options = { maximumImagesCount: 1 };
		this.imagePicker.getPictures(options).then((results) => {
			for (var i = 0; i < results.length; i++) {
				this.imagePath = results[i];
				console.log('Image URI: ' + results[i]);
			}
		}, (err) => { 
			console.log(err);
		});
	}

	sendImage() {
		const fileTransfer: FileTransferObject = this.transfer.create();
		let imageName = this.imagePath.substr(this.imagePath.lastIndexOf('/') + 1)
		let options: FileUploadOptions = {
			fileKey: 'attachment',
			fileName: imageName,
			chunkedMode: false,
			headers: { token: this.apiRequest.user.authentication_token },
			params: { caption: 'hybrid'}
		}

		console.log('My image path');
		console.log(this.imagePath);
		fileTransfer.onProgress((progress) => console.log((progress.lengthComputable) ?  Math.floor(progress.loaded / progress.total * 100) : -1));
		fileTransfer.upload(this.imagePath, 'https://memoriz-api.herokuapp.com' + '/contents' , options)
		.then((data) => {
			console.log(data);
		}, (err) => {
			console.log(err);
		});
	}
}
