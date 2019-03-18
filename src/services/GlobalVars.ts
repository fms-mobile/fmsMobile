import { BASTB_MAST01VO } from './../model/BASTB_MAST01VO';
import { MANTB_DIGR01VO } from './../model/MANTB_DIGR01VO';
import { Injectable } from '@angular/core';

// import * as moment from 'moment';

@Injectable()
export class GlobalVars {
    public isDev : string = "Y";    // 개발중여부 
    public appVersion : number = 3;
    public db;    //   DB
     
    public appName : string = "";
    public mainCopyRight : string = "Copyright<span style='font-size:0.5rem;'>(C)</span> 2018 (주) 신진아이티컨설팅";
	//public serverUrl : string = "http://61.252.208.165:8080/";
	public serverUrl : string = "http://localhost:8080/";

	public isLogin: boolean = false;  // 로그인여부 
	public isScan: boolean = false; // 스캔여부
	
	public digr01 : MANTB_DIGR01VO = new MANTB_DIGR01VO();
	public selectedMast01List : Array<BASTB_MAST01VO>;

    public userInfo = {
        corp_id     : "",
        user_id     : "",
        user_nm     : "",
	    empl_no  	: "",
	    empl_nm  	: "",
	    dept_cd  	: "",
	    dept_nm  	: "",
	    part_cd  	: "",
	    part_nm  	: "",
	    position_cd	: "",
	    position_nm	: "",
	    unit_cd  	: "",
        unit_nm 	: "",
        mobile_tel  : "",
	    empl_class 	: "",
        user_lvl 	: "",
        use_auth    : "", 
        enc_user_id : "",
        enc_pswd    : "",
        email_id    : "",
        
	};  // 로그인 사용자 정보 
	
	public deptList = [];
	public statCodeList = []; 

    public setUserInfo(data) {
        this.userInfo.user_id       = data.user_id;
        this.userInfo.user_nm       = data.user_nm;
	    this.userInfo.empl_no  	    = data.empl_no;
	    this.userInfo.empl_nm  	    = data.empl_nm;
	    this.userInfo.dept_cd  	    = data.dept_cd;
	    this.userInfo.dept_nm  	    = data.dept_nm;
	    this.userInfo.part_cd  	    = data.part_cd;
	    this.userInfo.part_nm  	    = data.part_nm;
	    this.userInfo.position_cd	= data.position_cd;
	    this.userInfo.position_nm	= data.position_nm;
	    this.userInfo.unit_cd  	    = data.unit_cd;
	    this.userInfo.unit_nm 	    = data.unit_nm;
	    this.userInfo.mobile_tel 	= data.mobile_tel;
	    this.userInfo.empl_class 	= data.empl_class;
	    this.userInfo.user_lvl 	    = data.user_lvl;
	    this.userInfo.use_auth 	    = data.use_auth;
	    this.userInfo.enc_user_id 	= data.enc_user_id;
        this.userInfo.enc_pswd 	    = data.enc_pswd;
        this.userInfo.email_id      = data.email_id;
	}

	constructor(){
		this.selectedMast01List = new Array<BASTB_MAST01VO>();
	}
}