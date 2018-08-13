import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';

@Injectable()
export class ImageProvider {
	public cameraImage : String
	constructor(public http     : HttpClient,
		private _CAMERA : Camera)
	{	}
    takePhotograph() : Promise<any>
    {
    	return new Promise(resolve =>
    	{
    		this._CAMERA.getPicture(
    		{
    			destinationType : this._CAMERA.DestinationType.DATA_URL,
    			targetWidth     : 640,
    			targetHeight    : 480
    		})
    		.then((data) =>
    		{
    			this.cameraImage  = "data:image/jpeg;base64," + data;
    			resolve(this.cameraImage);
    		});
    	});
    }
}
