import { DigrGroupPage } from './../digr-group/digr-group';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { GlobalVars } from '../../services/GlobalVars';
import { UtilService } from '../../services/UtilService';
import { WebDataProvider } from '../../providers/WebDataProvider';

//import { ListPage } from '../home/list';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  ui: any = {
    user_id : "",
    pswd : "",
  }; // 사용자 정보 
  chkAutoLogin: boolean = false;
  chkSaveUserId: boolean = false;
  isAutoLogin:boolean = false;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public storage: Storage,
              public globalVars: GlobalVars,
              public utilService: UtilService,
              public webData: WebDataProvider,
              public http: HttpClient) {

              this.storage.get('saveLoginInfo').then((val) => {
                let strgLoginInfo = val;
                if (strgLoginInfo) {
                  this.chkAutoLogin = strgLoginInfo.chkAutoLogin;
                  this.chkSaveUserId = strgLoginInfo.chkSaveUserId;
  
                  if (this.chkSaveUserId == false) {
                      this.chkAutoLogin = false;
                  }
                  this.isAutoLogin = this.chkAutoLogin;
                  if (strgLoginInfo.chkSaveUserId) {
                      this.ui.user_id = strgLoginInfo.saveUserId;
                      this.ui.corp_id = strgLoginInfo.saveUserCorpId;
                  }
                  if (strgLoginInfo.chkSaveUserId == true && this.chkAutoLogin == true && this.ui.user_id !="" && strgLoginInfo.saveUserPw != "") {
                      // 자동로그인 처리
                      this.ui.pswd = strgLoginInfo.saveUserPw;
                      setTimeout(() => { this.goLogin(); }, 100);
                  } else {
                      this.isAutoLogin = false;
                      this.ui.pswd = "";
                  }
                }
              });
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
      this.utilService.showToast(this.toastCtrl, "아이디를 입력하여 주십시오.", null);
      return;
    }
    if (this.ui.pswd == "") {
      this.utilService.showToast(this.toastCtrl, "비밀번호를 입력하여 주십시오.", null);
      return;
    } 
 
    this.navCtrl.setRoot(DigrGroupPage);
    /*
    this.navCtrl.setRoot(AssetsPage);
    // 서버가 있을 경우 로그인 처리
    if (this.utilService.isOnline()) {
      var me = this;
      let loading = this.utilService.showLoading("로그인 중입니다.");
      this.webData.comWork('login', this.ui).subscribe(data => {
        if (data.isOk == "Y") {
          this.globalVars.isLogin = true; // 로그인 상태 
          this.globalVars.setUserInfo(data.userInfo);
          if (this.chkAutoLogin == true) {
            this.chkSaveUserId = true;
          }
          // 로컬 storage 저장
          let saveLoginInfo = {
            chkAutoLogin: this.chkAutoLogin,
            chkSaveUserId: this.chkSaveUserId,
            saveUserId: this.ui.user_id,
            saveUserPw: this.ui.pswd
          };
          this.storage.set('saveLoginInfo', saveLoginInfo);
          
          // 서버에서 코드자료 조회
          me.webData.comWork('ass01001_codelist', {}).subscribe(data => {
            me.globalVars.deptList = data.deptList;
            me.globalVars.statCodeList = data.statCdList;
          });

          this.navCtrl.setRoot(AssetsPage);
        } else if (data.isOk == "N") {
          this.utilService.showToast(this.toastCtrl, data.errMsg, null);
        }
        loading.dismiss();
      }, error => {
        this.utilService.showToast(this.toastCtrl, "서비스에 문제가 있습니다.\n잠시 후 다시 시도하여 주십시오.", null);
        loading.dismiss();
        console.log("http call error handling");
      });
    }
      */
  }
}
