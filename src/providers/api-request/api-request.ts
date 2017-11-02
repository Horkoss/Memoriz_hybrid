import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable'
import { FileUploadOptions } from '@ionic-native/file-transfer';

  @Injectable()
  export class ApiRequestProvider {
  	apiUrl = "https://memoriz-api.herokuapp.com";

  	constructor(public http: Http) {
  		console.log('Hello ApiRequestProvider Provider');
  	}

  	signIn(credentials) {
  		if (credentials.email == '' || credentials.password == '') {
  			return Observable.throw('Please complete all fields');
  		} else {
        let headers = this.getHeaders(null);
        let options = new RequestOptions({ headers: headers });

        let postParams = {
          email: credentials.email,
          password: credentials.password,
        }
        return this.http.post(this.apiUrl + '/users/sign_in', postParams, options)
        .do(this.logResponse).map(this.extractData).catch(this.catchError);
  		}
  	}

    getAllContent(token, page, per){
      let headers = this.getHeaders(token);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.apiUrl + '/all_contents?page=' + page + '&per=' + per, options)
      .do(this.logResponse).map(this.extractData).catch(this.catchError);
    }

    getUserContent(token, page, per) {
      let headers = this.getHeaders(token);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.apiUrl + '/contents?page=' + page + '&per=' + per, options)
      .do(this.logResponse).map(this.extractData).catch(this.catchError);
    }

    addNewContent(token, imagePath, fileTransfer) {
    }

  	private getHeaders(token) {
  		var headers = new Headers();
  		headers.append("Accept", 'application/json');
  		headers.append('Content-Type', 'application/json' );
      if (token != null)
         headers.append('token', token);
  		return headers;
  	}

  	private catchError(error: Response | any){
  		console.log(error);
  		return Observable.throw(error.json.error || 'Servor error');
  	}

  	private logResponse(res) {
  		console.log(res);
  	}

  	private extractData(res){
  		return res.json();
  	}
  }
