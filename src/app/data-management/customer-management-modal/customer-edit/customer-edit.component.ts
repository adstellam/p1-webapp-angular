import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Customer } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-customer-edit',
	templateUrl: './customer-edit.component.html',
	styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

	@Input() id: string;
	customer: Customer;
	customerEditForm: FormGroup; 
	stateList: string[];
	hourList: number[];
	timezoneList: string[];
	uid: string;

	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
        this.http.get<Customer>(`${environment.apiUrl}/customers/${this.id}`)
            .subscribe(
                customer => {
                    this.customer = customer;
                });
		this.customerEditForm = this.fb.group({
			name: [],
			dotNumber: [],
			streetAddress: [],
			city: [],
			state: [],
			zip: [],
			phone: [],
			email: [],
			contactPerson: [],
			logoFileName: [],
			timezone: [],
			eldDayStart: []
   		});
   		this.stateList = optionlists.stateList;
   		this.hourList = optionlists.hourList;
   		this.timezoneList = optionlists.timezoneList;
   		this.uid = localStorage.getItem('UserId');
	}

	editCustomer() {
		this.patchCustomerEditFormData()
		const headers = new HttpHeaders()
      		.set("Content-Type", "application/json");
    	this.http.put<Customer>(`${environment.apiUrl}/customers/${this.id}`, this.customer, { headers })
      		.subscribe(
      			val => { 
          			console.log("Customer edited successfully: ", val);
        		},
        		err => {
          			console.log("Failed to edit customer: ", err);
        		}
      		);
      	this.activeModal.close();
      	setTimeout(() => {
      		this.router.navigateByUrl('/', { skipLocationChange: true })
	            .then(() => {
	                this.router.navigate(['/customer-home', this.customer.id, 'customer-management']);
	            });
      	}, 1000);
	}

	patchCustomerEditFormData() {
		if (this.customerEditForm.value.name) 
			this.customer.name = this.customerEditForm.value.name;
		if (this.customerEditForm.value.dotNumber) 
			this.customer.dotNumber = this.customerEditForm.value.dotNumber;
		if (this.customerEditForm.value.streetAddress) 
			this.customer.streetAddress = this.customerEditForm.value.streetAddress;
		if (this.customerEditForm.value.state)
			this.customer.state = this.customerEditForm.value.state;
		if (this.customerEditForm.value.zip)
			this.customer.zip = this.customerEditForm.value.zip;
		if (this.customerEditForm.value.phone)
			this.customer.phone = this.customerEditForm.value.phone;
		if (this.customerEditForm.value.email)
			this.customer.email = this.customerEditForm.value.email;
		if (this.customerEditForm.value.contactPerson)
			this.customer.contactPerson = this.customerEditForm.value.contactPerson;
		if (this.customerEditForm.value.logoFileName)
			this.customer.logoFileName = this.customerEditForm.value.logoFileName;
		if (this.customerEditForm.value.timezone)
			this.customer.timezone = this.customerEditForm.value.timezone;
		if (this.customerEditForm.value.eldDayPeriodStartingTime)
			this.customer.eldDayStart = this.customerEditForm.value.eldDayStart;
		this.customer.editedAt = new Date();
		this.customer.editedBy = this.uid;
	}
	
}
