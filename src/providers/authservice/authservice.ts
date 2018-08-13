import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthserviceProvider {
	isLoggedin: boolean;
	AuthToken;
	constructor(public http: Http) {
		this.http = http;
		this.isLoggedin = false;
		this.AuthToken = null;
	}
	storeUserCredentials(token) {
		window.localStorage.setItem('anggit', token);
		this.useCredentials(token);
	}
	useCredentials(token) {
		this.isLoggedin = true;
		this.AuthToken = token;
	}
	loadUserCredentials() {
		var token = window.localStorage.getItem('anggit');
		this.useCredentials(token);
	}
	destroyUserCredentials() {
		this.isLoggedin = false;
		this.AuthToken = null;
		window.localStorage.clear();
	}
	authenticate(user) {
		var creds = "username=" + user.username + "&password=" + user.password;
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return new Promise(resolve => {
			this.http.post('http://192.168.43.52:8080/api/authenticate', creds, {headers: headers}).subscribe(data => {
				if(data.json().success){
					this.storeUserCredentials(data.json().token);
					resolve(true);
				}
				else
					resolve(false);
			});
		});
	}
	adduser(user) {
		var creds = "username=" + user.username + "&password=" + user.password + "&telp="+user.telp + "&email="+user.email;
		var headers = new Headers();
		console.log('ini authnya::::'+ creds)
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return new Promise(resolve => {
			this.http.post('http://192.168.43.52:8080/api/signup', creds, {headers: headers}).subscribe(data => {
				if(data.json().success){
					resolve(true);
				}
				else
					resolve(false);
			});
		});
	}
	getinfo() {
		return new Promise(resolve => {
			var headers = new Headers();
			this.loadUserCredentials();
			console.log(this.AuthToken);
			headers.append('Authorization', 'Bearer ' +this.AuthToken);
			this.http.get('http://192.168.43.52:8080/api/memberinfo', {headers: headers}).subscribe(data => {
				if(data.json().success)
					resolve(data.json());
				else
					resolve(false);
			});
		})
	}
	logout() {
		this.destroyUserCredentials();
	}
}
