import { Injectable } from '@angular/core';

@Injectable()
export class MANTB_DIGR01VO {
    public facil_no : string = "";
    public dign_seq : number = 0;
    public project_no : string = "";
    public report_yy : string = "";
    public start_ymd : string = "";
    public end_ymd : string = "";
    public dign_gbn : string = "";
    public regular_gbn : string = "";
    public dign_corp_cd : string = "";
    public dign_corp_nm : string = "";
    public rep_engineer_nm : string = "";
    public dign_amt : number = 0;
    public state_grade : string = "";
    public dign_content : string = "";
    public amend_content : string = "";
    public dign4_need_yn : string = "";
    public wrt_ymd : string = "";
    public wrt_person_nm : string = "";
    public local_yn : string = "";

    constructor(){
        this.facil_no = "";
        this.dign_seq = 0;
        this.project_no = "";
        this.report_yy = "";
        this.start_ymd = "";
        this.end_ymd = "";
        this.dign_gbn = "";
        this.regular_gbn = "";
        this.dign_corp_cd = "";
        this.dign_corp_nm = "";
        this.rep_engineer_nm = "";
        this.dign_amt = 0;
        this.state_grade = "";
        this.dign_content = "";
        this.amend_content = "";
        this.dign4_need_yn = "";
        this.wrt_ymd = "";
        this.wrt_person_nm = "";
        this.local_yn = "";
    }
}