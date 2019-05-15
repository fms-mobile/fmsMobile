import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR13DTO } from '../../model/MANTB_DIGR13DTO';

/**
 * Generated class for the Digr13_2ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-digr13-2-list',
  templateUrl: 'digr13-2-list.html',
})
export class Digr13_2ListPage {
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  index : number;
  digr02 : MANTB_DIGR01DTO;
  digr13Array : Array<MANTB_DIGR13DTO>;
  dign1_checklist : Array<any>;
  dign1_checkObject : Object;
  codeMap : { depth,array,data,code_prefix } = {
    depth : "depth",
    array : "array",
    data : "data",
    code_prefix : "check_cd",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.digr01Group = navParams.data.digr01Group;
    this.index = navParams.data.index;
    this.digr02 = navParams.data.digr02;
    this.selectMast01 = navParams.data.selectMast01;

    this.dign1_checkObject = navParams.data.dign1_checkObject;
    this.dign1_checklist = navParams.data.dign1_checklist;
    this.digr13Array = navParams.data.digr13Array;
  }
  
  goNext(dign1_checkObject){
    this.navCtrl.push("Digr13WritePage",{
      "digr01Group": this.digr01Group,
      digr02: this.digr02,
      index: this.index,
      selectMast01: this.selectMast01,
      dign1_checkObject: dign1_checkObject,
      dign1_checklist: this.dign1_checklist,
      digr13Array: this.digr13Array,
    });
  }

}
