import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { MenuPage } from '../menu/menu';
import { AuthserviceProvider } from '../../providers/authservice/authservice';

@IonicPage()
@Component({ 
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
	usercreds = { 
		username: '',
		password: ''
	};
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public menuCtrl: MenuController,
  public authservice: AuthserviceProvider ) {
    this.menuCtrl.enable(true, 'myMenu');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(user) {
    this.authservice.authenticate(user).then(data => {
      if(data) {
        this.navCtrl.setRoot(MenuPage);
      }
    });
  }
  menu() {
    this.navCtrl.setRoot(MenuPage);
  }
  signup() {
    this.navCtrl.push(RegisterPage);
  }
}
