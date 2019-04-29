import { Injectable } from '@angular/core';

@Injectable()
export class MANTB_DIGR12DTO {
    public facil_no : string;
    public dign_seq : number;
    public defect_cd : string;
    public object_no : string;

    public seriousDefectList : Array<any>;
    public facilPart : any;

    constructor(){
        this.facil_no = "";
        this.dign_seq = null;
        this.defect_cd = "";
        this.object_no = "";

        this.seriousDefectList = Array<any>();
        this.facilPart = {};
    }
}