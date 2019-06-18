import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalVars } from "./GlobalVars";
import { AuthService } from "./AuthService";
import { Observable, of } from "rxjs";
import { map, catchError, retry, first } from "rxjs/operators";
import { COMMON_DAO } from "../db/COMMON_DAO";
import { DIGR01_GROUPDTO } from "../model/DIGR01_GROUPDTO";
import { COMTB_FILE01DTO } from "../model/COMTB_FILE01DTO";
import { File, FileEntry } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { AlertController } from "ionic-angular";
import { TempDataManage } from "./TempDataManage";
import 'rxjs/add/operator/take';
import { LoadingService } from "./loading-service";
import { Storage } from '@ionic/storage';

@Injectable()
export class TransmissionService {
    url : string;
    tableMap : {};

    constructor(private http: HttpClient, private globalVars :GlobalVars
        , private authService:AuthService,public file:File ,public filePath : FilePath
        , private alertCtrl : AlertController, private tempDataManage : TempDataManage
        , private loadingService: LoadingService, private storage : Storage
        ){
        this.url = globalVars.webUrl+"mobile";
    }

    sendPost(apiUrl :string, param : any, headers) : Observable<Object> {
        return this.http.post(this.url+apiUrl,param,{ headers });
    }

    syncAllData(param : any,token? : any, alertYN? : boolean){
        this.authService.authHeader().then(headers => {
            if(token != null) {
                headers = headers.set('Authorization', "Bearer "+token);
            }

            this.sendPost('/api/syncData.do',param,headers)
            .pipe(
                retry(2),
                map(res => {
                    if (!res) {
                    } else {
                        for (const key in res) {
                            let dao : COMMON_DAO = this.globalVars.db.daoMap[key];

                            if(dao){
                                this.syncTableDB(dao,res[key]);
                            } else {
                                this.storage.remove(key);
                                this.storage.set(key,res[key]);
                            }
                        }
                    }
                    return res;
                }),
                catchError(err => of([]))
            ).subscribe(res => {
                if(alertYN) {
                    this.loadingService.hide();
                    let alertTile = "데이터 동기화";
                    let alertMessage = '데이터 동기화가 완료 되었습니다.';
                    let alert = this.alertCtrl.create({
                        title: alertTile ,
                        message: alertMessage,
                        cssClass : "alert-info",
                        buttons: [
                        {
                            text: '확인',
                            handler: () => {
                            }
                        }
                        ]
                    });
                    alert.present();
                }
            }) 
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
        let validate = digr01Group.validateServerObject();

        if(!validate["passFlag"]){
            let alertTile = "검증 에러";
            let alertMessage = validate["msg"];
            let alert = this.alertCtrl.create({
                title: alertTile ,
                message: alertMessage,
                cssClass : "alert-error",
                buttons: [
                {
                    text: '확인',
                    handler: () => {
                    }
                }
                ]
            });
            alert.present();
        } else {
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
    }

    saveDataRequest(formData : FormData) {
        this.authService.authFormHeader().then(headers => {
            this.sendPost('/api/saveData.do',formData,headers)
            .pipe(
                first(),
                map((res : any) => {
                    if (!res) {
                    } else {
                        let alertTile = "서버전송 실패알림";
                        let alertMessage = "서버 전송을 실패하였습니다.";
                        let alertCssClass = "";

                        switch (res.result) {
                            case "success":
                                alertTile = "서버전송 결과알림";
                                alertMessage = "서버 전송에 성공했습니다."
                                alertCssClass = "alert-info";

                                let uuid = res.uuid;
                                let transObject : DIGR01_GROUPDTO =  this.tempDataManage.digr01GroupList.find(digr01Group => digr01Group.uuid == uuid);
                                transObject.transFlag = true;
                                transObject.responseObject = res.MANTB_DIGR01;

                                break;
                            case "error" :
                                res["MANTB_DIGR01"].forEach(response => {
                                    if(response.msg != '') alertMessage = response.msg;
                                });
                                alertCssClass = "alert-warning";
                                break;
                            default:
                                break;
                        }

                        let alert = this.alertCtrl.create({
                            title: alertTile ,
                            message: alertMessage,
                            cssClass : alertCssClass,
                            buttons: [
                            {
                                text: '확인',
                                handler: () => {
                                }
                            }
                            ]
                        });
                        alert.present();

                    }
                    return res;
                }),
                catchError(err => of([]))
            ).subscribe()
        });
    }
    
    getApiData(url : any, param? : any) {
        return this.sendPost(url,param,this.authService.getHeader())
            .pipe(
                first(),
                catchError(err => of([]))
            )
    }
}
