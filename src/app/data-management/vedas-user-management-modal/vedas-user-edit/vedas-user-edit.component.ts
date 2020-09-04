import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { VedasUser, Driver } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-vedas-user-edit',
	templateUrl: './vedas-user-edit.component.html',
	styleUrls: ['./vedas-user-edit.component.css']
})
export class VedasUserEditComponent implements OnInit {

	@Input() vedasUser: VedasUser;
	vedasUserEdited: VedasUser;
	vedasUserEditForm: FormGroup; 
	uid: string;
	urole: string;
	
	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
        this.vedasUserEdited = Object.assign({}, this.vedasUser);
		this.vedasUserEditForm = this.fb.group({
			password: [''],
			role: [''],
			firstName: [''],
			lastName: [''],
			phone: [''],
			email: [''],
   		});
   		this.uid = localStorage.getItem('UserId');
   		this.urole = localStorage.getItem('UserRole');
	}

	editVedasUser() {
		this.assignVedasUserEditFormDataExceptPassword()
		const headers = new HttpHeaders()
      		.set("Content-Type", "application/json");
    	this.http.put<VedasUser>(`${environment.apiUrl}/vedasUsers/${this.vedasUser.username}`, this.vedasUserEdited, { headers })
      		.subscribe(vedasUser => {});
      	if (this.vedasUserEditForm.value.password)
      		this.resetPassword(this.vedasUserEditForm.value.password);
      	if (this.vedasUser.role == 'driver')
      		this.updateDriver();
      	this.activeModal.close();
      	setTimeout(() => {
	      	this.router.navigateByUrl('/', { skipLocationChange: true })
	            .then(() => {
	                this.router.navigate(['/customer-home', this.vedasUser.cid, 'vedas-user-management']);
	            });
        	}, 1000);
	}

	assignVedasUserEditFormDataExceptPassword() {
		//if (this.vedasUserEditForm.value.password) 
		//	this.vedasUserEdited.password = this.vedasUserEditForm.value.password;
		if (this.vedasUserEditForm.value.role)
			this.vedasUserEdited.role = this.vedasUserEditForm.value.role;
		if (this.vedasUserEditForm.value.firstName) 
			this.vedasUserEdited.firstName = this.vedasUserEditForm.value.firstName;
		if (this.vedasUserEditForm.value.lastName) 
			this.vedasUserEdited.lastName = this.vedasUserEditForm.value.lastName;
		if (this.vedasUserEditForm.value.phone)
			this.vedasUserEdited.phone = this.vedasUserEditForm.value.phone;
		if (this.vedasUserEditForm.value.email)
			this.vedasUserEdited.email = this.vedasUserEditForm.value.email;
		this.vedasUserEdited.editedAt = new Date();
		this.vedasUserEdited.editedBy = this.uid;
	}

	resetPassword(password: string) {
		/*const params = new HttpParams()
			.set('password', password);
		const headers = new HttpHeaders()
      		.set("Content-Type", "application/json");
      		*/
		this.http.patch<VedasUser>(`${environment.apiUrl}/vedasUsers/${this.vedasUser.username}`, { password: password })
			.subscribe(vedasUser => {});
	}

	updateDriver() {
		this.http.get<Driver>(`${environment.apiUrl}/drivers/${this.vedasUser.username}`)
      		.subscribe(driver => { 
      			if (this.vedasUserEditForm.value.firstName) 
					driver.firstName = this.vedasUserEditForm.value.firstName;
				if (this.vedasUserEditForm.value.lastName) 
					driver.lastName = this.vedasUserEditForm.value.lastName;
				if (this.vedasUserEditForm.value.phone)
					driver.phone = this.vedasUserEditForm.value.phone;
				if (this.vedasUserEditForm.value.email)
					driver.email = this.vedasUserEditForm.value.email; 
				const headers = new HttpHeaders()
		      		.set("Content-Type", "application/json");
				this.http.put<Driver>(`${environment.apiUrl}/drivers/${this.vedasUser.username}`, driver, { headers })
      				.subscribe(driver => { });
		    });
	}
	
}

