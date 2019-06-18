import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { AuthGuardService } from '../../services/AuthGuardService';
import { ToastService } from '../../services/toast-service';
import { TransmissionService } from '../../services/transmisson-service';
import { UtilService } from '../../services/UtilService';
import { GlobalVars } from '../../services/GlobalVars';
import { TempDataManage } from '../../services/TempDataManage';
import { LoadingService } from '../../services/loading-service';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs';

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
    //user_id: "chonju",
    // user_id: 'arch2team',
    user_id: 'kijang1',
    pswd: "1",
  }; // 사용자 정보 
  chkAutoLogin: boolean = false;
  chkSaveUserId: boolean = false;
  chkSaveUserPW: boolean = false;
  isAutoLogin: boolean = false;
  connected : Subscription;
  disconnected : Subscription;
  isOnline : boolean = false;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastService: ToastService,
    public authService: AuthService,
    public authGuardService: AuthGuardService,
    public transmissionService: TransmissionService,
    public utilService: UtilService,
    public globalVars:GlobalVars,
    public tempDataManage : TempDataManage,
    public loadingService :LoadingService,
    private alertCtrl :  AlertController,
    private network : Network,
  ) {

    this.isOnline = (network.type == 'unknown' || network.type == 'none') ? false : true;

    let chkSaveUserId = Boolean(JSON.parse(localStorage.getItem("chkSaveUserId")));
    let user_id = localStorage.getItem("user_id");
    if(chkSaveUserId && user_id){
      this.ui.user_id = user_id;
      this.chkSaveUserId = chkSaveUserId;
    }

    if (this.authGuardService.canActivate()) {
      globalVars.db.comtbUser01.list001({"user_id":authService.user.sub},(res) => {
        globalVars.setUserInfo(res[0]);
      });
      this.tempDataManage.loadLoctbData01().then(()=>{
        this.navCtrl.viewWillLeave.subscribe(()=>{
          this.tempDataManage.autoSave();
        });
      });
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

  ionViewDidEnter() {
    this.connected = this.network.onConnect().subscribe(data => {
      this.checkNetwork(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      this.checkNetwork(data.type);
    }, error => console.error(error));

  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  checkNetwork(connectionState:string){
    if(connectionState.indexOf('online') > -1) this.isOnline = true;
    if(connectionState.indexOf('offline') > -1) this.isOnline = false;
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

    if(this.chkSaveUserId){
      localStorage.setItem("chkSaveUserId",JSON.stringify(this.chkSaveUserId));
      localStorage.setItem("user_id",this.ui.user_id);
    } else {
      localStorage.removeItem("chkSaveUserId");
      localStorage.removeItem('user_id')
    }
      
    this.ui.chkAutoLogin = this.chkAutoLogin;
    let that = this;
    
    if(this.isOnline) {
      this.authService.login(that.ui).take(1).subscribe(res => {
        if (that.authGuardService.canActivate()) {
          if(that.utilService.isOnline) {
            that.transmissionService.syncAllData(null,res["token"]);
          }
          that.tempDataManage.loadLoctbData01();
          that.navCtrl.setRoot("DigrGroupPage");
        }
      });
    } else {
      const alertTile = "로그인 에러";
      const alertMessage = '네트워크 연결여부를 확인해주세요.';
      let alert = this.alertCtrl.create({
          title: alertTile ,
          message: alertMessage,
          cssClass : "alert-error",
          buttons: [
          {
              text: '확인',
              handler: () => {
              }
          }
          ]
      });
      alert.present();
    }

  }
}
