import { Injectable } from '@angular/core';
import { COMTB_REPT01VO } from './COMTB_REPT01VO';
import { MANTB_DIGR12VO } from './MANTB_DIGR12VO';
import { MANTB_DIGR13VO } from './MANTB_DIGR13VO';

/**
 * 데이터 구조
 * MANTB_DIGR01VO => 점검진단실적  {
 *  comtbRept01 COMTB_REPT01VO => 공통 보고서
 *  digr12Object Array<MANTB_DIGR12VO> => 중대결함
 *  digr13Object Array<MANTB_DIGR13VO> => 정기점검표
 * }
 */
@Injectable()
export class MANTB_DIGR01VO {
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
    public dign_content : string;
    public amend_content : string;
    public dign4_need_yn : string;
    public wrt_ymd : string;
    public wrt_person_nm : string;
    public local_yn : string;
    
    public comtbRept01 : COMTB_REPT01VO;
    public digr12Object : Array<MANTB_DIGR12VO>;
    public digr13Object : Array<MANTB_DIGR13VO>;

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

        this.comtbRept01 = new COMTB_REPT01VO();
        this.digr12Object = new Array<MANTB_DIGR12VO>();
        this.digr13Object = new Array<MANTB_DIGR13VO>();
    }

    
}