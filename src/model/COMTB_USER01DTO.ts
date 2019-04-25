import { Injectable } from '@angular/core';

@Injectable()
export class COMTB_USER01DTO {
    public user_id : string;
    public group_cd : string;
    public user_nm : string;
    public group_nm : string;
    public dept_nm : string;
    public position_nm : string;
    public pswd : string;
    public reside_key : string;
    public rep_user_yn : string;
    public facil_auth : string;
    public charge_auth : string;
    public sign_status : string;

    constructor(){
        this.user_id = "";
        this.group_cd = "";
        this.user_nm = "";
        this.group_nm = "";
        this.dept_nm = "";
        this.position_nm = "";
        this.pswd = "";
        this.reside_key = "";
        this.rep_user_yn = "";
        this.facil_auth = "";
        this.charge_auth = "";
        this.sign_status = "";
    }
}