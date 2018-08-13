import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InputdataPage } from '../inputdata/inputdata';
/**
 * Generated class for the TampildataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tampildata',
  templateUrl: 'tampildata.html',
})
export class TampildataPage {
  public items : Array<any>;
    private _HOST : string       =  "http://192.168.43.52:8080/";
    constructor(public navCtrl     : NavController,
    private _TOAST       : ToastController,
    private _HTTP        : HttpClient)
    {}

    ionViewDidEnter() : void
    {
      this.retrieve();
    }

    deleteRecord(item : any) : void
    {
      let recordID     : string    = item._id,
      url         : any           = this._HOST + "api/gallery/" + recordID;
      this._HTTP
      .delete(url)
      .subscribe((data : any) =>
      {
        this.retrieve();
        this.displayNotification(data.records.nama + ' was successfully deleted');
      },
      (error : any) =>
      {
        console.dir(error);
      });
    } 

    retrieve() : void
    {
        this._HTTP
        .get(this._HOST + "api/gallery")
        .subscribe((data : any) =>
        {
         this.items = data.records;
        },
        (error : any) =>
        {
          console.dir(error);
        });
    }

    suka(item) : void
    {
        let id :    any        = item._id, 
        like         : any        = item.like,
        headers     : any     = new HttpHeaders({ 'Content-Type': 'application/json' }),
        //options       : any       = { nama : nama, kategori : kategori, keterangan : keterangan, latitude : latitude, longitude : longitude, gambar : gambar, displayed: displayed },
        options : any    ={like : like},
        url         : any         = this._HOST;
       
          this._HTTP
          .put(url + 'api/like/' + id, options, headers)
          .subscribe((data : any) =>
          {
              console.log('Berhasil');
          },
          (error : any) =>
          {
            console.dir(error);
          });
    }

    tidak(item) : void
    {
        let id :    any        = item._id, 
        dislike         : any        = item.dislike,
        headers     : any     = new HttpHeaders({ 'Content-Type': 'application/json' }),
        //options       : any       = { nama : nama, kategori : kategori, keterangan : keterangan, latitude : latitude, longitude : longitude, gambar : gambar, displayed: displayed },
        options : any    ={dislike : dislike},
        url         : any         = this._HOST;
       
          this._HTTP
          .put(url + 'api/dislike/' + id, options, headers)
          .subscribe((data : any) =>
          {
              console.log('Berhasil');
          },
          (error : any) =>
          {
            console.dir(error);
          });
    }


    updateRecord(item : any) : void
    {
      this.navCtrl.push(InputdataPage, { record : item });
    }


    displayNotification(message : string) : void
    {
      let toast = this._TOAST.create({
        message   : message,
        duration   : 3000
      });
      toast.present();
    }

    getItems(ev: any) {
        const val = ev.target.value;
        if (val && val.trim() != '') {
          this.items = this.items.filter((item: any) => {
            return (item.nama.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
    }

    refresh(rv:any){
      this.retrieve();
    }

}
