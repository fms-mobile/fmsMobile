import { GlobalVars } from './../../services/GlobalVars';
import { MANTB_DIGR01DTO } from './../../model/MANTB_DIGR01DTO';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, ViewController, IonicPage } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';


/**
 * Generated class for the Digr02Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr02-write',
  templateUrl: 'digr02-write.html',
})
export class Digr02WritePage {
  selectIndex : number;
  state_gradeList : any = [];
  
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  digr02 : MANTB_DIGR01DTO;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public globalVars:GlobalVars,public utilService : UtilService, public modalCtrl: ModalController,public toastCtrl: ToastController, public viewCtrl: ViewController ) {
      this.digr01Group = navParams.data.digr01Group;
      this.selectIndex = navParams.data.index;

      this.selectMast01 = this.digr01Group.selectedMast01List[this.selectIndex];
      this.digr02 = this.digr01Group.digr02List[this.selectIndex];

      globalVars.db.comtbCode02.list002({code_group:"state_grade",data5 :"1"}, (res) => {
        this.state_gradeList = res;
      });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr02Write');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  goSave(){
    this.viewCtrl.dismiss();
  }

  goDigr02ListModal() {
    let digr02ListModal = this.modalCtrl.create("Digr02ListModalPage", this.digr01Group);
    digr02ListModal.present();

    let that = this;

    digr02ListModal.onWillDismiss((data: { digr01Group : DIGR01_GROUPDTO, index:number }) => {
      if(data != null){
        that.selectIndex = data.index;
        that.selectMast01 = data.digr01Group.selectedMast01List[data.index];
        that.digr02 = data.digr01Group.digr02List[data.index];
      }
    });
  }

  addDigr12WriteModal() {
    let digr12WriteModal = this.modalCtrl.create("Digr12WriteModalPage", {"digr01Group":this.digr01Group,"index":this.selectIndex});
    digr12WriteModal.present();
  }

  goPrev(){
    let prevIndex = this.selectIndex-1;
    let prevSelectMast01 = this.digr01Group.selectedMast01List[prevIndex];
    let prevDigr02 = this.digr01Group.digr02List[prevIndex];

    if(prevSelectMast01 && prevDigr02) {
      this.selectIndex = prevIndex;
      this.selectMast01 = prevSelectMast01;
      this.digr02 = prevDigr02;
    } else {
      this.utilService.showToast(this.toastCtrl, "처음 시설물입니다.",null);
    }
  }

  goNext(){
    /* let nextIndex = this.selectIndex+1;
    let nextSelectMast01 = this.digr01Group.selectedMast01List[nextIndex];
    let nextDigr02 = this.digr01Group.digr02List[nextIndex];

    if(nextSelectMast01 && nextDigr02) {
      this.selectIndex = nextIndex;
      this.selectMast01 = nextSelectMast01;
      this.digr02 = nextDigr02;
    } else {
      this.utilService.showToast(this.toastCtrl, "마지막 시설물입니다.",null);
    } */
    let thisView : ViewController = this.navCtrl.last();
    this.navCtrl.push("Digr13WritePage",{"digr01Group":this.digr01Group,"index":this.selectIndex,"prevView":thisView});
  }
}
