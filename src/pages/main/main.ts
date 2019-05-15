import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { MenuService } from '../../services/menu-service';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { TempDataManage } from '../../services/TempDataManage';
import { AuthGuardService } from '../../services/AuthGuardService';
import { TransmissionService } from '../../services/transmisson-service';

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
    , public authGuardService: AuthGuardService, public transmissionService:TransmissionService,
    ) {
    this.webUrl = globalVars.webUrl+"mobile";
    this.mainPageMenu = menuService.getMainPageMenu();
    // this.webUrl = globalVars.serverUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Main');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  goIframePage(url :string, title : string){
    let fullUrl = this.webUrl + url;

    this.navCtrl.push("Iframe",{"url":fullUrl,"title":title});
    // this.menuCtrl.close();
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

}
