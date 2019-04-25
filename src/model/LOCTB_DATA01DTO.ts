import { Injectable } from '@angular/core';

@Injectable()
export class LOCTB_DATA01DTO {
    public user_id : string;
    public object_id : string;
    public object_contents : string;
    public sort_order : number;
    public send_yn : string;
    public send_result : string;
    public sys_reg_id : string;
    public sys_reg_date : string;
    public sys_upd_id : string;
    public sys_upd_date : string;

    constructor(){
        this.user_id = "";
        this.object_id = "";
        this.object_contents = "";
        this.sort_order = 0;
        this.send_yn = "";
        this.send_result = "";
        this.sys_reg_id = "";
        this.sys_reg_date = "";
        this.sys_upd_id = "";
        this.sys_upd_date = "";
    }
}