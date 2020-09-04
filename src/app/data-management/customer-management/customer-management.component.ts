import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CustomerEditComponent } from '../customer-management-modal/customer-edit/customer-edit.component';

import { Customer } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-customer-management',
    templateUrl: './customer-management.component.html',
    styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

    cid: string;
    customer: Customer;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public modalService: NgbModal) { }

    ngOnInit() {
    	this.cid = this.route.snapshot.parent.paramMap.get('cid');
    	this.http.get<Customer>(`${environment.apiUrl}/customers/${this.cid}`)
            .subscribe(customer => {
                this.customer = customer;
            }); 
    }

    openCustomerEditModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(CustomerEditComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.id = id;
    }

}

