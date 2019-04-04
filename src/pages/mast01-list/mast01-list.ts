import { BASTB_MAST01VO } from './../../model/BASTB_MAST01VO';
import { MANTB_DIGR01VO } from './../../model/MANTB_DIGR01VO';
import { Digr02ListPage } from './../digr02-list/digr02-list';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';
import { MANTB_DIGR12VO } from '../../model/MANTB_DIGR12VO';
import { MANTB_DIGR13VO } from '../../model/MANTB_DIGR13VO';
import { UtilService } from '../../services/UtilService';

/**
 * Generated class for the Mast01List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-mast01-list',
  templateUrl: 'mast01-list.html',
})
export class Mast01ListPage {
  public bastbMast01List : Array<BASTB_MAST01VO>;
  public numberOfItemsToDisplay : number = 10;
  digr01Group : DIGR01_GROUPVO;
  selectOptions : any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars:GlobalVars
    , private elementRef : ElementRef, public utilService : UtilService,public renderer :Renderer2,public viewCtrl: ViewController ) {
      this.digr01Group = navParams.data;
      this.selectOptions["multiple"] = true;
      this.goSearch();
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad Mast01List');
    this.selectOptions["AllItems"] = this.elementRef.nativeElement.querySelectorAll('ion-item');
  }

  goSearch(){
    let selectedIds = this.createSelectedIds();
    this.globalVars.db.bastbMast01.list001({"pagCount":this.numberOfItemsToDisplay,"selectedIds":selectedIds}, (res) => {
      this.bastbMast01List = res;
    });
    /* this.globalVars.db.bastbMast01.list001({"pagCount":"","selectedIds":selectedIds}, (res) => {
      this.bastbMast01List = res;
    }); */
  }

  createSelectedIds() : string {
    let selectedIds : Array<string> = new Array<string>();

    let selectedList : Array<BASTB_MAST01VO> = this.digr01Group.selectedMast01List;
    let i = 0;
    let len = selectedList.length;

    for(i;i<len;i++) {
      let selectedMast01 = selectedList[i];
      selectedIds.push("'"+selectedMast01.facil_no+"'");
    }
    
    return selectedIds.join(",");
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

  goSave(){
    let itemList = this.elementRef.nativeElement.querySelectorAll('ion-item');

    let i = 0;
    let selectMast01List = this.digr01Group.selectedMast01List;
    let item :any;

    for(i;i<itemList.length;i++) {
      item = itemList[i];

      if(item.classList.contains("selected")) {
        let mast01Item : BASTB_MAST01VO =  this.bastbMast01List[i];
        if(!this.digr01Group.matchSelectedMast01List(mast01Item)) {
          selectMast01List.push(mast01Item);
          let digr02 = new MANTB_DIGR01VO();
          digr02.facil_no = mast01Item.facil_no;
          this.digr01Group.digr02List.push(digr02);
        }
      }
    }

    this.viewCtrl.dismiss(null);  
  }
  
}
