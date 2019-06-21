import { Component, Injectable, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { Storage } from '@ionic/storage';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';
import { COMTB_FILE01DTO } from '../../model/COMTB_FILE01DTO';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { UtilService } from '../../services/UtilService';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { BastbTree01Component, SearchData } from '../../components/bastb-tree01/bastb-tree01';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the Digr11WritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const CAUSE_CD_LIST = 'CAUSE_CD_LIST';
const AMEND_CD_LIST = 'AMEND_CD_LIST';
const DEFECT_CD_LIST = 'DEFECT_CD_LIST';

@IonicPage()
@Injectable()
@Component({
  selector: 'page-digr11-write',
  templateUrl: 'digr11-write.html',
  providers: [
    BastbTree01Component,
  ]
})
export class Digr11WritePage implements AfterViewInit{
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO
  selectIndex : number;
  digr02 : MANTB_DIGR01DTO;
  digr11List : Array<MANTB_DIGR11DTO>;

  @ViewChild (BastbTree01Component) bastbTree01Component :BastbTree01Component;

  isCreate : boolean = false;
  digr11 : MANTB_DIGR11DTO
  backupDigr11 : MANTB_DIGR11DTO
  facil_kind : string;
  causeCdList : Array<any>;
  amendCdList : Array<any>;
  defectCd1List : Array<any>;
  defectCd2List : Array<any>;

  isOnline : boolean = false;
  connected;
  disconnected;
  private win: any = window;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private storage : Storage, public utilService: UtilService , public camera: Camera
    , private filePath: FilePath, private file: File, public webview: WebView
    , private alertCtrl : AlertController, private network : Network,
    ) {
      this.digr01Group = navParams.get('digr01Group');
      this.selectIndex = navParams.get('index');

      this.selectMast01 = this.digr01Group.selectedMast01List[this.selectIndex];
      this.digr02 = this.digr01Group.digr02List[this.selectIndex];
      this.digr11List = this.digr02.digr11Array;
      
      this.isCreate = navParams.get('digr11') ? false : true;
      this.backupDigr11 = (!this.isCreate) ? navParams.get('digr11') :  null;
      this.digr11 = (!this.isCreate) ? JSON.parse(JSON.stringify(this.backupDigr11)) : new MANTB_DIGR11DTO();

      // 기존로직 적용
      this.facil_kind = this.selectMast01.facil_no.substr(0,2);
      this.facil_kind = (this.facil_kind == 'EB') ? 'ED' : this.facil_kind;

      this.storage.get(CAUSE_CD_LIST).then(res => this.causeCdList = res[this.facil_kind]);
      this.storage.get(AMEND_CD_LIST).then(res => this.amendCdList = res[this.facil_kind]);
      this.storage.get(DEFECT_CD_LIST).then(res => this.defectCd1List = res[this.facil_kind])
      .then(() => {
        if(!this.isCreate) {
          this.defectCd2List = this.defectCd1List.find(item => item.code == this.digr11.defect_cd1).childCodeList;
        }
      });
  }

  ngAfterViewInit(){
    this.bastbTree01Component.changeEmitter.subscribe((res : SearchData) => {
      if(!res.isFirstBind) {
        this.digr11.recursiveTreeList = res.recursiveTreeList;
        this.digr11.objectArray = res.parentList.reverse();
        this.digr11.objectArray.push(res.data);
        if(res.isLast){
          this.digr11.object_no = res.data.object_no;
          this.digr11.entity_id = res.data.entity_id;
          this.setDefectOption(this.digr11.entity_id,this.digr11.defect_cd);
        } else {
          this.initDigr11();
        }
      }
    });
  }

  goDigr11List(){
    this.navCtrl.pop();
  }

  goSave() {
    // 기존 로직
    if(this.digr11.defect_cd2 == "") { 
      this.digr11.defect_cd = this.digr11.defect_cd1Obj.code;
      this.digr11.defect_nm = this.digr11.defect_cd1Obj.data.trim();
    } else if(this.digr11.defect_cd2 == 'x') {
      this.digr11.defect_cd = this.digr11.defect_cd1Obj.code + 'x';;
    }else { 
      this.digr11.defect_cd = this.digr11.defect_cd2Obj.code;
      this.digr11.defect_nm = this.digr11.defect_cd2Obj.data.trim();
    }
    if(this.digr11.cause_cd.length > 1) { this.digr11.cause_nm = this.causeCdList.find(item => item.code == this.digr11.cause_cd).data.replace('@','').trim(); }
    if(this.digr11.amend_cd.length > 1) { this.digr11.amend_nm = this.amendCdList.find(item => item.code == this.digr11.amend_cd).data.replace('@','').trim(); }
    
    this.digr11.object_path = this.digr11.objectArray.map(item => item.object_nm).join("|");
    this.digr11.object_nm = this.digr11.objectArray.map(item => item.object_nm).join(" > ");

    if(this.isCreate) {
      this.digr11List.push(this.digr11);
    } else {
      Object.assign(this.backupDigr11,this.digr11);
    }
    this.navCtrl.pop();
  }

  changeDefectCd1(defectCd1) {
    this.digr11.defect_cd1Obj = this.defectCd1List.find(item => item.code == defectCd1);
    this.defectCd2List = this.digr11.defect_cd1Obj.childCodeList;

    // initDefectCd2
    this.digr11.defect_cd2Obj = {};
    this.digr11.defect_cd2 = '';
    this.digr11.defect_nm = '';
  }

  changeDefectCd2(defectCd2) {
    this.digr11.defect_cd2Obj = this.defectCd2List.find(item => item.code == defectCd2);
    this.digr11.defect_nm = '';
  }

  ionViewDidEnter() {
    this.connected = this.network.onConnect().subscribe(data => {
      this.checkNetwork(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      this.checkNetwork(data.type);
    }, error => console.error(error));
  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  checkNetwork(connectionState:string){
    if(connectionState.indexOf('online') > -1) this.isOnline = true;
    if(connectionState.indexOf('offline') > -1) this.isOnline = false;
  }

  initDigr11() {
    if(this.isCreate) {
      this.digr11 = new MANTB_DIGR11DTO();
    }
  }

  goSeriousDefectModal() {
    this.navCtrl.push("SeriousDefectModalPage", {
      "digr01Group": this.digr01Group,
      "index": this.selectIndex,
      "digr02": this.digr02,
      "digr11": this.digr11,
      "selectMast01": this.selectMast01,
    });
  }

  goInspectGradeList() {
    // validate check
    if(!this.digr11.defect_cd1) {
      let alertTile = "검증 에러";
      let alertMessage = '손상 종류를 선택해주세요.';
      let alert = this.alertCtrl.create({
          title: alertTile ,
          message: alertMessage,
          cssClass : "alert-error",
          buttons: [
          {
              text: '확인',
              handler: () => {
              }
          }
          ]
      });
      alert.present();
    } else if(!this.isOnline) {
      let alertTile = "네트워크 접근 에러";
      let alertMessage = '네트워크 연결여부를 선택해주세요.';
      let alert = this.alertCtrl.create({
          title: alertTile ,
          message: alertMessage,
          cssClass : "alert-error",
          buttons: [
          {
              text: '확인',
              handler: () => {
              }
          }
          ]
      });
      alert.present();
    } else {
      this.navCtrl.push("InspectGradeListPage", {
        "digr01Group": this.digr01Group,
        "index": this.selectIndex,
        "digr02": this.digr02,
        "digr11": this.digr11,
        "selectMast01": this.selectMast01,
      });
    }
  }

  // 기존로직 함수
  setDefectOption(defectKey?, defVal?) {
    let facilKind = this.facil_kind;
    if("HL,HM,DA,WG,EM,ED,EB,BO,DP,WS,ST".indexOf(facilKind) >= 0) {
      let defectWp = this.defectCd1List;

      if(facilKind == "HL") {
        this.defectCd1List = defectWp.filter(item => {
          if(item.eval_entity == "") {
            return true;
          } else {
            return item.eval_entity.indexOf(defectKey) > -1
          }
        });
      }else if(facilKind == "HM") {
        // 선택 부재 코드로
        let eval_entity = this.bastbTree01Component.getTree01().optkey;
        this.defectCd1List = defectWp.filter(item => {
          if(item.eval_entity == "" || item.eval_entity.indexOf(eval_entity) < 0) {
            return false;
          } else {
            return true;
          }
        });

      } else if(facilKind == "DA") {
        let convKey = '';
        if(defectKey.indexOf('DABJ110101') == 0 ) { // 댐마루
          convKey = 'DA';
        }else if(defectKey.indexOf('DABJ110102') == 0 || defectKey.indexOf('DABJ110103') == 0) { // 상류사면, 하류사면
          convKey = 'CS';
        }else if(defectKey.indexOf('DABJ12') == 0) { // 기전설비
          convKey = 'ME';
        }else if(defectKey != '') {
          convKey = 'ET';
        }

        this.defectCd1List = defectWp.filter(item => {
          if(item.eval_entity != '' && item.eval_entity != convKey) {
            return false;
          }else {
            return true;
          }
        });
      } else if(facilKind == "ED") {
        this.defectCd1List = defectWp.filter(item => {
          if(item.eval_entity == "") {
            return true;
          } else {
            return item.eval_entity.indexOf(defectKey) > -1
          }
        });
      } else if(facilKind == "EM") {
        this.defectCd1List = defectWp.filter(item => {
          if(item.eval_entity == "") {
            return true;
          } else {
            return item.eval_entity.indexOf(defectKey) > -1
          }
        });
      } else if(facilKind == "BO") {
        let convKey = '';
        if(defectKey.indexOf('BOBJ11') == 0) { // 보(본체)
          convKey = 'BO';
        }else if(defectKey.indexOf('BOBJ120103') == 0) { // 전기설비
          convKey = 'ME';
        }else if(defectKey.indexOf('BOBJ1201') == 0) { // 기계설비
          convKey = 'MA';
        }

        this.defectCd1List = defectWp.filter(item => {
          if(item.eval_entity != '' && item.eval_entity != convKey) {
            return false;
          }else {
            return true;
          }
        });
      }else if(facilKind == "DP") {
        let convKey = '';
        if(defectKey.indexOf('DPBJ12') == 0) { // 기전설비
          convKey = "DPBJ120103,DPBJ120203,DPBJ120303".indexOf(defectKey) >= 0 ? 'ME' : 'MA';
        }

        this.defectCd1List = defectWp.filter(item => {
          let arr = item.eval_entity.split('|');
          if(defectKey.indexOf(arr[0]) < 0) {
            return false;
          }
          if(arr.length > 1 && arr[1] != convKey) {
            return false;
          }
          return true;
        });
      }else if(facilKind == "WS") {
        this.defectCd1List = defectWp.filter(item => {
          if(item.eval_entity == "") {
            return true;
          } else {
            return item.eval_entity.indexOf(defectKey) > -1
          }
        });
      }else if(facilKind == "ST") {
        this.defectCd1List = defectWp.filter(item => {
          if(item.eval_entity == "") {
            return true;
          } else {
            return item.eval_entity.indexOf(defectKey) > -1
          }
        });
      }
    }
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.win.Ionic.WebView.convertFileSrc(img);
      return converted;
    }
  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imagePath: string) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;

      let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      let currentName: string = '';

      if (imagePath.includes('?')) {
        currentName = imagePath.substring(0, imagePath.lastIndexOf('?')).replace(correctPath, '');
      } else {
        currentName = imagePath.replace(correctPath, '');
      }

      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let that = this;
          that.file.copyFile(correctPath, currentName, this.file.dataDirectory, this.createFileName()).then(success => {
            let comtbFile01: COMTB_FILE01DTO = new COMTB_FILE01DTO();
            comtbFile01.img_data = imagePath;
            comtbFile01.source_type = sourceType;
            comtbFile01.img_path = that.pathForImage(success.nativeURL);
            comtbFile01.file_nm = currentName;
            that.digr11.comtbFile01Array.push(comtbFile01);
          }, error => {
            // this.presentToast('Error while storing file.');
          });
        });
    }, (err) => {
      // Handle error
    });
  }

  deletePhoto(comtbFile01: COMTB_FILE01DTO, index: number) {
    const alertTile = "삭제 알림";
    const alertMessage = "선택한 첨부 사진정보를 삭제 하시겠습니까?";
    this.utilService.alertConfirm(alertTile, alertMessage, () => {
      this.digr11.comtbFile01Array.splice(index, 1);
      if (comtbFile01.source_type == this.camera.PictureSourceType.CAMERA) {
        this.file.removeFile(comtbFile01.img_data.replace(comtbFile01.file_nm, ''), comtbFile01.file_nm);
      }
    }, () => {
    });
  }
}
