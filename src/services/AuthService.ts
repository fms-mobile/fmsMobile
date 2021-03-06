import { Platform, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { map, catchError, first } from 'rxjs/operators';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import { BehaviorSubject, empty } from 'rxjs';
import { GlobalVars } from './GlobalVars';
import { LoadingService } from './loading-service';
import { Firebase } from '@ionic-native/firebase';
 
const TOKEN_KEY = 'access_token';
 
@Injectable({
  providedIn:'root'
})
export class AuthService {
 
  url : string ;
  user = null;
  authenticationState = new BehaviorSubject(false);
  tokenKey : string = '';
  headers :HttpHeaders = new HttpHeaders();
  formheaders :HttpHeaders = new HttpHeaders();
 
  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController, private globalVars :GlobalVars,
    private loadingService : LoadingService, private firebase :Firebase
    ) {
    // this.url = globalVars.serverUrl;

    this.url = globalVars.appServerRestUrl;
    this.plt.ready().then(() => {
      this.checkToken();
      this.initHeader();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
 
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
          this.tokenKey = token;
          if(this.user) {
            this.firebase.subscribe(this.user.sub);
          }
        } else {
          this.storage.remove(TOKEN_KEY);
          this.tokenKey = '';
          if(this.user) {
            this.firebase.unsubscribe(this.user.sub);
          }
        }
      }
    });
  }
 
  register(credentials) {
    return this.http.post(`${this.url}api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
 
  login(credentials) {
    let headers = new HttpHeaders();
    headers = this.setHeader(headers);

    this.loadingService.show();
    return this.http.post(`${this.url}api/login.do`, credentials,{ headers })
    .timeout(3000)
    .pipe(
      first(),
      map(res => {
        if (!res) {
          this.showAlert('서버의 응답이 없습니다.');
        } else {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.tokenKey = res['token'];
          this.authenticationState.next(true);
          if(this.user) {
            this.firebase.subscribe(this.user.sub);
          }
        }
        this.loadingService.hide();
        return res;
      }),
      catchError(err => {
        let status = err.status;
        let msg :string;
        if (status === 403) {
          msg = err.error.resultMsg
        } else {
          msg = '서버의 응답이 없습니다.';
        }
        this.showAlert(msg);
        this.loadingService.hide();
        return empty();
      })
    );
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.tokenKey = '';
      if(this.user){
        this.firebase.unsubscribe(this.user.sub);
      }
    });
  }

  refreshToken() {

  }
 
  getSpecialData() {
    return this.http.get(`${this.url}api/special`)
    .pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      title: 'Error',
      buttons: ['확인']
    });
    alert.present();
  }

  getToken() :Promise<any> {
    return this.storage.get(TOKEN_KEY);
  }

  initHeader() {
    this.headers = this.setHeader(this.headers);
  }

  setHeader(headers : HttpHeaders) {
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin' , '*');
    headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    return headers;
  }

  async authHeader() : Promise<HttpHeaders> {
    let headers = new HttpHeaders();
    const token = await this.getToken();

    headers = this.setHeader(headers);
    headers = headers.append('Authorization', "Bearer "+token);

    return headers;
  }

  async authFormHeader() : Promise<HttpHeaders> {
    let headers = this.formheaders;
    const token = await this.getToken();

    headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers = headers.append('Access-Control-Allow-Origin' , '*');
    // headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.append('Authorization', "Bearer "+token);

    return headers;
  }

  getHeader() : HttpHeaders {
    let returnHeaders = this.headers;
    if(this.tokenKey != '') {
      returnHeaders = returnHeaders.append('Authorization', "Bearer "+this.tokenKey);
    }
    return returnHeaders;
  }
}