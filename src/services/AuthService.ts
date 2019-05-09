import { Platform, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { map, catchError , retry} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { GlobalVars } from './GlobalVars';
 
const TOKEN_KEY = 'access_token';
 
@Injectable({
  providedIn:'root'
})
export class AuthService {
 
  url : string ;
  user = null;
  authenticationState = new BehaviorSubject(false);
 
  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController, private globalVars :GlobalVars) {
    // this.url = globalVars.serverUrl;

    this.url = globalVars.webUrl+"mobile";
    this.plt.ready().then(() => {
      this.checkToken();
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
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
 
  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
 
  login(credentials) {
    let headers = new HttpHeaders();
    headers = this.setHeader(headers);

    return this.http.post(`${this.url}/api/login.do`, credentials,{ headers }).pipe(
      retry(3),
      map(res => {
        if (!res) {
          this.showAlert('서버의 응답이 없습니다.');            
        } else {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
        }
        return res;
      }),
      catchError(err => of([]))
    );
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  refreshToken() {

  }
 
  getSpecialData() {
    return this.http.get(`${this.url}/api/special`).pipe(
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
      buttons: ['OK']
    });
    alert.present();
  }

  getToken() :Promise<any> {
    return this.storage.get(TOKEN_KEY);
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
    let headers = new HttpHeaders();
    const token = await this.getToken();

    // headers = this.setHeader(headers);
    // headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.append('Authorization', "Bearer "+token);

    return headers;
  }
}