import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent
} from '@ionic-native/google-maps';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

	map: GoogleMap;
  public latitude         : Object;
  public longitude         : Object;

  constructor(public http: Http, private geolocation: Geolocation,
    public navCtrl: NavController, public navParams: NavParams) {
      this.geolocation.getCurrentPosition().then((resp) => {
        let aaa=resp.coords.latitude,
          bbb=resp.coords.longitude;

        this.latitude=aaa;
        this.longitude=bbb;
      });
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get('http://192.168.43.52:8080/api/gallery', { headers: headers })
          .map(res => res.json())
      .subscribe((data : any) => {
        let hasil = data.records;
        this.initMap( hasil )
      });
  }

  onButtonClick() {
    this.map.moveCamera({
      target: {lat: this.latitude, lng: this.longitude},
      zoom: 14,
      tilt: 30
    }
    ).then(() => {
      alert("Camera changed");
    });
  }
  initMap( hasil ){
    for (var i = 0, length = hasil.length; i < length; i++) {
      var isi = hasil[i];
      console.log("data isi"+isi.nama)
      this.map.addMarker({
              title: isi.nama,
              animation: 'DROP',
              position: {
                lat: isi.latitude,
                lng: isi.longitude
              }
            }
            )
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert(isi.keterangan)
                });
            });
    }
  }

}
