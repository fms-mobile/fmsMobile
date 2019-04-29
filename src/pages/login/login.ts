import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage } from 'ionic-angular';

import { AuthService } from '../../services/AuthService';
import { AuthGuardService } from '../../services/AuthGuardService';
import { ToastService } from '../../services/toast-service';
import { TransmissionService } from '../../services/transmisson-service';
import { UtilService } from '../../services/UtilService';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  ui: any = {
    user_id: "admin",
    pswd: "1",
  }; // 사용자 정보 
  chkAutoLogin: boolean = false;
  chkSaveUserId: boolean = false;
  isAutoLogin: boolean = false;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastService: ToastService,
    public authService: AuthService,
    public authGuardService: AuthGuardService,
    public transmissionService: TransmissionService,
    public utilService: UtilService,
  ) {

    if (this.authGuardService.canActivate()) {
      this.navCtrl.setRoot("DigrGroupPage");
    }
  }

  chgAutoLogin() {
    if (this.chkAutoLogin == false) {
      this.chkSaveUserId = false;
    } else {
      this.chkSaveUserId = true;
    }
  }

  chgSaveId() {
    if (this.chkSaveUserId == false) {
      this.chkAutoLogin = false;
    }
  }

  goLogin() {
    if (this.ui.user_id == "") {
      this.toastService.presentToast("아이디를 입력하여 주십시오.");
      return;
    }
    if (this.ui.pswd == "") {
      this.toastService.presentToast("비밀번호를 입력하여 주십시오.");
      return;
    }

    this.ui.chkAutoLogin = this.chkAutoLogin;
    let that = this;

    this.authService.login(that.ui).subscribe(res => {
      if (that.authGuardService.canActivate()) {
        if(that.utilService.isOnline) {
          that.transmissionService.syncAllData(null);
        }
        that.navCtrl.setRoot("DigrGroupPage");
      }
    });

  }

}
