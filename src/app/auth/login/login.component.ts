import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

//import { JwtObj } from '../../interfaces';
import { JwtObj, JwtPayload, VedasUser } from '../../interfaces';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup; 

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
    //constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private jwtHelper: JwtHelperService) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        //
        if (this.loginForm.value.username && this.loginForm.value.password) 
            this.authService.authenticateByLoginCredential(this.loginForm.value.username, this.loginForm.value.password).subscribe(
                (jwt: JwtObj) => {
                    localStorage.setItem('Jwt', jwt.jwt);
                    console.log("JWT: ", jwt.jwt);
                    const jwtDecoded: JwtPayload = this.authService.decodeJwt(jwt.jwt);
                    localStorage.setItem('UserId', jwtDecoded.uid);
                    localStorage.setItem('UserRole', jwtDecoded.role);
                    this.router.navigate(['/customer-home', jwtDecoded.cid]);
            	},
                (err) => {
                    window.alert("Incorrect username or password. Try again.");
                    this.router.navigateByUrl('/login');
                }
            );
        //
        /*
        if (this.loginForm.value.username && this.loginForm.value.password) {
            this.authService.authenticateByLoginCredential(this.loginForm.value.username, this.loginForm.value.password).subscribe(
                (vedasUser: VedasUser) => {
                    localStorage.setItem('UserId', vedasUser.id);
                    localStorage.setItem('UserRole', vedasUser.role);
                    this.router.navigate(['/customer-home', vedasUser.cid]);
                },
                err => {
                    window.alert("Incorrect username or password. Try again.");
                    this.router.navigateByUrl('/login');
                }
            );
        }
        */
    }

    showReadMe() {
        window.alert("This is a demo version, in which telematics and analytics data arrive from a simulated source rather than from real VeDAS devices. Please understand that, for this reason, certain real-time data in the VeDAS Dashboard may not appear consistent.");
    }

}
