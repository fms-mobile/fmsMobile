import { Injectable } from '@angular/core';
import { COMTB_USER01DTO } from '../model/COMTB_USER01DTO';
import { DbInit } from '../db/DbInit';
import { DatePicker, DatePickerOptions } from '@ionic-native/date-picker';


// import * as moment from 'moment';

@Injectable()
export class GlobalVars {
    public isDev : string = "Y";    // 개발중여부 
    public appVersion : number = 3;
    public db : DbInit;    //   DB
     
    public appName : string = "";
	//public serverUrl : string = "http://61.252.208.165:8080/";
	public serverUrl : string = "/mobile";

	// public appServerUrl : string = "http://112.171.195.152:28082/";
	public appServerUrl : string = "http://112.171.195.152:28080/";
	// public appServerUrl : string = "https://112.171.195.152:28443/";
	// public appServerUrl : string = "http://app.fms.or.kr/";
	public appServerRestUrl : string = this.appServerUrl+"rest/";
	// public webUrl : string = "http://www.fms.or.kr/";
	public webUrl : string = "http://112.171.195.152:28081/";
	// public webUrl : string = "https://112.171.195.152:28453/";
	

	public isLogin: boolean = false;  // 로그인여부
	public isScan: boolean = false; // 스캔여부

    public userInfo : COMTB_USER01DTO = new COMTB_USER01DTO();
	
	public deptList = [];
	public statCodeList = []; 

    public setUserInfo(data) {
        this.userInfo = data;
	}
	
}

export class DatePickerCustomOptions implements DatePickerOptions {
	mode;
	date;
	androidTheme;

	constructor() {
		this.date = new Date();
		this.mode = "date";
		this.androidTheme = new DatePicker().ANDROID_THEMES.THEME_HOLO_LIGHT;
	}
}
