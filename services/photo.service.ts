import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Photo } from '../interface/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[];
  // public pic: any;
  myPhoto: string;
  constructor(private camera: Camera, private alertCtrl: AlertController ,
              private loadingController: LoadingController , private toastController: ToastController,
              private storage: Storage) { }

  async takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    await this.camera.getPicture(options).then((imageData) => {
      // console.log((this.photos);
      this.myPhoto = 'data:image/jpeg;base64,' + imageData ;
      console.log(this.myPhoto);
      console.log(this.photos);
      // this.upload();
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
      // this.upload();
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);

    }, (err) => {
     // Handle error
     console.log('Camera issue: ' + err);
    });

  }

  async loadSaved(): Promise<Photo[]> {
    const promise = new Promise<Photo[]>((photoData, photoDatareject) => {
      try{
        this.storage.get('photos').then((photos) => {
          this.photos = photos || [];
          // photoData(this.photos);
        },
        (error) => {
          // photoDatareject(error);
        }
        );
        } catch (error) {
          // photoDatareject('error');
        }
        });
    return promise;
  }

  public async deletePicture(photo: Photo, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    this.storage.set('photos', JSON.stringify(this.photos));

    // delete photo file from filesystem
    // this.storage.remove(photo.webviewPath.lastIndexOf('/') + 1);

  }

  // deleteAll(key: string){
  //   //  delete all data from your application:
  //   this.storage.remove(key).then(() => {
  //     this.photos[key] = '';
  //   }).catch((error) => {
  //     console.log('removed error for ' + key + '', error);
  //   });
  // }

  upload(photo: Photo){
    const storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`resume/${filename}.jpg`);
    imageRef.putString(photo.data, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot) => {
        // Do something here when the data is succesfully uploaded!
        // console.log('uploaded');
        // this.presentLoading();
        this.presentToast();
      });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Picture is uploaded to Firebase.',
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Upload in process ! Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}

// interface Photo {
//   data: any;
// }
