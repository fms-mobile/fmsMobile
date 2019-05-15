import { Injectable } from '@angular/core';
import { COMTB_FILE01DTO } from './COMTB_FILE01DTO';

@Injectable()
export class MANTB_DIGR12DTO {
    public facil_no : string;
    public dign_seq : number;
    public defect_cd : string;
    public object_no : string;

    public seriousDefectList : Array<any>;
    public facilPart : any;
    public comtbFile01Array :Array<COMTB_FILE01DTO>;

    constructor(){
        this.facil_no = "";
        this.dign_seq = null;
        this.defect_cd = "";
        this.object_no = "";

        this.seriousDefectList = Array<any>();
        this.facilPart = null;
        this.comtbFile01Array = new Array<COMTB_FILE01DTO>();
    }
}