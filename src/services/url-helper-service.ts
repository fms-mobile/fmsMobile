import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { Http, ResponseContentType, RequestOptions, Headers } from "@angular/http";
import { AuthGuardService } from "./AuthGuardService";
import { AuthService } from "./AuthService";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class UrlHelperService {
    constructor(private http: Http, private authGuardService : AuthGuardService, private authService : AuthService, private domSanitizer: DomSanitizer,
        ){
    }

    get(url: any): Observable<any> {
        let options = new RequestOptions();

        if(this.authGuardService.canActivate()){
            options.headers = new Headers();
            options.headers.append('Authorization', "Bearer "+this.authService.tokenKey);
            options.responseType = ResponseContentType.Blob;

            return new Observable((observer: Subscriber<any>) => {
                let objectUrl: any = null;

                this.http
                    .get(url, options)
                    .subscribe(m => {
                        // objectUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(m.blob()));
                        objectUrl = URL.createObjectURL(m.blob());
                        observer.next(objectUrl);
                    });

                return () => {
                    if (objectUrl) {
                        URL.revokeObjectURL(objectUrl);
                        objectUrl = null;
                    }
                };
            });
        } else {
            return new Observable((observer: Subscriber<any>) => {
                let objectUrl: string = null;

                this.http
                    .get(url, options)
                    .subscribe(m => {
                        objectUrl = URL.createObjectURL(m.blob());
                        URL.createObjectURL
                        observer.next(objectUrl);
                    });

                return () => {
                    if (objectUrl) {
                        URL.revokeObjectURL(objectUrl);
                        objectUrl = null;
                    }
                }
            });
        }
    }
}