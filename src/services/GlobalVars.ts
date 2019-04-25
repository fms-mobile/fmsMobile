import { Injectable } from '@angular/core';
import { COMTB_USER01DTO } from '../model/COMTB_USER01DTO';

// import * as moment from 'moment';

@Injectable()
export class GlobalVars {
    public isDev : string = "Y";    // 개발중여부 
    public appVersion : number = 3;
    public db;    //   DB
     
    public appName : string = "";
    public mainCopyRight : string = "Copyright<span style='font-size:0.5rem;'>(C)</span> 2018 (주) 신진아이티컨설팅";
	//public serverUrl : string = "http://61.252.208.165:8080/";
	public serverUrl : string = "/mobile";

	// public webUrl : string = "http://112.171.195.152:28100/";
	public webUrl : string = "https://112.171.195.152:28443/";

	public isLogin: boolean = false;  // 로그인여부 
	public isScan: boolean = false; // 스캔여부

    public userInfo : COMTB_USER01DTO = new COMTB_USER01DTO();
	
	public deptList = [];
	public statCodeList = []; 

    public setUserInfo(data) {
        this.userInfo = data;
	}
	
}