import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
@Component({
  selector: 'page-digr11-write',
  templateUrl: 'digr11-write.html',
})
export class Digr11WritePage {
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO
  selectIndex : number;
  digr02 : MANTB_DIGR01DTO;
  digr11List : Array<MANTB_DIGR11DTO>;

  isCreate : boolean = false;
  digr11 : MANTB_DIGR11DTO
  facil_kind : string;
  causeCdList : Array<any>;
  amendCdList : Array<any>;
  defectCdList : Array<any>;

  private win: any = window;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private storage : Storage, public utilService: UtilService , public camera: Camera
    , private filePath: FilePath, private file: File, public webview: WebView
    ) {
      this.digr01Group = navParams.get('digr01Group');
      this.selectIndex = navParams.get('index');

      this.selectMast01 = this.digr01Group.selectedMast01List[this.selectIndex];
      this.digr02 = this.digr01Group.digr02List[this.selectIndex];
      this.digr11List = this.digr02.digr11Array;
      
      this.isCreate = navParams.get('digr11') ? false : true;
      this.digr11 = navParams.get('digr11') ? navParams.get('digr11') : new MANTB_DIGR11DTO();

      // 기존로직 적용
      this.facil_kind = this.selectMast01.facil_no.substr(0,2);
      this.facil_kind = (this.facil_kind == 'EB') ? 'ED' : this.facil_kind;

      this.storage.get(CAUSE_CD_LIST).then(res => this.causeCdList = res[this.facil_kind]);
      this.storage.get(AMEND_CD_LIST).then(res => this.amendCdList = res[this.facil_kind]);
      this.storage.get(DEFECT_CD_LIST).then(res => this.defectCdList = res[this.facil_kind]);
  }

  goDigr11List(){
    this.navCtrl.pop();
  }

  goSave() {
    if(this.isCreate) {
      this.digr11List.push(this.digr11);
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
