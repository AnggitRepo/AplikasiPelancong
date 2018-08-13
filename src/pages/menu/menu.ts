import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { LoginPage } from '../login/login';
import { MapsPage } from '../maps/maps';
import { InputdataPage } from '../inputdata/inputdata';
import { TampildataPage} from '../tampildata/tampildata';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public authservice: AuthserviceProvider, 
  public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'myMenu');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  input(){
    this.navCtrl.push(InputdataPage);
  }
  home(){
    this.navCtrl.push(TampildataPage);
  }
  Map(){
    this.navCtrl.push(MapsPage);
  }
  logout() {
  	this.authservice.logout();
  	this.navCtrl.setRoot(LoginPage);
  }

}
