import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';

import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';
import { AuthService } from '../../services/AuthService';
import { LoadingService } from '../../services/loading-service';

/**
 * Generated class for the Orgn11List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-orgn11-list',
  templateUrl: 'orgn11-list.html',
})
export class Orgn11ListPage {
  selectIndex : number;
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  digr11 : MANTB_DIGR11DTO;
  numberOfItemsToDisplay : number = 20;
  page : number = 0;
  isPaging : boolean = true;
  searchTerm : any = "";

  comtbOrgn11List : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public viewCtrl : ViewController, public globalVars:GlobalVars
     , public authService : AuthService, private loadingService: LoadingService,
     ) {
    this.digr01Group = navParams.get('digr01Group');
    this.selectIndex = navParams.get('index');
    this.digr11 = this.digr01Group.digr11List[this.selectIndex];
    this.comtbOrgn11List = Array<any>();
    this.goSearch(null);
  }

  goSearch($event){
    this.loadingService.show();
    let selectedIds = this.createSelectedIds();
    let that = this;
    let event = $event;
    let member_nm = this.searchTerm ? this.searchTerm : '';
    this.globalVars.db.comtbOrgn11.list002({"group_cd":this.authService.user.group_cd,"member_nm":member_nm
    ,"retire_yn":"Y",selectedIds:selectedIds, "start":this.page,"pagCount":this.numberOfItemsToDisplay
    }, (res) => {
      if(res.length > 0)  {
        that.comtbOrgn11List.push(...res);
        that.page = that.page + 1;
      } else {
        that.isPaging = false;
      }
      if(event) {
        event.complete();
      }
      that.loadingService.hide();
    });
  }

  createSelectedIds(){
    let selectedList : Array<MANTB_DIGR11DTO> = this.digr01Group.digr11List;
    return selectedList.map(data => "'"+data.member_seq+"'").join(",");
  }

  findOrgn11List(){
    this.comtbOrgn11List = new Array<any>();
    this.page = 0;
    this.goSearch(null);
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orgn11List');
  }

  select(orgn11 : any){
    this.viewCtrl.dismiss(orgn11);
  }
}
