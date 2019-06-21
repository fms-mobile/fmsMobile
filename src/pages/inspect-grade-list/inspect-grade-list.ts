import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';

/**
 * Generated class for the InspectGradeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspect-grade-list',
  templateUrl: 'inspect-grade-list.html',
})
export class InspectGradeListPage {
  selectIndex : number;
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  digr02 : MANTB_DIGR01DTO;
  digr11 : MANTB_DIGR11DTO;

  objectKeys = Object.keys;
  evalPidObject : Object = {};
  inspectGradeList : Array<any> = new Array<any>();

  selectEvalPid : string;

  defaultInspectGradeList : Array<any> = [
    { eval_grade :'A', status_desc: '문제점이 없는 최상의 상태'},
    { eval_grade :'B', status_desc: '보조부재에 경미한 결함이 발생하였으나 기능 발휘에는 지장이 없으며 내구성 증진을 위하여 일부의 보수가 필요한 상태'},
    { eval_grade :'C', status_desc: '주요부재에 경미한 결함 또는 보조부재에 광범위한 결함이 발생하였으나 전체적인 시설물의 안전에는 지장이 없으며, 주요 부재에 내구성, 기능성 저하 방지를 위한 보수가 필요하거나 보조부재에 대한 간단한 보강이 필요한 상태'},
    { eval_grade :'D', status_desc: '주요부재에 결함이 발생하여 긴급한 보수·보강이 필요하며 사용제한 여부를 결정하여야 하는 상태'},
    { eval_grade :'E', status_desc: '주요부재에 발생한 심각한 결함으로 인하여 시설물의 안전에 위험이 있어 즉각 사용을 금지하고 보강 또는 개축을 하여야 하는 상태'},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public transmissionService : TransmissionService,
    ) {
      this.digr01Group = navParams.get('digr01Group');
      this.selectIndex = navParams.get('index');
      this.digr11 = navParams.get('digr11');
      this.digr02 = navParams.get('digr02');
      
      this.selectMast01 = navParams.get('selectMast01');
      this.goSearch(null);
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/inspectGrade.do',
    {
      facil_no:this.digr02.facil_no,
      object_no:this.digr11.object_no,
      entity_id:this.digr11.entity_id,
      defect_cd:this.digr11.defect_cd1,
      buwee_cd:this.digr11.buwee_cd,
    })
    .subscribe((res : Array<any>)=> {
      this.inspectGradeList = res;

      this.inspectGradeList.map(inspectGrade => {
        const eval_pid = inspectGrade.eval_pid;
        
        if(!this.evalPidObject.hasOwnProperty(eval_pid)) {
          this.evalPidObject[eval_pid] = {}
          this.evalPidObject[eval_pid].name = inspectGrade.eval_pnm
          this.evalPidObject[eval_pid].array = new Array<any>();
        }
        this.evalPidObject[eval_pid].array.push(inspectGrade);
      });
    });
  }

  
  goDigr11Write(){
    this.navCtrl.pop();
  }

  resetInspectGrade() {
    this.digr11.eval_grade = '';
    this.digr11.inspectGrade = null;
    this.navCtrl.pop();
  }

  selectInspectGrade(inspectGrade) {
    this.digr11.eval_grade = inspectGrade.eval_grade;
    this.digr11.inspectGrade = inspectGrade;
    this.navCtrl.pop();
  }
}