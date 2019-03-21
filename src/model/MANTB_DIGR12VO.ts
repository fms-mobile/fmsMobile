import { Injectable } from '@angular/core';

@Injectable()
export class MANTB_DIGR12VO {
    public facil_no : string;
    public dign_seq : number;
    public defect_cd : string;
    public object_no : string;

    constructor(){
        this.facil_no = "";
        this.dign_seq = 0;
        this.defect_cd = "";
        this.object_no = "";
    }
}