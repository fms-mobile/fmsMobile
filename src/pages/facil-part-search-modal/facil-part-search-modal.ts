import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';

import { GlobalVars } from '../../services/GlobalVars';

import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { LoadingService } from '../../services/loading-service';
/**
 * Generated class for the FacilPartSearchModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-facil-part-search-modal',
  templateUrl: 'facil-part-search-modal.html',
})
export class FacilPartSearchModalPage {
  selectIndex : number;
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  // digr02 : MANTB_DIGR01DTO;
  // digr12 : MANTB_DIGR12DTO;
  selectFacilPart : any;

  facil_partList : Array<any>;
  facil_gbn : any;
  struct_kind: any;

  part_class : any = "";
  part_class1 : any = "";
  part_class2 : any = "";
  part_detail : any;
  isPartNmUser : boolean = false;
  part_nm_user : any;
  searchFacilPart : any;
  part_codeList : any = {
    AR: {
      part_class1: {
        text: "층구분",
        codeList: [
          { value : "G", text : "지상" },
          { value : "B", text : "지하" },
          { value : "T", text : "옥탑" },
          { value : "R", text : "지붕층" },
          { value : "S", text : "옥상층" },
          { value : "U", text : "외부" },
          { value : "O", text : "지반/기초" },
          { value : "E", text : "기타" },
        ]
      },
      part_class2 : {
        text: "층",
      }
    },
    BR: {
      part_class1: {
        text: "",
        codeList: [
          { value : "S", text : "경간(S)" },
          { value : "A", text : "지점(A)" },
          { value : "P", text : "지점(P)" },
        ]
      },
      part_class2 : {
        text: "경간(지점)번호",
      }
    },
    DA: {
      part_class: {
        text: "",
        codeList: [
          { value : "A", text : "댐체" },
          { value : "B", text : "여수로" },
          { value : "C", text : "비월류부" },
          { value : "D", text : "월류부" },
          { value : "E", text : "기타시설" },
          { value : "M", text : "기전설비" },
        ]
      },
    },
    ED: {
      part_class: {
        text: "",
        codeList: [
          { value : "A", text : "방조제" },
          { value : "B", text : "배수(갑)문" },
          { value : "C", text : "접속교량" },
          { value : "M", text : "기전설비" },
          { value : "Z", text : "부대시설" },
        ]
      },
    },
    HL: {
      part_class: {
        text: "",
        codeList: [
          { value : "K", text : "갑거시설" },
          { value : "Z", text : "기타시설" },
          { value : "M", text : "기전설비" },
        ]
      },
    },
    RW: {
      part_class1: {
        text: "",
        codeList: [
          { value : "S", text : "" },
        ]
      },
      part_class2 : {
        text: "Span No",
      }
    },
    SL: {
      part_class1: {
        text: "",
        codeList: [
          { value : "S", text : "" },
        ]
      },
      part_class2 : {
        text: "Span No",
      }
    },
    ST: {
      part_class: {
        text: "",
        codeList: [
          { value : "A", text : "토목구조물" },
          { value : "B", text : "건축구조물" },
          { value : "Z", text : "옹벽" },
        ]
      },
    },
    TU: {
      part_class: {
        text: "",
        codeList: [
          { value : "L", text : "라이닝" },
          { value : "X", text : "터널주변" },
          { value : "Z", text : "부대시설" },
        ]
      },
    },
    UC: {
      part_class: {
        text: "",
        codeList: [
          { value : "L", text : "공동구" },
          { value : "X", text : "공동구주변" },
          { value : "Z", text : "부대시설" },
        ]
      },
    },
    UR: {
      part_class: {
        text: "",
        codeList: [
          { value : "L", text : "기본시설" },
          { value : "X", text : "부대시설" },
        ]
      },
    },
    WS: {
      part_class: {
        text: "",
        codeList: [
          { value : "A", text : "관로시설" },
          { value : "B", text : "토목구조물" },
          { value : "C", text : "건축구조물" },
          { value : "D", text : "수원지시설(댐)" },
          { value : "M", text : "기전설비" },
        ]
      },
    },
  };

  inputYList : Array<any> = new Array<any>();
  inputNList : Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public globalVars:GlobalVars,
    public utilService : UtilService, private loadingService : LoadingService
    ) {

    this.digr01Group = navParams.get('digr01Group');
    this.selectIndex = navParams.get('index');
    // this.digr12 = navParams.get('digr12');
    this.selectFacilPart = navParams.get('facilPart') ? navParams.get('facilPart') : {};
    
    if(navParams.get('facilPart')) {
      this.isPartNmUser = true;
      //this.part_nm_user = this.selectFacilPart.part_nm;
    }

    this.part_class = (this.selectFacilPart.part_class) ? this.selectFacilPart.part_class : null;
    this.part_class1 = (this.selectFacilPart.part_class1) ? this.selectFacilPart.part_class1 : null;
    this.part_class2 = (this.selectFacilPart.part_class2) ? this.selectFacilPart.part_class2 : null;
    this.part_detail = (this.selectFacilPart.part_detail) ? this.selectFacilPart.part_detail : "";
    // this.digr02 = navParams.get('digr02');
    this.selectMast01 = navParams.get('selectMast01');
    let facil_gbn = this.selectMast01.facil_no.slice(0,2);

    switch(facil_gbn) {
      case "CS": {
        facil_gbn = "BR";
        break;
      }
      case "EB": {
        facil_gbn = "ED";
        break;
      }
      case "UR": {
        facil_gbn = "TU";
        break;
      }
      default : {
        break;
      }
    }

    let entity_type = "BJ"
    
    if("TU,WS,UC".indexOf(facil_gbn) >= 0) entity_type = "SP";

    let struct_kind = "";
    /**
     * String struct_kind = "";
     *
     **/ 
    if(facil_gbn == 'DA') {
      if(this.selectMast01.facil_spec1.indexOf("필댐") >= 0) { struct_kind = "P"; }
      else if(this.selectMast01.facil_spec1.indexOf("콘크리트댐") >= 0) { struct_kind = "C"; }
      else if(this.selectMast01.facil_spec1.indexOf("복합댐") >= 0) { struct_kind = "M"; }
    }

    this.facil_gbn = facil_gbn;
    this.struct_kind = struct_kind;

    this.loadingService.show();
    globalVars.db.bastbMeta01.list002({"entity_type":entity_type,"entity_id" :facil_gbn}, (res) => {
      let length = res.length;
      res.forEach((bastbMeta01,index)=> {
        if(struct_kind != "") {
          if(bastbMeta01.struct_kind == "" && bastbMeta01.struct_kind.indexOf(struct_kind) < 0 ) {
            res.pop(bastbMeta01);
          }
        } else {
          if(bastbMeta01.part_nm == "조사망번호") {
            res.pop(bastbMeta01);
          }
        }

        bastbMeta01.isOk = (bastbMeta01.input_yn == 'Y') ? true : false;
        // 기존 로직 적용
        if(!bastbMeta01.isOk) {
          if(index == length - 1) { 
            bastbMeta01.isOk = true; 
          }else {
            bastbMeta01.isOk = (bastbMeta01.ranking >= res[index+1].ranking ) ? true : false; 
          }
        }

      });
      
      this.facil_partList = [];
      let that = this;
      new Promise((resolve, reject) => {
        that.makeFacilPartList(res,that.facil_partList);
        that.checkLastNode(that.facil_partList);
        that.inputYList = that.facil_partList.filter(facil_part => facil_part.isOk == true);
        that.inputNList = that.facil_partList.filter(facil_part => facil_part.isOk == false);
        resolve(that);
      }).then((that:any)=>{
        that.loadingService.hide();
        /* if(that.searchFacilPart){
          that.nodeClick(that.searchFacilPart);
        } */
      });
    });
    
  }

  makeFacilPartList(facil_partList : Array<any>,returnList :Array<any>) {
    facil_partList.forEach((bastbMeta01,index) => {
      // console.log(bastbMeta01.part_cd+' : '+index);
      let parentBastbMeta01 = this.findParentFacilPartList(returnList,bastbMeta01);
      bastbMeta01.children = [];

      if(bastbMeta01.part_cd == this.selectFacilPart.part_cd) {
        this.searchFacilPart = bastbMeta01;
      }
      
      if(bastbMeta01.upper_cd == null || bastbMeta01.upper_cd == this.facil_gbn) {
        returnList.push(bastbMeta01);
      } else {
        if(!parentBastbMeta01) {
        } else {
          //bastbMeta01.parentNode = parentBastbMeta01;
          if(parentBastbMeta01.children) {
            parentBastbMeta01.children.push(bastbMeta01);
          } else {
            parentBastbMeta01.children.push(bastbMeta01);
          }
        }
      }
    });
  }

  findParentFacilPartList(facil_partList : Array<any>, srcBastbMeta01) {
    let src_upper_cd = srcBastbMeta01.upper_cd;
    let flag = false;
    let parentBastbMeta01;

    facil_partList.forEach((trgBastbMeta01,index) => {
      if(trgBastbMeta01.part_cd == src_upper_cd) {
        flag = true;
        parentBastbMeta01 = trgBastbMeta01;
      }
    });

    if(flag) {
      return parentBastbMeta01;
    } else {
      facil_partList.forEach((trgBastbMeta01,index) => {
        let data  = this.findParentFacilPartList(trgBastbMeta01.children,srcBastbMeta01);
        if(data) {
          parentBastbMeta01 = data;
          return false;
        }
      });
      return parentBastbMeta01;
    }
  }

  checkLastNode(facil_partList : Array<any>) {
    let totalList = this.facil_partList;
    facil_partList.forEach(facil_part => {
      if(facil_part.children.length < 1) {
        let parentBastbMeta01 = this.findParentFacilPartList(totalList,facil_part);
        if(parentBastbMeta01) parentBastbMeta01.isLastListNode = true;
      } else {
        this.checkLastNode(facil_part.children);
      }
    });
  }

  /* nodeClick(facil_part : any){
    this.toggleSection(facil_part);
    this.selectedNode(facil_part);
  }

  toggleSection(facil_part : any) {
    if(facil_part.children.length > 0) {
      facil_part.open = !facil_part.open;
    } 
    if(facil_part.parentNode) {
      if(!facil_part.parentNode.open) {
        this.toggleSection(facil_part.parentNode);
      }
    }
  }

  selectedNode(facil_part : any) {
    this.initSelected(this.facil_partList);
    if(facil_part.children.length > 0) {
    } else {
      facil_part.selected = true;
      this.selectFacilPart = facil_part;
    }
  }

  initSelected(facil_partList : Array<any>) {
    facil_partList.forEach((bastbMeta01,index) => {
      bastbMeta01.selected = false;
      if(bastbMeta01.children.length > 0) {
        this.initSelected(bastbMeta01.children);
      }
    });
  } */

  selectFacilPartBind(facil_part) {
    if(facil_part =="new") {
      this.selectFacilPart = {part_cd:'new'};
      this.isPartNmUser = true;
    } else {
      this.selectFacilPart = facil_part;
      this.isPartNmUser = false;
    }
  }

  validateObject() :{passFlag : boolean ,msg: string} {
    let returnObject : {passFlag : boolean ,msg: string} = {passFlag:true,msg:''};
    let passFlag = true;
    let msg = "";

    // MANTB_DIGR01 체크
    let selectFacilPart = this.selectFacilPart;
    while (true) {
      if(!selectFacilPart) {
          passFlag = false;
          msg = '부위/부재를 선택해주세요.';
          break;
      }

      let facil_form_cd = this.facil_gbn;
      if(facil_form_cd == 'AR') {
        if(!this.part_class1 || this.part_class1 == ''){
          passFlag = false;
          msg = '위치구분을 선택해주세요.';
          break;
        }

        if('G,B,T'.indexOf(this.part_class1) >= 0 && (!this.part_class2 || this.part_class2 == '')) {
          passFlag = false;
          msg = '층을 입력해주세요.';
          break;
        }
      }else if(facil_form_cd == 'BR') {
        if(!this.part_class2 || this.part_class2 == '') {
          passFlag = false;
          msg = '경간(지점)번호를 입력해주세요.';
          break;
        }
      }else if('RW,SL'.indexOf(facil_form_cd) >= 0) {
        if(!this.part_class2 || this.part_class2 != '') { 
          passFlag = false;
          msg = '경간(지점)번호를 입력해주세요.';
          break;
        }
      }else {
        if(this.part_class != '' && this.part_class2 != '') { 
        }
      }
      break;
    }

    returnObject["passFlag"] = passFlag;
    returnObject["msg"] = msg;
    return returnObject;
  }

  goSave(){
    let validate = this.validateObject();
    if(false){

    } else {
      this.makePart_nm();
      this.selectFacilPart.part_detail = this.part_detail;
      this.viewCtrl.dismiss({facilPart:this.selectFacilPart});
    }

  }

  makePart_nm() {
    // 기존로직 적용
    let facil_form_cd = this.facil_gbn;
    let part_class : string;
    let part_nm : string = '';

    if(this.isPartNmUser) {
      part_nm = this.part_nm_user;
      this.selectFacilPart.part_nm = part_nm;
    } else {
      part_nm = this.selectFacilPart.part_nm;
    }

    if(facil_form_cd == 'AR') {
      part_class = this.part_class1;
      
      let codeList : Array<any> = this.part_codeList[facil_form_cd]["part_class1"].codeList;
      let findIndex = codeList.map(code => code.value).indexOf(this.part_class1);

			if('G,B,T'.indexOf(this.part_class1) >= 0 && this.part_class2 != '') {
        part_class += (this.part_class2 + 1000 + '').substring(1);
				part_nm = codeList[findIndex].text + this.part_class2 + '층 - ' + part_nm;
			}else {
				part_class += '000';
				part_nm = codeList[findIndex].text + ' - ' + part_nm;
			}
		}else if(facil_form_cd == 'BR') {
			if(this.part_class2 != '') {
        let codeList : Array<any> = this.part_codeList[facil_form_cd]["part_class1"].codeList;
        let findIndex = codeList.map(code => code.value).indexOf(this.part_class1);

				part_class = this.part_class1;
				part_class += (this.part_class2 + 1000 + '').substring(1);
				part_nm = this.part_class1 + this.part_class2 + codeList[findIndex].text.substring(0,2) + ' - ' + part_nm;
			}
		}else if('RW,SL'.indexOf(facil_form_cd) >= 0) {
			if(this.part_class2 != '') { 
				part_class = this.part_class1;
				part_class += (this.part_class2 + 1000 + '').substring(1);
				part_nm = ((this.part_class2) ? '' : 'Span.' + this.part_class2 + ' - ') + part_nm;
			}
		}else {
			if(this.part_class != '' && this.part_class2 != '') { 
				part_class = this.part_class;
        if(part_class.length == 1) { part_class += '000'; }
        
        let codeList : Array<any> = this.part_codeList[facil_form_cd]["part_class"].codeList;
        let findIndex = codeList.map(code => code.value).indexOf(this.part_class);
				part_nm = codeList[findIndex].text + ' - ' + part_nm;
			}
    }

    this.selectFacilPart.part_class1 = this.part_class1;
    this.selectFacilPart.part_class2 = this.part_class2;
    this.selectFacilPart.part_class = part_class;
    this.selectFacilPart.part_nm = part_nm;
    // this.selectFacilPart.part_detail;
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }
}
