import { Injectable } from '@angular/core';
import { COMTB_REPT01DTO } from './COMTB_REPT01DTO';
import { MANTB_DIGR12DTO } from './MANTB_DIGR12DTO';
import { MANTB_DIGR13DTO } from './MANTB_DIGR13DTO';
import { COMTB_FILE01DTO } from './COMTB_FILE01DTO';

/**
 * 데이터 구조
 * MANTB_DIGR01DTO => 점검진단실적  {
 *  comtbRept01 COMTB_REPT01DTO => 공통 보고서
 *  digr12Object Array<MANTB_DIGR12DTO> => 중대결함
 *  digr13Object Array<MANTB_DIGR13DTO> => 정기점검표
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
    public dign_content : string;
    public amend_content : string;
    public dign4_need_yn : string;
    public wrt_ymd : string;
    public wrt_person_nm : string;
    public local_yn : string;
    
    public comtbRept01 : COMTB_REPT01DTO;
    public digr12Object : Array<MANTB_DIGR12DTO>;
    public digr13Object : Array<MANTB_DIGR13DTO>;
    public comtbFile01Array : Array<COMTB_FILE01DTO>;

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
        this.dign_corp_cd = "";
        this.dign_corp_nm = "";
        this.rep_engineer_nm = "";
        this.dign_amt = null;
        this.state_grade = "";
        this.dign_content = "";
        this.amend_content = "";
        this.dign4_need_yn = "";
        this.wrt_ymd = "";
        this.wrt_person_nm = "";
        this.local_yn = "";

        this.comtbRept01 = new COMTB_REPT01DTO();
        this.digr12Object = new Array<MANTB_DIGR12DTO>();
        this.digr13Object = new Array<MANTB_DIGR13DTO>();
        this.comtbFile01Array = new Array<COMTB_FILE01DTO>();
    }

    
}