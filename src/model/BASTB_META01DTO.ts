import { Injectable } from '@angular/core';

@Injectable()
export class BASTB_META01DTO {
    public entity_id : string = ""; 
    public entity_nm : string = ""; 
    public abbr_nm : string = ""; 
    public entity_type : string = ""; 
    public input_yn : string = ""; 
    public eval_entity : string = ""; 
    public entity_lvl : number = null;
    public upper_id : string = ""; 
    public struct_kind : string = ""; 
    public object_key : string = ""; 
    public search_key : string = ""; 
    public weight : number = null;
    public sort_order : number = null;
    public use_yn : string = ""; 

    constructor(){
        this.entity_id = ""; 
        this.entity_nm = ""; 
        this.abbr_nm = ""; 
        this.entity_type = ""; 
        this.input_yn = ""; 
        this.eval_entity = ""; 
        this.entity_lvl = null;
        this.upper_id = ""; 
        this.struct_kind = ""; 
        this.object_key = ""; 
        this.search_key = ""; 
        this.weight = null;
        this.sort_order = null;
        this.use_yn = "";
    }
}