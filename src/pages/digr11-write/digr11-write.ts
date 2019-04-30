import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, ViewController } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';
import { UtilService } from '../../services/UtilService';

/**
 * Generated class for the Digr11Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr11-write',
  templateUrl: 'digr11-write.html',
})
export class Digr11WritePage {
  digr01Group : DIGR01_GROUPDTO;
  index : number;
  digr11 : MANTB_DIGR11DTO;
  tech_gradeList: Array<any>;
  isOigr11 : boolean = false; 

  constructor(public navCtrl: NavController, public navParams: NavParams,globalVars: GlobalVars, 
    public utilService:UtilService,public modalCtrl: ModalController,public viewCtrl: ViewController) {
     
    this.digr01Group = navParams.data.digr01Group;
    this.index = navParams.data.index;

    this.digr11 = this.digr01Group.digr11List[this.index];

    if(this.digr11 === undefined) {
      this.digr11 = new MANTB_DIGR11DTO();
      this.digr01Group.digr11List.push(this.digr11);
      this.index = this.digr01Group.digr11List.length;
    }

    globalVars.db.comtbCode02.list002({code_group:"tech_grade",}, (res) => {
      this.tech_gradeList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr11Write');
  }

  goOigr11List() {
    this.isOigr11 = true;
    let orgn11ListPage = this.modalCtrl.create("Orgn11ListPage",{"digr01Group":this.digr01Group,"index":this.index});
    orgn11ListPage.present();

    orgn11ListPage.onWillDismiss((data: any ) => {
      if(data != null){
        this.digr11.engineer_nm = data.member_nm;
        this.digr11.birth_ymd = data.birth_ymd;
        this.digr11.sex = data.sex;
        this.digr11.tech_grade = data.tech_grade;
        this.digr11.tech_grade_nm = data.tech_grade_nm;
      }
      this.isOigr11 = false;
    });
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

  goSave(){
    this.viewCtrl.dismiss(null);
  }

  async ionViewCanLeave() {
    const shouldLeave = await this.confirmLeave();
    return shouldLeave;
  }

  confirmLeave(){
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);

    if(!this.validateDigr11() && !this.isOigr11) {
      const alertTile = "삭제 알림";
      const alertMessage = "기술자 필수정보를 입력하지 않아 기술자 정보 데이터가 삭제됩니다. 삭제하시겠습니까?";
      this.utilService.alertConfirm(alertTile,alertMessage,() => {
        this.digr01Group.digr11List.pop();
        resolveLeaving(true);
      },()=>{
        resolveLeaving(false);
      });
    } else {
      resolveLeaving(true);
    }
    return canLeave;
  }

  validateDigr11() : boolean{
    let isValidate = true;
    if(this.digr11.engineer_nm == "") {
      isValidate = false;
    }

    return isValidate;
  }
}
