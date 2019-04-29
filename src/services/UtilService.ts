import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { AlertController, ToastController, LoadingController, Loading, ModalController, Events, Platform  } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

import { GlobalVars } from '../services/GlobalVars';

import localeKo from '@angular/common/locales/ko';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(public network: Network,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                public events: Events,
                public platform: Platform,
                public globalVars: GlobalVars) {
        registerLocaleData(localeKo);
    }

    public showToast(toastCtrl: ToastController, msg: string, dismissCallBack: any) {
        let toast = toastCtrl.create({
            message: msg,
            duration: 1500,
            position: "middle",
            cssClass: "toast-default"
        });
        if (dismissCallBack) {
            //toast.onDidDismiss(() => {console.log("dismiss event");});
            toast.onDidDismiss(dismissCallBack);
        }
        toast.present();
    }    

    public showToastFull(toastCtrl: ToastController, msg: string, dur: number, pos: string, css: string, dismissCallBack: any) {
        let toast = toastCtrl.create({
            message: msg,
            duration: dur,
            position: pos,
            cssClass: css
        });
        if (dismissCallBack) {
            //toast.onDidDismiss(() => {console.log("dismiss event");});
            toast.onDidDismiss(dismissCallBack);
        }
        toast.present();
    }

    public alertConfirm(alertTitle : string, alertMessage : string, okCallBack : any, cancelCallBack : any) {
        let confirm = this.alertCtrl.create({
            title: alertTitle,
            message: alertMessage,
            buttons: [
              {
                text: '아니오',
                handler: () => {
                    if (cancelCallBack) {
                        cancelCallBack();
                    }
                }
              },
              {
                text: '예',
                handler: () => {
                    if (okCallBack) {
                        okCallBack();
                    }                    
                }
              }
            ]
          });
          confirm.present();
          
    }

    public alertConfirm2(alertTitle : string, alertMessage : string, okText : string, cancelText : string, okCallBack : any, cancelCallBack : any) {
        let confirm = this.alertCtrl.create({
            title: alertTitle,
            message: alertMessage,
            buttons: [
              {
                text: cancelText,
                handler: () => {
                    if (cancelCallBack) {
                        cancelCallBack();
                    }
                }
              },
              {
                text: okText,
                handler: () => {
                    if (okCallBack) {
                        okCallBack();
                    }                    
                }
              }
            ]
          });
          confirm.present();
          
    }
 
    public alertConfirmInp(alertTitle : string, alertMessage : string, inpName : string, holderName : string, okCallBack : any, cancelCallBack : any) {
        let confirm = this.alertCtrl.create({
            title: alertTitle,
            message: alertMessage,
            inputs: [
              {
                name: inpName,
                placeholder: holderName
              },
            ],
            buttons: [
              {
                text: '아니오',
                handler: data => {
                    if (cancelCallBack) {
                        cancelCallBack(data);
                    }
                }
              },
              {
                text: '예',
                handler: data => {
                    if (okCallBack) {
                        return okCallBack(data);
                    }                    
                }
              }
            ]
          });
          confirm.present();
    }

    public replaceNlToBr(s: string) {
        return s && s.split("\n").join("<br />");
    }

    public isOnline(): any {
        if (this.network.type == 'unknown' || this.network.type == 'none') {
            return false;
        }
        return true;
    }

    public lpad(s: string, pad:string, size:number) : string {
        while (s.length < size) s = pad + s;
        return s;
    }

    public getByteLength(s:string) : number {
        return encodeURI(s).split(/%..|./).length - 1
    }

    public showLoading(msg:string) : Loading {
        let loadingCtrl = this.loadingCtrl.create({
            content: msg,
            dismissOnPageChange: true   // 자동으로 dismiss 처리
        });
        loadingCtrl.present();
        return loadingCtrl;
    }

    public showLoading2(msg:string) : Loading {
        let loadingCtrl = this.loadingCtrl.create({
            content: msg,
            dismissOnPageChange: false  // 사용자가 직접 dismiss 해주지 않으면 계속 보이도록
        });
        loadingCtrl.present();
        return loadingCtrl;
    }

    // ISO 타입으로 바꾸어서 보여주기 위한 변한 
    public getLocalISODateTime(defVal) : string {
        if (defVal != null) {
            var dateFmtVal = "";
            if (defVal.length >= 12) {
                dateFmtVal = defVal.substring(0,4) + "-"
                           + defVal.substring(4,6) + "-"
                           + defVal.substring(6,8) + " "
                           + defVal.substring(8,10) + ":"
                           + defVal.substring(10,12);
            }
            var dt = new Date(dateFmtVal);
            dt.setTime(dt.getTime() + (9*60*60*1000));
            return dt.toISOString();
        } else {
            var dt2 = new Date();
            dt2.setTime(dt2.getTime() + (9*60*60*1000));
            return dt2.toISOString();
        } 
    }

    // 날짜 조회
    public getDate(gbn:string) : string {
        var dt = new Date();
        var rtn = "";
        if (gbn == "todayYmd") {
            rtn = dt.getFullYear().toString() 
                + (dt.getMonth()+1 >=10 ? (dt.getMonth() + 1).toString() : "0" + (dt.getMonth()+1))
                + (dt.getDate() < 10 ? "0" + String(dt.getDate()) : String(dt.getDate()));
        } else if (gbn == "todayYearMon") {
            rtn = dt.getFullYear().toString() + (dt.getMonth()+1 >=10 ? (dt.getMonth() + 1).toString() : "0" + (dt.getMonth()+1));
        } else if (gbn == "todayDay") {
            rtn = (dt.getDate() < 10 ? "0" + String(dt.getDate()) : String(dt.getDate()));
        } else if (gbn == "hour") {
            rtn = (dt.getHours() < 10 ? "0" + String(dt.getHours()) : String(dt.getHours()));
        }
        return rtn;
    }

    public validateEmail(email) : boolean {
        if (email.indexOf("<") >=0) {
            var spos = email.indexOf("<");
            var epos = email.indexOf(">");
            if (spos >=0 && epos >=0 && spos < epos) {
                email = email.substring(spos+1, epos);
            }
        }
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    //모달 오픈
    public showModal(page, obj) {
        let myModal = this.modalCtrl.create(page, obj);
        myModal.present();

        myModal.onDidDismiss (data => {
            if (data != null) {
                this.events.publish('modalData', data);
            }
        });
    }

    // 하드웨어 뒤로가기 버튼
    backButtonAction() {
        this.alertConfirm("종료", "종료 하시겠습니까?", () => {
            this.platform.exitApp();
        },null);        
    }

    // 위치코드 변환
    deptParse(dept_cd: any) {
        let deptList = this.globalVars.deptList;
        
        for (let i = 0; i < deptList.length; i++) {
          if (dept_cd == deptList[i].code) {
            dept_cd = deptList[i].data;
          } else if (dept_cd == deptList[i].data) {
            dept_cd = deptList[i].code;
          }
        }
        return dept_cd;
    }
      
    // 상태코드 변환
    statusParse(insp_status: any) {
        let statCodeList = this.globalVars.statCodeList;

        for (let i = 0; i < statCodeList.length; i++) {
            if (insp_status == statCodeList[i].code1) {
            insp_status = statCodeList[i].data1;
            } else if(insp_status == statCodeList[i].data1) {
            insp_status = statCodeList[i].code1;
            }
        }
        return insp_status;
    }

    nvl(v : string, t:string) {
        if (v==undefined || v=="") {
            return t;
        } else {
            return v;
        }
    }

    codeConvertQuery(param:any) {
        let queryStr = "";

        if(!param.code_group)
            return "null";

        if(param.code3 && param.code2 && param.code1) {
            queryStr += "(select data3 from COMTB_CODE02 where code_group = '"+param.code_group+"' and code1 = "+param.code1+" and code2 = "+param.code2+" and code1 = "+param.code1+" )"
            return queryStr;
        } else if(param.code2 && param.code1) {
            queryStr += "(select data2 from COMTB_CODE02 where code_group = '"+param.code_group+"' and code1 = "+param.code1+" and code2 = "+param.code2+" )"
            return queryStr;
        } else if(param.code1) {
            queryStr += "(select data1 from COMTB_CODE02 where code_group = '"+param.code_group+"' and code1 = "+param.code1+" )"
            return queryStr;
        }
    }

    convertInputVal(event: any) {
        let value = event.target.value;
        let currencyPipe : CurrencyPipe = new CurrencyPipe("ko");

        let numValue = value.replace(/[^0-9.]/g, "");
        let res = currencyPipe.transform(numValue,"KRW","symbol","1.0-0","ko");

        event.target.value = res;
    }

}