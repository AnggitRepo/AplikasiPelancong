import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public items : Array<any>;
    private _HOST : string       =  "http://192.168.43.52:8080/";
    constructor(public navCtrl 		: NavController,
    private _HTTP        : HttpClient)
    {
        this.retrieve();
    } 
    retrieve() : void
    {
        this._HTTP
        .get(this._HOST + "api/populer")
        .subscribe((data : any) =>
        {
         this.items = data.records;
        },
        (error : any) =>
        {
          console.dir(error);
        });
    }
}

