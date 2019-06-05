import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/AuthService";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    constructor(private authService :AuthService){
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        // fetch the bearer token from wherever you have stored it
        // NOTE: fetching it directly from window is not a good idea (demo purpose)
        const jwtToken = this.authService.tokenKey;
        // if there is a token, clone the request and set the correct
        // authorization header, if not => just use the old request
        const requestToHandle = jwtToken
        ? request.clone({
            headers: request.headers.set('Authorization', `Bearer ${jwtToken}`)
        })
        : request;

        return next.handle(requestToHandle);
    }
}