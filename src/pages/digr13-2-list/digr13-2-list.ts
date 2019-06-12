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
  codeMap : { depth,array,data,code_prefix,indataCount,nodataCount } = {
    depth : "depth",
    array : "array",
    data : "data",
    code_prefix : "check_cd",
    indataCount : "indataCount",
    nodataCount : "nodataCount",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.digr01Group = navParams.get('digr01Group');
    this.index = navParams.get('index');
    this.digr02 = navParams.get('digr02');
    this.selectMast01 = navParams.get('selectMast01');

    this.dign1_checkObject = navParams.get('dign1_checkObject');
    this.dign1_checklist = navParams.get('dign1_checklist');
    this.digr13Array = navParams.get('digr13Array');
  }

  ionViewDidEnter(){
    this.countDigr13();
  }

  countDigr13() {
    let dign1_checkObject = this.dign1_checkObject;
    let digr13Array = this.digr13Array;
    let that = this;
    
    dign1_checkObject[this.codeMap.array].forEach(code2 => {
      let code2Group = dign1_checkObject[code2];
      let code2Array = code2Group[that.codeMap.array];
      let code2Data = code2Group[that.codeMap.data];
      let indataCount = 0;
      let nodataCount = code2Data.length;

      code2Data.forEach(data2 => {
        let digr13Data = digr13Array[data2.index];
        if(digr13Data.check_result != '') {
          indataCount += 1;
          nodataCount -= 1;
        }
      });

      code2Group[that.codeMap.indataCount] = indataCount;
      code2Group[that.codeMap.nodataCount] = nodataCount;
    });
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
      prevView:this.navParams.get('prevView'),
    });
  }

  gePrev() {
    this.navCtrl.pop();
  }

}
