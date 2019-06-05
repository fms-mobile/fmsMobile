import { LoadingController, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  loading:Loading;
  constructor(private loadingCtrl: LoadingController) {}

  show(duration? : number) {
    duration = (duration) ? duration : 2000;
    this.loading = this.loadingCtrl.create({
        content: '잠시만 기다려주세요.',
        duration: duration,
    });
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }
}
