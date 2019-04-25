import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalVars } from "./GlobalVars";
import { AuthService } from "./AuthService";
import { Observable, of } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";


@Injectable()
export class TransmissionService {
    url : string ;

    constructor(private http: HttpClient, private globalVars :GlobalVars, private authService:AuthService){
        this.url = globalVars.serverUrl;
    }

    syncAllData(param : any){
        this.sendPost('/api/syncData.do',param).pipe(
            retry(3),
            map(res => {
                if (!res) {
                } else {
                }
                return res;
            }),
            catchError(err => of([]))
        ).subscribe()
    }

    private sendPost(apiUrl :string, param : any) : Observable<Object>{
        let headers = this.authService.authHeader();
        return this.http.post(this.url+apiUrl,param,{ headers });
    }
}