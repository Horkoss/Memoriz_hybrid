import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable'
import { User } from '../../model/User'

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
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });

        let postParams = {
          email: credentials.email,
          password: credentials.password,
        }
        return this.http.post(this.apiUrl + '/users/sign_in', postParams, options)
        .do(this.logResponse).map(this.extractData).catch(this.catchError);
  		}
  	}

    getAllContent(){
      
    }

  	private getHeaders() {
  		var headers = new Headers();
  		headers.append("Accept", 'application/json');
  		headers.append('Content-Type', 'application/json' );
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
  		return res.json().user as User;
  	}
  }
