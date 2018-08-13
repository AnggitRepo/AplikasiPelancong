import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { LoginPage } from '../login/login';

@IonicPage() 
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
	newcreds = {
		username: '',
		password: '', 
    telp: '',
    email: ''
	};
  constructor(public navCtrl: NavController,public authservice: AuthserviceProvider, public alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register(user) {
  	this.authservice.adduser(user).then(data => {
  		if(data) {
  			var alert = this.alertCtrl.create({
  				title: 'Success',
  				subTitle: 'User Created',
  				buttons: ['ok']
  			});
  			alert.present();
        this.navCtrl.setRoot(LoginPage);
  		}
  	});
  }
}
