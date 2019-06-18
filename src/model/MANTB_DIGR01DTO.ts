import { Injectable } from '@angular/core';
import { MANTB_DIGR13DTO } from './MANTB_DIGR13DTO';
import { MANTB_DIGR11DTO } from './MANTB_DIGR11DTO';

/**
 * 데이터 구조
 * MANTB_DIGR01DTO => 점검진단실적  {
 *  comtbRept01 COMTB_REPT01DTO => 공통 보고서
 *  digr12Array Array<MANTB_DIGR12DTO> => 중대결함
 *  digr13Array Array<MANTB_DIGR13DTO> => 정기점검표
 * }
 */
@Injectable()
export class MANTB_DIGR01DTO {
    public facil_no : string;
    public dign_seq : number;
    public project_no : string;
    public report_yy : string;
    public start_ymd : string;
    public end_ymd : string;
    public dign_gbn : string;
    public dign_gbn_nm : string;
    public regular_gbn : string;
    public regular_gbn_nm : string;
    public dign_corp_cd : string;
    public dign_corp_nm : string;
    public rep_engineer_nm : string;
    public dign_amt : number;
    public state_grade : string;
    public state_grade_nm : string;
    public dign_content : string;
    public amend_content : string;
    public dign4_need_yn : boolean;
    public wrt_ymd : string;
    public wrt_person_nm : string;
    public vent_yn : boolean;
    public vent_amend_yn : string;
    public vent_chk_result : string;
    public vent_content : string;
    public local_yn : string;
    
    // public comtbRept01 : COMTB_REPT01DTO;
    // public digr12Array : Array<MANTB_DIGR12DTO>;
    public digr13Array : Array<MANTB_DIGR13DTO>;
    public digr11Array : Array<MANTB_DIGR11DTO>;

    constructor(){
        this.facil_no = "";
        this.dign_seq = null;
        this.project_no = "";
        this.report_yy = "";
        this.start_ymd = "";
        this.end_ymd = "";
        this.dign_gbn = "100";
        this.dign_gbn_nm = "정기점검";
        this.regular_gbn = "";
        this.dign_corp_cd = "A";
        this.dign_corp_nm = "자체수행";
        this.rep_engineer_nm = "";
        this.dign_amt = null;
        this.state_grade = "";
        this.state_grade_nm = "";
        this.dign_content = "";
        this.amend_content = "";
        this.dign4_need_yn = false;
        this.wrt_ymd = "";
        this.wrt_person_nm = "";
        this.vent_yn = false;
        this.vent_amend_yn = "X";
        this.vent_chk_result = "";
        this.vent_content = "";
        this.local_yn = "";

        // this.comtbRept01 = new COMTB_REPT01DTO();
        // this.digr12Array = new Array<MANTB_DIGR12DTO>();
        this.digr13Array = new Array<MANTB_DIGR13DTO>();
        this.digr11Array = new Array<MANTB_DIGR11DTO>();
    }
}