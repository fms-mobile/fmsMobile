import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UtilService } from '../../services/UtilService';
import { GlobalVars } from '../../services/GlobalVars';


@Component({
  templateUrl: 'modal.html'
})
export class ModalPage {
  response: any;
  deptList: any = [];
  statCodeList: any = [];
  ui: any = {
    barcode_no : "",
    dept_cd : "",
    insp_status : ""
  };

  constructor(
    public viewCtrl: ViewController,
    public storage: Storage,
    params: NavParams,
    public globalVars: GlobalVars,
    public utilService: UtilService
  ) {    
    if (params.data.request == 'edit') {
      this.ui.dept_cd = this.utilService.deptParse(params.data.mng_dept_cd);
      this.ui.insp_status = this.utilService.statusParse(params.data.insp_status);
    } else {
      this.ui.dept_cd =  params.data.mng_dept_cd;
      this.ui.insp_status = params.data.insp_status; 
    }
    this.deptList = this.globalVars.deptList;
    this.statCodeList = this.globalVars.statCodeList;
    this.ui.asset_nm = params.data.asset_nm;
    this.response = params.data.request;
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }
  goAddList() { 
    let ModalInfo = {
      response: this.response,
      dept_cd: this.utilService.deptParse(this.ui.dept_cd),
      insp_status: this.utilService.statusParse(this.ui.insp_status)
    };
    this.viewCtrl.dismiss(ModalInfo);
  }
}