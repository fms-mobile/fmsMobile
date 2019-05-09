import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalVars } from "./GlobalVars";
import { AuthService } from "./AuthService";
import { Observable, of } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { COMMON_DAO } from "../db/COMMON_DAO";
import { DIGR01_GROUPDTO } from "../model/DIGR01_GROUPDTO";
import { COMTB_FILE01DTO } from "../model/COMTB_FILE01DTO";
import { File, FileEntry } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";

@Injectable()
export class TransmissionService {
    url : string;
    tableMap : {};

    constructor(private http: HttpClient, private globalVars :GlobalVars, private authService:AuthService,public file:File ,public filePath : FilePath){
        this.url = globalVars.webUrl+"mobile";
    }

    sendPost(apiUrl :string, param : any, headers) : Observable<Object> {
        return this.http.post(this.url+apiUrl,param,{ headers });
    }

    syncAllData(param : any,token : any){
        this.authService.authHeader().then(headers => {
            if(token != null) {
                headers = headers.set('Authorization', "Bearer "+token);
            }

            this.sendPost('/api/syncData.do',param,headers).pipe(
                retry(3),
                map(res => {
                    if (!res) {
                    } else {
                        for (const key in res) {
                            let dao : COMMON_DAO = this.globalVars.db.daoMap[key];
                            this.syncTableDB(dao,res[key]);
                        }
                    }
                    return res;
                }),
                catchError(err => of([]))
            ).subscribe()
        });
    }

    syncTableDB(dao : COMMON_DAO, data : any) {
        dao.deleteAll(null,()=>{
            if( data instanceof Array) {
                data.forEach(res => {
                    dao.insert(res.bxmap,()=>{});
                });
            } else if (data instanceof Object) {
                dao.insert(data.bxmap,()=>{});
            }
        });

    }

    saveData(digr01Group: DIGR01_GROUPDTO) {
        let param = digr01Group.convertServerObject();
        let formData = new FormData();
        formData.append('jsondata',JSON.stringify(param));

        let file01List : Array<COMTB_FILE01DTO> = param["COMTB_FILE01"];
        const file_len = file01List.length;
        let file_cnt = 0;


        if(file_len > 0) {
            file01List.forEach((file01)=>{
                let that = this;
                this.file.resolveLocalFilesystemUrl(file01.img_data).then(entry => {
                    let _formData = formData;
                    ( < FileEntry > entry).file(file => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const imgBlob = new Blob([reader.result], {
                                type: file.type
                            });
                            _formData.append('files', imgBlob, file.name);
                            file_cnt += 1;
                            if( file_cnt == file_len) {
                                that.saveDataRequest(_formData);
                            }
                        };
                        reader.readAsArrayBuffer(file);
                    });
                })
            });
        } else {
            this.saveDataRequest(formData);
        }
    }

    saveDataRequest(formData : FormData) {
        this.authService.authFormHeader().then(headers => {
            this.sendPost('/api/saveData.do',formData,headers).pipe(
                map(res => {
                    if (!res) {
                    } else {
                    }
                    return res;
                }),
                catchError(err => of([]))
            ).subscribe()
        });
    }
}
