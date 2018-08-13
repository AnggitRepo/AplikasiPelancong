import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { ImageProvider } from '../../providers/image/image';
import { MenuPage } from '../menu/menu';

@IonicPage({
  name: 'inputdata'
})
@Component({  
  selector: 'page-inputdata', 
  templateUrl: 'inputdata.html', 
})

export class InputdataPage {
 public form                  : FormGroup;
  public nama                  : any;
  public kategori          : any;
  public keterangan         : any;
  public latitude         : Object;
  public longitude         : Object;
  public gambar         : any;
  public gambar2         : any;
  public displayed         : any;
  private _ID                  : String;
  public image                : any;
  public image2                : any;
  public pageTitle             : string;
  private _HOST : string       =  "http://192.168.43.52:8080/api/gallery";
  constructor(public navCtrl     : NavController,
    public navParams   : NavParams,
    private _FB          : FormBuilder,
    private _HTTP        : HttpClient,
    private geolocation: Geolocation,
    private _TOAST       : ToastController,
    private _IMAGE       : ImageProvider
    )
  {
    this.form = this._FB.group({
      'nama'             : ['', Validators.required],
      'kategori'     : ['', Validators.required],
      'gambar'       : [''],
      'gambar2'       : [''],
      'keterangan'     : ['', Validators.required],
      'displayed'       : ['', Validators.required]
    });
    this.geolocation.getCurrentPosition().then((resp) => {
      let aaa=resp.coords.latitude,
        bbb=resp.coords.longitude;

      this.latitude=aaa;
      this.longitude=bbb;
    });
  }
  ionViewDidLoad() : void
  {
    if(this.navParams.get("record"))
    {
      this._ID         =  this.navParams.data.record._id;
      this.nama         =  this.navParams.data.record.nama;
      this.kategori         =  this.navParams.data.record.kategori;
      this.keterangan    =  this.navParams.data.record.keterangan;
      this.gambar      =  this.navParams.data.record.gambar;
      this.gambar2      =  this.navParams.data.record.gambar2;
      this.displayed      =  this.navParams.data.record.displayed;
      this.pageTitle       =  "Update";
    }
    else {
      this.pageTitle       =  "Create";
    }
  }
  manageGallery() : void
  {
    let nama        : any        = this.form.controls['nama'].value,
    kategori   : any        = this.form.controls['kategori'].value,
    keterangan   : any        = this.form.controls['keterangan'].value,
    gambar     : any        = this.form.controls['gambar'].value,
    gambar2     : any        = this.form.controls['gambar2'].value,
    displayed     : any        = this.form.controls['displayed'].value,
    headers     : any     = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options       : any       = { nama : nama, kategori : kategori, keterangan : keterangan,
    latitude : this.latitude,
    longitude : this.longitude, gambar : gambar, gambar2 : gambar2, displayed: displayed },
    url         : any         = this._HOST;
    if(this.navParams.get("record"))
    {
      this._HTTP
      .put(url + '/' + this._ID, options, headers)
      .subscribe((data : any) =>
      {
        this.displayNotification(nama + ' was successfully updated');
        this.navCtrl.setRoot(MenuPage);
      },
      (error : any) =>
      {
        console.dir(error);
      });
    }
    else
    {
      this._HTTP
      .post(url, options, headers)
      .subscribe((data : any) =>
      {
        this.displayNotification(nama + ' was successfully created');
        this.navCtrl.setRoot(MenuPage);
      },
      (error : any) =>
      {
        console.dir(error);
      });
    }
  }
  displayNotification(message : string) : void
  {
    let toast = this._TOAST.create({
      message   : message,
      duration   : 3000
    });
    toast.present();
  }
  takePhotograph() : void
  {
    this._IMAGE
    .takePhotograph()
    .then((image)=>
    {
      this.gambar     = image.toString();
      this.image       = image.toString();
    })
    .catch((err)=>
    {
      console.log(err);
    });
  }
    takePhotograph2() : void
  {
    this._IMAGE
    .takePhotograph()
    .then((image)=>
    {
      this.gambar2     = image.toString();
      this.image2       = image.toString();
    })
    .catch((err)=>
    {
      console.log(err);
    });
  }
}
