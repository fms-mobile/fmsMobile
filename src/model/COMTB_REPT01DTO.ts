import { Injectable } from '@angular/core';

@Injectable()
export class COMTB_REPT01DTO {
    public rpt_no : number = 0;
    public ref_pk : string = ""; 
    public rpt_class : string = ""; 
    public rpt_content : string = ""; 

    constructor(){
        this.rpt_no = 0;
        this.ref_pk = ""; 
        this.rpt_class = ""; 
        this.rpt_content = ""; 
    }
}