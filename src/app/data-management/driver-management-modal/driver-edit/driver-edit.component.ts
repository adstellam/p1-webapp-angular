import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Driver, VedasUser } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-driver-edit',
	templateUrl: './driver-edit.component.html',
	styleUrls: ['./driver-edit.component.css']
})
export class DriverEditComponent implements OnInit {

	@Input() driver: Driver;
	driverEdited: Driver;
	driverEditForm: FormGroup; 
	stateList: string[];
	uid: string;

	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
        this.driverEdited = Object.assign({}, this.driver);
		this.driverEditForm = this.fb.group({
			firstName: [''],
			lastName: [''],
			licenseNumber: [''],
			licenseState: [''],
			phone: [''],
			email: [''],
			eldExemptionStatus: [''],
			pictureFileName: ['']
   		});
   		this.stateList = optionlists.stateList;
   		this.uid = localStorage.getItem('UserId');
	}

	editDriver() {
		this.assignDriverEditFormData()
		const headers = new HttpHeaders()
      		.set("Content-Type", "application/json");
    	this.http.put<Driver>(`${environment.apiUrl}/drivers/${this.driver.id}`, this.driverEdited, { headers })
      		.subscribe(driver => { });
      	this.updateVedasUser();
      	this.activeModal.close();
      	setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true })
	            .then(() => {
	                this.router.navigate(['/customer-home', this.driver.cid, 'driver-management']);
	            });
        	}, 1000);
	}

	assignDriverEditFormData() {
		if (this.driverEditForm.value.firstName) 
			this.driverEdited.firstName = this.driverEditForm.value.firstName;
		if (this.driverEditForm.value.lastName) 
			this.driverEdited.lastName = this.driverEditForm.value.lastName;
		if (this.driverEditForm.value.licenseNumber) 
			this.driverEdited.licenseNumber = this.driverEditForm.value.licenseNumber;
		if (this.driverEditForm.value.licenseState)
			this.driverEdited.licenseState = this.driverEditForm.value.licenseState;
		if (this.driverEditForm.value.phone)
			this.driverEdited.phone = this.driverEditForm.value.phone;
		if (this.driverEditForm.value.email)
			this.driverEdited.email = this.driverEditForm.value.email;
		if (this.driverEditForm.value.eldExemptionStatus)
			this.driverEdited.eldExemptionStatus = this.driverEditForm.value.eldExemptionStatus;
		if (this.driverEditForm.value.pictureFileName)
			this.driverEdited.pictureFileName = this.driverEditForm.value.pictureFileName;
		this.driverEdited.editedAt = new Date();
		this.driverEdited.editedBy = this.uid;
	}

	updateVedasUser() {
		this.http.get<VedasUser>(`${environment.apiUrl}/vedasUsers/${this.driver.id}`)
			.subscribe(vedasUser => {
				if (this.driverEditForm.value.firstName) 
					vedasUser.firstName = this.driverEditForm.value.firstName;
				if (this.driverEditForm.value.lastName) 
					vedasUser.lastName = this.driverEditForm.value.lastName;
				if (this.driverEditForm.value.phone)
					vedasUser.phone = this.driverEditForm.value.phone;
				if (this.driverEditForm.value.email)
					vedasUser.email = this.driverEditForm.value.email;
				const headers = new HttpHeaders()
		      		.set("Content-Type", "application/json");
		    	this.http.put<VedasUser>(`${environment.apiUrl}/vedasUsers/${this.driver.id}`, vedasUser, { headers })
		      		.subscribe(vedasUser => { });
			});
	}
	
}
