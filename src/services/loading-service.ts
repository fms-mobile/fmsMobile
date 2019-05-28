import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  loading:any;
  constructor(private loadingCtrl: LoadingController) {}

  show() {
    this.loading = this.loadingCtrl.create({
        content: '잠시만 기다려주세요.',
        duration: 2000,
    });
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }
}
