import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, IonicPage, ItemSliding } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { MANTB_DIGR12DTO } from '../../model/MANTB_DIGR12DTO';
import { UtilService } from '../../services/UtilService';
import { COMTB_FILE01DTO } from '../../model/COMTB_FILE01DTO';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';

/**
 * Generated class for the Digr12WriteModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr12-write-modal',
  templateUrl: 'digr12-write-modal.html',
})
export class Digr12WriteModalPage {
  digr01Group: DIGR01_GROUPDTO;
  selectIndex: number;
  digr02: MANTB_DIGR01DTO;
  digr12: MANTB_DIGR12DTO;
  selectMast01: BASTB_MAST01DTO;
  isCreate: boolean = false;

  private win: any = window;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController
    , public modalCtrl: ModalController, public utilService: UtilService
    , public camera: Camera, public domSanitizer: DomSanitizer
    , private filePath: FilePath, private file: File, public webview: WebView) {
    this.digr01Group = navParams.get('digr01Group');
    this.selectIndex = (navParams.get('index')) ? navParams.get('index') : null;
    this.digr02 = navParams.get('digr02');
    this.selectMast01 = navParams.get('selectMast01');
    this.digr12 = (navParams.get('digr12')) ? navParams.get('digr12') : new MANTB_DIGR12DTO();
    (navParams.get('digr12')) ? null : this.isCreate = true;
    this.digr12.facil_no = (this.digr12.facil_no) ? null : this.digr02.facil_no;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr12WriteModal');
  }

  goFacilPartSerachModal() {
    let facilPartSearchModalPage = this.modalCtrl.create("FacilPartSearchModalPage", {
      "digr01Group": this.digr01Group,
      "index": this.selectIndex,
      "facilPart": this.digr12.facilPart,
      "selectMast01": this.selectMast01,
    });
    facilPartSearchModalPage.present();

    facilPartSearchModalPage.onWillDismiss((data: { facilPart: any }) => {
      if (data != null) {
        this.digr12.facilPart = data.facilPart;
        this.digr12.object_no = data.facilPart.part_nm;
      }
    });
  }

  goSeriousDefectModal() {
    let seriousDefectModalPage = this.modalCtrl.create("SeriousDefectModalPage", {
      "digr01Group": this.digr01Group,
      "index": this.selectIndex,
      "digr02": this.digr02,
      "digr12": this.digr12,
      "selectMast01": this.selectMast01,
    });
    seriousDefectModalPage.present();

    seriousDefectModalPage.onWillDismiss((data: MANTB_DIGR12DTO) => {
      if (data != null) {
        this.digr12 = data;
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

  goSave() {
    if (this.isCreate) {
      this.digr02.digr12Array.push(this.digr12);
    }
    this.viewCtrl.dismiss(null);
  }

  removeSeriousDefectItem(seriousDefect: any, i: number) {
    const alertTile = "삭제 알림";
    const alertMessage = "선택한 중대결함 정보를 삭제 하시겠습니까?";
    this.utilService.alertConfirm(alertTile, alertMessage, () => {
      this.digr12.seriousDefectList.splice(i, 1);
    }, () => {

    });
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
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
            that.digr12.comtbFile01Array.push(comtbFile01);
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
      this.digr12.comtbFile01Array.splice(index, 1);
      if (comtbFile01.source_type == this.camera.PictureSourceType.CAMERA) {
        this.file.removeFile(comtbFile01.img_data.replace(comtbFile01.file_nm, ''), comtbFile01.file_nm);
      }
    }, () => {
    });
  }
}
