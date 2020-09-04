import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { JwtObj, JwtPayload, VedasUser } from '../interfaces';
import { environment } from '../../environments/environment';


@Injectable({
  	providedIn: 'root'
}) 
export class AuthService {

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {};

    hasValidJwt(): boolean {
  		const jwt: string = localStorage.getItem('Jwt');
  		return !this.jwtHelper.isTokenExpired(jwt);
  	}

  	hasPrivilegedJwt(privilegedRoles: string[]): boolean {
  		const jwt: string = localStorage.getItem('Jwt');
  		const jwtPayload: JwtPayload = this.jwtHelper.decodeToken(jwt);
  	   	if (privilegedRoles.includes(jwtPayload.role)) {
  	   		return true;
  	   	} else {
  		    return false;
        }
  	}

    decodeJwt(jwt: string): JwtPayload {
        return this.jwtHelper.decodeToken(jwt);
    }

    //
    authenticateByLoginCredential(username: string, password: string): Observable<JwtObj> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<JwtObj>(`${environment.apiUrl}/login`, { username: username, password: password }, { headers }).pipe(shareReplay());
    }
    //
    /*
    authenticateByLoginCredential(username: string, password: string): Observable<VedasUser> {
        return this.http.get<VedasUser>(`${environment.apiUrl}/vedasUsers/${username}`).pipe(shareReplay());
    }
    */

  	removeJwt() {
  		localStorage.removeItem('Jwt');
  	}

}
