import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (true) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
        /*
        if (this.authService.hasValidJwt()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
        */
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(next, state);
    }
    
}
