import { Injectable } from '@angular/core';

@Injectable()
export class MANTB_DIGR13DTO {
    public facil_no : string;
    public dign_seq : number;
    public check_seq : number;
    public check_cd : string;
    public check_nm : string;
    public check_result : string;
    public amend_need_yn : boolean;
    public dign_opinion : string;

    constructor(){
        this.facil_no = "";
        this.dign_seq = null;
        this.check_seq = null;
        this.check_cd = "";
        this.check_nm = "";
        this.check_result = "";
        this.amend_need_yn = false;
        this.dign_opinion = "";
    }
}