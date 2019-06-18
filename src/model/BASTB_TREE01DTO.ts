import { Injectable } from '@angular/core';

@Injectable()
export class BASTB_TREE01DTO {
    public facil_no : string;
    public object_no : string;
    public object_nm : string;
    public abbr_nm : string;
    public entity_id : string;
    public object_lvl : number;
    public upper_no : string;
    public use_yn : string;

    constructor(){
        this.facil_no = "";
        this.object_no = "";
        this.object_nm = "";
        this.abbr_nm = "";
        this.entity_id = "";
        this.object_lvl = null;
        this.upper_no = "";
        this.use_yn = "";
    }
}