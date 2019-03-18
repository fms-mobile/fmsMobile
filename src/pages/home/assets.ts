import { Component } from '@angular/core';
import { NavController, ToastController, Events} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { UtilService } from '../../services/UtilService';
import { WebDataProvider } from '../../providers/WebDataProvider';
import { GlobalVars } from '../../services/GlobalVars';

import { LoginPage } from '../home/login';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-assets',
  templateUrl: 'assets.html'
})
export class AssetsPage {
  deptList: any = [];
  statCodeList: any = [];
  userId: string;
  editAsset: any;
  assetList: any = [];
  mng_dept_nm: any;
  barcode_no: any;
  upper_class_nm: any;
  asset_class_nm: any;
  asset_nm: any;
  assetStorage: any = [];
  
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public barcodeScanner: BarcodeScanner,
              public http: HttpClient,
              public utilService: UtilService,
              public webData: WebDataProvider,
              public storage: Storage,
              public events: Events,
              public globalVars: GlobalVars) {

              this.userId = this.globalVars.userInfo.user_id;
              
              //스토리지에 있는 자산데이터 list에 뿌려주기
              this.storage.get('saveAssetData' + this.userId).then((val) => {
                if (val != null || undefined || '') {
                  this.assetStorage = val;
                  for (let i = 0; i < this.assetStorage.length; i++) {
                    this.assetList.push ({'upper_class_nm': this.assetStorage[i].upper_class_nm, 'asset_class_nm': this.assetStorage[i].asset_class_nm, 'asset_nm':this.assetStorage[i].asset_nm,
                                      'cog_dept_nm':this.assetStorage[i].cog_dept_nm, 'mng_dept_cd': this.assetStorage[i].mng_dept_cd, 'insp_status': this.assetStorage[i].insp_status, 'barcode_no' : this.assetStorage[i].barcode_no}); 
                  }
                }
              });
              

              this.events.subscribe('modalData', (eventData) => {
                // 모달 등록
                if (eventData.response == 'scan') {               
                  this.assetList.push ({'upper_class_nm': this.upper_class_nm, 'asset_class_nm': this.asset_class_nm, 'asset_nm':this.asset_nm,
                                      'cog_dept_nm':this.mng_dept_nm, 'mng_dept_cd': eventData.dept_cd, 'insp_status': eventData.insp_status, 'barcode_no' : this.barcode_no}); 

                  // 스토리지 자산 저장
                  this.assetStorage.push ({
                    upper_class_nm : this.upper_class_nm,
                    asset_class_nm : this.asset_class_nm,
                    asset_nm : this.asset_nm,
                    cog_dept_nm : this.mng_dept_nm,
                    mng_dept_cd : eventData.dept_cd,
                    insp_status : eventData.insp_status,
                    barcode_no : this.barcode_no
                  });

                  this.storage.set('saveAssetData' + this.userId, this.assetStorage);                  

                // 모달 수정
                } else if (eventData.response == 'edit') {
                  this.editAsset.asset_nm = this.asset_nm;
                  this.editAsset.mng_dept_cd = eventData.dept_cd;
                  this.editAsset.insp_status = eventData.insp_status;

                  this.storage.get('saveAssetData'+this.userId).then((val) => {
                    for (let i = 0; i < val.length; i++) {
                      if (this.barcode_no == val[i].barcode_no) {
                        let editAssetData = {
                          upper_class_nm : val[i].upper_class_nm,
                          asset_class_nm : val[i].asset_class_nm,
                          asset_nm : this.asset_nm,
                          cog_dept_nm : val[i].cog_dept_nm,
                          mng_dept_cd : eventData.dept_cd,
                          insp_status : eventData.insp_status,
                          barcode_no : val[i].barcode_no
                        }
                        val[i] = editAssetData;
                      }
                    }
                    this.assetStorage = val;
                    this.storage.set('saveAssetData' + this.userId, this.assetStorage);
                  });
                }
            });
  }

  goLogout() {
    this.storage.get('saveAssetData' + this.userId).then((val) => {
    });
    this.utilService.alertConfirm("로그아웃", "로그아웃 하시겠습니까?", () => {
      let loading = this.utilService.showLoading("로그아웃 중입니다.");
      this.storage.get('saveLoginInfo').then((val) => {
        loading.dismiss();
        let strgLoginInfo = val;
        strgLoginInfo.chkAutoLogin = false;
        this.storage.set('saveLoginInfo', strgLoginInfo);

        this.navCtrl.setRoot(LoginPage);
      });
    }, null); 
  }

  goBarcodeScan() {
    let loading = this.utilService.showLoading("잠시만 기다려주세요.");

    this.globalVars.isScan = true;
    this.barcodeScanner.scan().then(barcodeData => {
      // 스캔없이 종료할 경우
      if (barcodeData.cancelled) {
        loading.dismiss();
        return;
      }

      // 중복 자산검사
      for (let i = 0; i < this.assetStorage.length; i++) {
        if (barcodeData.text == this.assetStorage[i].barcode_no) {
          this.globalVars.isScan = false;
          loading.dismiss();
          this.utilService.showToast(this.toastCtrl, "중복되는 자산입니다.", null);  
          return;
        }
      }

      this.globalVars.isScan = false;

      this.webData.comWork('ass01001_select', barcodeData).subscribe(data => {
        loading.dismiss();
        
        if (data.asset.isOk=="Y") {
          this.asset_nm = data.asset.asset_nm;
          this.mng_dept_nm = data.asset.mng_dept_nm;
          this.barcode_no = data.asset.barcode_no;
          this.upper_class_nm = data.asset.upper_class_nm;
          this.asset_class_nm = data.asset.asset_class_nm;
          data.asset.request = "scan";
          this.utilService.showModal(ModalPage, data.asset);        
        } else {
          this.utilService.showToast(this.toastCtrl, "자산이 존재하지 않습니다.", null);
        }
      });
    }).catch(err => {
      this.globalVars.isScan = false;
      loading.dismiss();
      console.log('Error', err);
    });
  }

  

  goBarcodeSave() {
    if (this.assetList.length != 0) {
      this.utilService.alertConfirm("서버전송", "전송 하시겠습니까?", () => {
        let loading = this.utilService.showLoading("잠시만 기다려주세요.");
        var dept_cd;
        var insp_status;
        var str = '{"assetList":[';
        for (let i = 0; i < this.assetList.length; i++) {
          dept_cd = this.utilService.deptParse(this.assetList[i].mng_dept_cd);
          insp_status = this.utilService.statusParse(this.assetList[i].insp_status);
          str += '{"barcode_no"' + ':' + '"' + this.assetList[i].barcode_no + '"' +  ',';
          str += '"dept_cd"' + ':' + '"' + dept_cd + '"' +  ',';
          str += '"insp_status"' + ':' + '"' + insp_status + '"' + '}' + ',';       
        }
        str = str.slice(0, -1);
        str += ']}';

        let obj = JSON.parse(str);
        console.log(JSON.stringify(obj));

        this.webData.comWork('ass01001_save', obj).subscribe(data => { 
          loading.dismiss();
          if (data.isOk == "Y") {
            this.utilService.showToast(this.toastCtrl, "전송되었습니다.", null);
            this.assetList = [];
            this.assetStorage = [];
            this.storage.remove('saveAssetData'+this.userId);
          } else {
            this.utilService.showToast(this.toastCtrl, data.errMsg, null);
          }
        });
      }, null); 
    } else {
      this.utilService.showToast(this.toastCtrl, "자산을 등록해주세요.", null);
    }
  }

  assetEdit(asset) {
      this.editAsset = asset;
      this.editAsset.request = "edit";
      this.barcode_no = asset.barcode_no;
      this.asset_nm = asset.asset_nm;
      this.utilService.showModal(ModalPage, this.editAsset);
  }

  assetRemove(asset) {
    this.utilService.alertConfirm("삭제", "삭제 하시겠습니까?", () => {
      for (let i = 0; i < this.assetList.length; i++) {
        if (this.assetList[i] == asset) {
          this.assetList.splice(i, 1);
        }
      }
      for (let j = 0; j < this.assetStorage.length; j++) {
        if (asset.barcode_no == this.assetStorage[j].barcode_no) {
          this.assetStorage.splice(j, 1);
          this.storage.set('saveAssetData'+this.userId, this.assetStorage);
        }
      }
    }, null);
  }
}