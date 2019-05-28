import { Injectable } from '@angular/core';

@Injectable()
export class MANTB_DIGR11DTO {
    public facil_no : string;
    public dign_seq : number;
    public engineer_seq : number;
    public engineer_nm : string;
    public birth_ymd : string;
    public sex : string;
    public rep_yn : boolean;
    public start_ymd : string;
    public end_ymd : string;
    public parti_days : number;
    public parti_rate : number;
    public tech_grade : string;
    public tech_grade_nm : string;
    public member_seq : number;

    constructor(){
        this.facil_no = "";
        this.dign_seq = null;
        this.engineer_seq = null;
        this.engineer_nm = "";
        this.birth_ymd = "";
        this.sex = "";
        this.rep_yn = false;
        this.start_ymd = "";
        this.end_ymd = "";
        this.parti_days = null;
        this.parti_rate = null;
        this.tech_grade = "";
        this.tech_grade_nm = "";
        this.member_seq = null;
    }
}