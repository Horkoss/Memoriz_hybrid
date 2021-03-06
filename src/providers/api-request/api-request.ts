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
    user: User;
  	apiUrl = "https://memoriz-api.herokuapp.com";

  	constructor(public http: Http) {
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

    register(credentials) {
      if (credentials.email == '' || credentials.password == '') {
        return Observable.throw('Please complete all fields');
      } else {
        let headers = this.getHeaders();
        let options = new RequestOptions({ headers: headers });

        let postParams = {
          firstname: credentials.firstname,
          lastname: credentials.lastname,
          username: credentials.firstname + ' ' + credentials.lastname,
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.password_confirmation,
          birthday: credentials.birthday,
        }
        return this.http.post(this.apiUrl + '/users', postParams, options)
        .do(this.logResponse).map(this.extractData).catch(this.catchError);
      }
    }

    getAllContent(page, per){
      let headers = this.getHeaders();
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.apiUrl + '/all_contents?page=' + page + '&per=' + per, options)
      .do(this.logResponse).map(this.extractData).catch(this.catchError);
    }

    getUserContent(page, per) {
      let headers = this.getHeaders();
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.apiUrl + '/contents?page=' + page + '&per=' + per, options)
      .do(this.logResponse).map(this.extractData).catch(this.catchError);
    }

    getEvents() {
      let headers = this.getHeaders();
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.apiUrl + '/events?page=1&per=20', options)
      .do(this.logResponse).map(this.extractData).catch(this.catchError);
    }

  	private getHeaders() {
  		var headers = new Headers();
  		headers.append("Accept", 'application/json');
  		headers.append('Content-Type', 'application/json' );
      if (this.user != null)
         headers.append('token', this.user.authentication_token.toString());
  		return headers;
  	}

  	private catchError(error: Response | any){
  		console.log(error.json());
  		return Observable.throw(error.json().error || 'Please check your network');
  	}

  	private logResponse(res) {
  		console.log(res);
  	}

  	private extractData(res){
  		return res.json();
  	}
  }
