import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { MANTB_DIGR13DTO } from '../../model/MANTB_DIGR13DTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { UtilService } from '../../services/UtilService';
import { GlobalVars } from '../../services/GlobalVars';
import { LoadingService } from '../../services/loading-service';

/**
 * Generated class for the Digr13_1ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-digr13-1-list',
  templateUrl: 'digr13-1-list.html',
})
export class Digr13_1ListPage {
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public globalVars: GlobalVars
    ,public utilService : UtilService,public toastCtrl: ToastController, private loadingService:LoadingService) {
    this.digr01Group = navParams.get('digr01Group');
    this.index = navParams.get('index');
    this.digr02 = this.digr01Group.digr02List[this.index];
    this.selectMast01 = this.digr01Group.selectedMast01List[this.index];
    loadingService.show();
    this.searchList02();
  }

  ionViewDidEnter(){
    this.countDigr13();
  }

  searchList02(){
    let that = this;
    return new Promise(function (resolve, reject) {
      that.globalVars.db.mantbDigr13.list002({"facil_no":that.digr02.facil_no,facil_class:that.selectMast01.facil_class}, (res) => {
        that.dign1_checklist = res;
        // that.dign1_checkObject = that.makeDign1_checklist(res, 1);
        that.dign1_checkObject = that.makeDign1_checklist(res);
        resolve(that.dign1_checklist);
      });
    }).then((res : [{}]) => {
      let facil_no = that.digr02.facil_no;
      let createFlag : boolean = false;
      let tempArray : Array<MANTB_DIGR13DTO> = that.digr02.digr13Array;
      if(tempArray.length < 1 ) {
        createFlag = true;
      }

      if(createFlag) {
        let digr13Array = new Array<MANTB_DIGR13DTO>();
        res.forEach((dign_check : any ,index) => {
          let digr13 = new MANTB_DIGR13DTO();
          digr13.facil_no = facil_no; 
          digr13.check_seq = index; 
          digr13.check_cd = dign_check.check_cd;
          digr13Array.push(digr13);
        });

        that.digr02.digr13Array = digr13Array;
        that.digr13Array = that.digr02.digr13Array;
      } else {
        that.digr13Array = tempArray;
      }
    }).then(()=> {
      that.countDigr13();
      that.loadingService.hide();
    });
  }

  countDigr13(){
    let digr13Array = this.digr13Array;
    let dign1_checkObject = this.dign1_checkObject;
    let that = this;

    dign1_checkObject[this.codeMap.array].forEach(code1 => {
      let code1Group = dign1_checkObject[code1];
      let code1Array = code1Group[that.codeMap.array];
      let code1Data = code1Group[that.codeMap.data];
      let indataCount = 0;
      let nodataCount = code1Data.length;

      code1Data.forEach(data1 => {
        let digr13Data = digr13Array[data1.index];
        if(digr13Data.check_result != '') {
          indataCount += 1;
          nodataCount -= 1;
        }
      });

      code1Group[that.codeMap.indataCount] = indataCount;
      code1Group[that.codeMap.nodataCount] = nodataCount;
    });
  }

  /**
   *  데이터 구조
   *  dign1_checkObj
   *  {
   *    "depth" : number,
   *    "array" : Array<string>,
   *    "data" : Array<any>,
   *    code : dign1_checkObj
   *  } 
   */
  makeNewDign1_checkObject(depth : number) : Object  {
    let returnObject : Object = new Object;
    returnObject[this.codeMap.depth] = depth;
    returnObject[this.codeMap.array] = new Array<string>();
    returnObject[this.codeMap.data] = new Array<any>();

    return returnObject;
  }

  makeDign1_checklist(res : Array<any>) : Object {
    let returnObject : Object = this.makeNewDign1_checkObject(1);

    // depth-1
    res.forEach((dign1_check : any, i : number)=> {
      if(dign1_check.check_cd1) {
        let array : Array<string> = returnObject[this.codeMap.array];
        if(array.indexOf(dign1_check.check_cd1) == -1){
          array.push(dign1_check.check_cd1);
          let code2Object : Object = this.makeNewDign1_checkObject(2);
          returnObject[dign1_check.check_cd1] = code2Object;
        }
      }
      let data : Array<any> = returnObject[this.codeMap.data];
      if(data.indexOf(dign1_check) == -1) {
        data.push(dign1_check);
      }
    });

    // depth-2
    res.forEach((dign1_check : any, i : number)=> {
      if(dign1_check.check_cd2) {
        let array : Array<string> = returnObject[dign1_check.check_cd1][this.codeMap.array];
        if(array.indexOf(dign1_check.check_cd2) == -1){
          array.push(dign1_check.check_cd2);
          let code3Object : Object = this.makeNewDign1_checkObject(3);
          returnObject[dign1_check.check_cd1][dign1_check.check_cd2] = code3Object;
        }
      }
      let data : Array<any> = returnObject[dign1_check.check_cd1][this.codeMap.data];
      if(data.indexOf(dign1_check) == -1) {
        data.push(dign1_check);
      }
    });

    // depth-3
    res.forEach((dign1_check : any, i : number)=> {
      if(dign1_check.check_cd3) {
        let array : Array<string> = returnObject[dign1_check.check_cd1][dign1_check.check_cd2][this.codeMap.array];
        if(array.indexOf(dign1_check.check_cd3) == -1){
          array.push(dign1_check.check_cd3);
          let code4Object : Object = this.makeNewDign1_checkObject(4);
          returnObject[dign1_check.check_cd1][dign1_check.check_cd2][dign1_check.check_cd3] = code4Object;
        }
      }
      let data : Array<any> = returnObject[dign1_check.check_cd1][dign1_check.check_cd2][this.codeMap.data];
      if(data.indexOf(dign1_check) == -1) {
        data.push(dign1_check);
      }
    });

    // depth-4
    res.forEach((dign1_check : any, i : number)=> {
      if(dign1_check.check_cd4) {
        let array : Array<string> = returnObject[dign1_check.check_cd1][dign1_check.check_cd2][dign1_check.check_cd3][this.codeMap.array];
        if(array.indexOf(dign1_check.check_cd4) == -1){
          array.push(dign1_check.check_cd4);
          let code5Object : Object = this.makeNewDign1_checkObject(5);
          returnObject[dign1_check.check_cd1][dign1_check.check_cd2][dign1_check.check_cd3][dign1_check.check_cd4] = code5Object;
        }
      }
      if(dign1_check.check_cd3){
        let data : Array<any> = returnObject[dign1_check.check_cd1][dign1_check.check_cd2][dign1_check.check_cd3][this.codeMap.data];
        if(data.indexOf(dign1_check) == -1) {
          data.push(dign1_check);
        }
      }
    });

    return returnObject;
  }

  __makeDign1_checklist(res : Array<any>,depth :number,searchCode ?:string|undefined) : Object {
    if(depth == 5) return null;

    let returnObject : Object = this.makeNewDign1_checkObject(depth);
    const nextDepth = depth + 1;
    
    let array : Array<string> = returnObject[this.codeMap.array];
    let data : Array<any> = returnObject[this.codeMap.data];

    res.forEach((dign1_check : any, i : number)=> {
      let code : string = dign1_check[this.codeMap.code_prefix + depth];

      if(code != "") {
        if(searchCode) {
          let prevCode : string = dign1_check[this.codeMap.code_prefix + (depth-1)];
          if(prevCode == searchCode) {
            data.push(dign1_check);
            if(array.indexOf(code) == -1) {
              array.push(code);
            }    
          }
        } else {
          data.push(dign1_check);
          if(array.indexOf(code) == -1) {
            array.push(code);
          }
        }
      }
    });

    let isContinue : boolean = (data.length > 0) ? true : false;

    if(isContinue) {
      array.forEach((arrayCode : any, i : number)=> {
      
        let childReturnObject : Object = this.__makeDign1_checklist(data,nextDepth,arrayCode);
        if(childReturnObject != null){
          returnObject[arrayCode] = childReturnObject;
        }
      });
    } else {
      returnObject = null;
    }

    return returnObject;
  }

  goDigr02ListModal(){
    let digr02ListModal = this.modalCtrl.create("Digr02ListModalPage", this.digr01Group);
    digr02ListModal.present();

    let that = this;

    digr02ListModal.onWillDismiss((data: { digr01Group : DIGR01_GROUPDTO, index:number }) => {
      if(data != null){
        that.index = data.index;
        that.selectMast01 = data.digr01Group.selectedMast01List[that.index];
        that.digr02 = data.digr01Group.digr02List[that.index];
        that.searchList02();
      }
    });
  }

  goDigr13SelectModal(digr13: MANTB_DIGR13DTO){
    let digr13SelectModal = this.modalCtrl.create("Digr13SelectModalPage", {"digr01Group":this.digr01Group,"digr13":digr13});
    digr13SelectModal.present();
  }

  goNext(dign1_checkObject){
    let nextPage;

    if(dign1_checkObject[this.codeMap.data].length == dign1_checkObject[this.codeMap.array].length){
      nextPage = 'Digr13WritePage';
    } else{
      nextPage = 'Digr13_2ListPage';
    }

    this.navCtrl.push(nextPage,{
      "digr01Group": this.digr01Group,
      digr02: this.digr02,
      index: this.index,
      selectMast01: this.selectMast01,
      dign1_checkObject: dign1_checkObject,
      dign1_checklist: this.dign1_checklist,
      digr13Array: this.digr13Array,
      prevView:this.navCtrl.last(),
    });
  }
}
