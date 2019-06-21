import { Injectable } from '@angular/core';
import { BASTB_TREE01DTO } from './BASTB_TREE01DTO';
import { COMTB_FILE01DTO } from './COMTB_FILE01DTO';

@Injectable()
export class MANTB_DIGR11DTO {
    public facil_no : string;
    public dign_seq : number;
    public record_no : number;
    public record_type : string;
    public object_no : string;
    public entity_id : string;
    public buwee_cd : string;
    public defect_cd : string;
    public defect_cd1 : string;
    public defect_cd1Obj : any;
    public defect_cd2 : string;
    public defect_cd2Obj : any;
    public defect_cd3 : string;
    public defect_cd3Obj : any;
    public cause_cd : string;
    public amend_cd : string;
    public space_nm : string;
    public object_nm : string;
    public object_path : string;
    public buwee_nm : string;
    public serious_cd : string;
    public defect_nm : string;
    public defect_size : string;
    public defect_val1 : string;
    public defect_val2 : string;
    public defect_val3 : string;
    public area_rate : string;
    public cause_nm : string;
    public amend_nm : string;
    public eval_item_cd : string;
    public eval_grade : string;
    public eval_score : number;
    public defect_lvl : string;
    public inf_coef : number;
    public etc_remark : string;

    public serious_defect : any;
    public comtbFile01Array :Array<COMTB_FILE01DTO>;
    public recursiveTreeList : Array<any>;
    public objectArray : Array<any>;
    public inspectGrade : any;

    constructor(){
        this.facil_no = "";
        this.dign_seq = null;
        this.record_no = null;
        this.record_type = "1";
        this.object_no = "";
        this.entity_id = "";
        this.buwee_cd = "";
        this.defect_cd = "";
        this.defect_cd1 = "";
        this.defect_cd1Obj = {};
        this.defect_cd2 = "";
        this.defect_cd2Obj = {};
        this.defect_cd3 = "";
        this.defect_cd3Obj = {};
        this.cause_cd = "";
        this.amend_cd = "";
        this.space_nm = "";
        this.object_nm = "";
        this.object_path = "";
        this.buwee_nm = "";
        this.serious_cd = "";
        this.defect_nm = "";
        this.defect_size = "";
        this.defect_val1 = "";
        this.defect_val2 = "";
        this.defect_val3 = "";
        this.area_rate = "";
        this.cause_nm = "";
        this.amend_nm = "";
        this.eval_item_cd = "";
        this.eval_grade = "";
        this.eval_score = null;
        this.defect_lvl = "";
        this.inf_coef = null;
        this.etc_remark = "";

        this.serious_defect = null;
        this.comtbFile01Array = new Array<COMTB_FILE01DTO>();
        this.recursiveTreeList = new Array<any>();
        this.objectArray = new Array<any>();
        this.inspectGrade = null;
    }
}