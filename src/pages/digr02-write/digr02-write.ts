import { GlobalVars } from './../../services/GlobalVars';
import { MANTB_DIGR01DTO } from './../../model/MANTB_DIGR01DTO';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, ViewController, IonicPage } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { COMTB_FILE01DTO } from '../../model/COMTB_FILE01DTO';
import { DomSanitizer } from '@angular/platform-browser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { WebView } from '@ionic-native/ionic-webview/ngx';

/**
 * Generated class for the Digr02Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr02-write',
  templateUrl: 'digr02-write.html',
})

export class Digr02WritePage {
  selectIndex : number;
  state_gradeList : any = [];
  
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  digr02 : MANTB_DIGR01DTO;
  placeholder : Object ={
    dign_content: "주요 점검진단결과 입력",
    amend_content: "주요 보수보강(안) 입력",
    dign_amt : "비용 입력",
    dign4_need_yn : "정밀안전진단 필요",
  };

  private win: any = window;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public globalVars:GlobalVars,public utilService : UtilService
    ,public modalCtrl: ModalController,public toastCtrl: ToastController
    , public viewCtrl: ViewController, public camera: Camera, public domSanitizer: DomSanitizer
    , private filePath :FilePath, private file: File, public webview: WebView ) {
      this.digr01Group = navParams.data.digr01Group;
      this.selectIndex = navParams.data.index;

      this.selectMast01 = this.digr01Group.selectedMast01List[this.selectIndex];
      this.digr02 = this.digr01Group.digr02List[this.selectIndex];

      globalVars.db.comtbCode02.list002({code_group:"state_grade",data5 :"1"}, (res) => {
        this.state_gradeList = res;
      });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr02Write');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  goSave(){
    this.viewCtrl.dismiss();
  }

  goDigr02ListModal() {
    let digr02ListModal = this.modalCtrl.create("Digr02ListModalPage", this.digr01Group);
    digr02ListModal.present();

    let that = this;

    digr02ListModal.onWillDismiss((data: { digr01Group : DIGR01_GROUPDTO, index:number }) => {
      if(data != null){
        that.selectIndex = data.index;
        that.selectMast01 = data.digr01Group.selectedMast01List[data.index];
        that.digr02 = data.digr01Group.digr02List[data.index];
      }
    });
  }

  addDigr12WriteModal() {
    let digr12WriteModal = this.modalCtrl.create("Digr12WriteModalPage", {"digr01Group":this.digr01Group,"index":this.selectIndex});
    digr12WriteModal.present();
  }

  goPrev(){
    let prevIndex = this.selectIndex-1;
    let prevSelectMast01 = this.digr01Group.selectedMast01List[prevIndex];
    let prevDigr02 = this.digr01Group.digr02List[prevIndex];

    if(prevSelectMast01 && prevDigr02) {
      this.selectIndex = prevIndex;
      this.selectMast01 = prevSelectMast01;
      this.digr02 = prevDigr02;
    } else {
      this.utilService.showToast(this.toastCtrl, "처음 시설물입니다.",null);
    }
  }

  goNext(){
    let thisView : ViewController = this.navCtrl.last();
    this.navCtrl.push("Digr13WritePage",{"digr01Group":this.digr01Group,"index":this.selectIndex,"prevView":thisView});
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
      sourceType:sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imagePath : string) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.filePath.resolveNativePath(imagePath)
      .then(filePath => {
        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        // let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        let currentName: string = '';

        if(imagePath.includes('?')) {
          currentName = imagePath.substring(0, imagePath.lastIndexOf('?')).replace(correctPath,'');
        } else{
          currentName = imagePath.replace(correctPath,'');
        }

        let that = this;
        that.file.copyFile(correctPath, currentName, this.file.dataDirectory, this.createFileName()).then(success => {
          // this.updateStoredImages(newFileName);
          let comtbFile01 : COMTB_FILE01DTO = new COMTB_FILE01DTO();
          comtbFile01.img_data = imagePath;
          comtbFile01.img_path = that.pathForImage(success.nativeURL);
          that.digr02.comtbFile01Array.push(comtbFile01);
        }, error => {
            // this.presentToast('Error while storing file.');
        });
      });
    }, (err) => {
     // Handle error
    });
  }
}
