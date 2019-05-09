import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Injectable()
export class COMTB_FILE01DTO {
    public file_no : number;
    public file_nm : string;
    public file_path : string;
    public file_desc : string;
    public file_type : string;
    public file_size : number;
    public download_cnt : number;
    public ref_table : string;
    public ref_pk : string;
    public etc_remark : string;
    public img_data : string;
    public img_data_security : SafeUrl;
    public img_path : string;

    constructor(){
        this.file_no = null;
        this.file_nm = "";
        this.file_path = "";
        this.file_desc = "";
        this.file_type = "";
        this.file_size = null;
        this.download_cnt = null;
        this.ref_table = "";
        this.ref_pk = "";
        this.etc_remark = "";
        this.img_data = "";
        this.img_data_security = "";
        this.img_path = "";
    }
}