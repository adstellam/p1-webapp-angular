import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { Customer } from '../interfaces';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-customer-home',
    templateUrl: './customer-home.component.html',
    styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

    cid: string;
    customerLogoFilePath: string;
    uid: string;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public authService: AuthService) { }

    ngOnInit() {
    	this.cid = this.route.snapshot.paramMap.get('cid');
    	this.http.get<Customer>(`${environment.apiUrl}/customers/${this.cid}`)
            .subscribe(customer => { 
    		    this.customerLogoFilePath = `../../assets/customer/${this.cid}/${customer.logoFileName}`; 
    		}
    	);
        this.uid = localStorage.getItem('UserId');
    }

    signout() {
        this.authService.removeJwt();
        this.router.navigateByUrl('/login');
    }

}
