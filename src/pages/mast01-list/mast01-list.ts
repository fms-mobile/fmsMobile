import { BASTB_MAST01DTO } from './../../model/BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from './../../model/MANTB_DIGR01DTO';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { UtilService } from '../../services/UtilService';

/**
 * Generated class for the Mast01List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mast01-list',
  templateUrl: 'mast01-list.html',
})
export class Mast01ListPage {
  public bastbMast01List : Array<any>;
  public numberOfItemsToDisplay : number = 20;
  page : number = 0;
  digr01Group : DIGR01_GROUPDTO;
  isPaging : boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars:GlobalVars
    , public utilService : UtilService,public viewCtrl: ViewController ) {
      this.digr01Group = navParams.data;
      this.bastbMast01List = new Array<any>();
      this.goSearch(null);
  }

  goSearch($event){
    let selectedIds = this.createSelectedIds();
    let that = this;
    let event = $event;
    this.globalVars.db.bastbMast01.list001({"start":this.page,"pagCount":this.numberOfItemsToDisplay,"selectedIds":selectedIds}, (res) => {
      // 임시 수정 코드
      if(that.page == 2) {
        event.enable(false);
      }

      if(res.length > 0) {
        that.bastbMast01List.push(...res);
        that.page = that.page + 1;
      } else{
        that.isPaging = false;  
      }
      
      if(event) {
        event.complete();
      }
    });
  }

  selectItem(bastbMast01: any){
    bastbMast01.selected = !bastbMast01.selected;
  }

  createSelectedIds() : string {
    let selectedIds : Array<string> = new Array<string>();

    let selectedList : Array<BASTB_MAST01DTO> = this.digr01Group.selectedMast01List;
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
    let i = 0;
    let itemList = this.bastbMast01List;
    let selectMast01List = this.digr01Group.selectedMast01List;
    let item :any;

    for(i;i<itemList.length;i++) {
      item = itemList[i];

      if(item.selected) {
        let mast01Item : BASTB_MAST01DTO =  this.bastbMast01List[i];
        if(!this.digr01Group.matchSelectedMast01List(mast01Item)) {
          selectMast01List.push(mast01Item);
          let digr02 = new MANTB_DIGR01DTO();
          digr02.facil_no = mast01Item.facil_no;
          this.digr01Group.digr02List.push(digr02);
        }
      }
    }

    this.viewCtrl.dismiss(null);  
  }
  
}
