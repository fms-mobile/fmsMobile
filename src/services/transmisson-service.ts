import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalVars } from "./GlobalVars";
import { AuthService } from "./AuthService";
import { Observable, of } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { COMMON_DAO } from "../db/COMMON_DAO";

@Injectable()
export class TransmissionService {
    url : string;
    tableMap : {};

    constructor(private http: HttpClient, private globalVars :GlobalVars, private authService:AuthService){
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
}
