import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { MenuService } from '../../services/menu-service';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { TempDataManage } from '../../services/TempDataManage';
import { AuthGuardService } from '../../services/AuthGuardService';
import { TransmissionService } from '../../services/transmisson-service';
import { LoadingService } from '../../services/loading-service';
import { UtilService } from '../../services/UtilService';
import { AuthService } from '../../services/AuthService';

/**
 * Generated class for the Main page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [GlobalVars,MenuService],
})
export class MainPage {
  url : string;
  webUrl : string;
  mainPageMenu : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,public menuCtrl: MenuController
    ,public globalVars:GlobalVars, private menuService: MenuService, private tempDataManage : TempDataManage
    , public authGuardService: AuthGuardService, public transmissionService:TransmissionService, private alertCtrl : AlertController
    , private loadingService :LoadingService, private utilService :UtilService, private authService :AuthService, 
    ) {
    this.webUrl = globalVars.webUrl+"mobile";
    this.mainPageMenu = menuService.getMainPageMenu();
    // this.webUrl = globalVars.serverUrl;
  }

  logout(){
    const title = "로그 아웃";
    const content = "로그 아웃 하시겠습니까?";
    this.utilService.alertConfirm(title,content,()=>{
      this.loadingService.show(10000);
      this.authService.logout().then(()=>{
        this.loadingService.hide();
        this.navCtrl.setRoot("MainPage");
      });
    },()=>{
    });
  }

  login(){
    this.navCtrl.setRoot("LoginPage");
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  goIframePage(url :string, title : string){
    let fullUrl = this.webUrl + url;

    this.navCtrl.push("Iframe",{"url":fullUrl,"title":title});
  }

  goDigrGroupPage() {
    this.navCtrl.setRoot("LoginPage");
  }

  goWriteGroupPage() {
    if(this.authGuardService.canActivate()) {
      let digr01Group : DIGR01_GROUPDTO = this.tempDataManage.createDigr01Group();
      this.navCtrl.push("DigrTabWritePage",digr01Group);
    } else {
      this.goDigrGroupPage();
    }
  }

  goSyncData(){
    if(this.authGuardService.canActivate()) {
      this.loadingService.show(10000);
      this.transmissionService.syncAllData(null,null,true);
    } else{
      const alertTile = "로그인 에러";
      const alertMessage = "사용자 로그인을 먼저 해주세요.";

      let alert = this.alertCtrl.create({
        title: alertTile ,
        message: alertMessage,
        cssClass : "alert-warning",
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

  goDigrGroupHistroyList() {
    /* if(this.authGuardService.canActivate()) {
      const viewUrl = '/man21001_list.do';
      const title = '정기안전점검 이력 조회';
      let fullUrl = this.webUrl + viewUrl;

      this.navCtrl.push("Iframe",{"url":fullUrl,"title":title});
    } else {
      this.goDigrGroupPage();
    } */

    if(this.authGuardService.canActivate()) {
      this.navCtrl.setRoot("Man21001ListPage");
    } else {
      this.goDigrGroupPage();
    }
  }

  goAppSetting(){
    if(this.authGuardService.canActivate()) {
      let digr01Group : DIGR01_GROUPDTO = this.tempDataManage.createDigr01Group();
      this.navCtrl.push("AppSettingPage",digr01Group);
    } else {
      this.goDigrGroupPage();
    }
  }
}
