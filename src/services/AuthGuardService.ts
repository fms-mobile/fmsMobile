import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './AuthService';
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
  constructor(public auth: AuthService) {}
 
  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}