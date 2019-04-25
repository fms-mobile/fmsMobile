import { Injectable } from '@angular/core';
import { Platform, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'
import { Observable } from 'rxjs/Rx';

import { UtilService } from '../services/UtilService';
import { GlobalVars } from '../services/GlobalVars';

@Injectable()
export class WebDataProvider {
    private httpPostConfig:any;
    constructor(public http: Http, 
                public globalVars: GlobalVars,
                public network: Network, 
                public utilService: UtilService,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public platform: Platform) {
        // console.log("Hello RedditData Provider");
        this.httpPostConfig = { headers : {
            'Content-Type': 'application/json'
                                }
                            }
    }
    
    public comWork(action : string, sendData: any) {
        sendData.action=action;
        if (action != "login") {
            /* sendData.ss_user_id = this.globalVars.userInfo.user_id;
            sendData.ss_user_nm = this.globalVars.userInfo.user_nm;
            sendData.ss_empl_no = this.globalVars.userInfo.empl_no;
            sendData.ss_empl_nm = this.globalVars.userInfo.empl_nm;
            sendData.ss_dept_cd = this.globalVars.userInfo.dept_cd;
            sendData.ss_dept_nm = this.globalVars.userInfo.dept_nm;
            sendData.ss_part_cd = this.globalVars.userInfo.part_cd;
            sendData.ss_part_nm = this.globalVars.userInfo.part_nm;
            sendData.ss_position_cd = this.globalVars.userInfo.position_cd;
            sendData.ss_position_nm = this.globalVars.userInfo.position_nm;
            sendData.ss_unit_cd = this.globalVars.userInfo.unit_cd;
            sendData.ss_unit_nm = this.globalVars.userInfo.unit_nm;
            sendData.ss_empl_class = this.globalVars.userInfo.empl_class;
            sendData.ss_email_id = this.globalVars.userInfo.email_id;
            sendData.user_lvl = this.globalVars.userInfo.user_lvl;
            sendData.use_auth = this.globalVars.userInfo.use_auth; */
        }
        console.log(JSON.stringify(sendData));  
        return this.http.post(this.globalVars.serverUrl + 'com/mobile.do?method=work', sendData, this.httpPostConfig).timeout(20000).map(res => res.json()).catch(this.handleError);
    }
    
    public handleError(error) {
        return Observable.throw(error.toString() || 'Server error');
    }

    public isOnline(): any {
        if (this.network.type == 'unknown' || this.network.type == 'none') {
            return false;
        }
        return true;
    }
}