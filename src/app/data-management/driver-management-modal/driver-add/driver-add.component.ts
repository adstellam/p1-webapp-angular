import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VedasUser, Driver, DriverStatus } from '../../../interfaces';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-driver-add',
	templateUrl: './driver-add.component.html',
	styleUrls: ['./driver-add.component.css']
})
export class DriverAddComponent implements OnInit {

	@Input() cid: string;
	vedasUserAdded: VedasUser;
	vedasUserAddForm: FormGroup; 
	allVedasUsers: VedasUser[];
	uid: string;
	urole: string;

	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
		this.vedasUserAdded = {
			id: '',
			username: '',
			password: '',
			cid: this.cid,
			role: 'driver',
			lastName: '',
			firstName: '',
			phone: '',
			email: '',
			createdAt: null,
			createdBy: null,
			editedAt: null,
			editedBy: null,
			active: true
		};
		this.vedasUserAddForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			role: ['driver', Validators.required],
			lastName: ['', Validators.required],
			firstName: ['', Validators.required],
			phone: [''],
			email: ['']	
   		});
    	this.http.get<VedasUser[]>(`${environment.apiUrl}/vedasUsers`)
      		.subscribe(
      			vedasUsers => {
      				this.allVedasUsers = vedasUsers;
      			}
      		);
      	this.uid = localStorage.getItem('UserId');
      	this.urole = localStorage.getItem('UserRole');
	}

	addVedasUser() {
		if (this.isVedasUserIdUnique()) {
			this.assignVedasUserAddFormData();
	    	const headers = new HttpHeaders()
	      		.set("Content-Type", "application/json");
	    	/*
	    	this.http.post<VedasUser>(`${environment.apiUrl}/auth/register`, this.vedasUserAdded, { headers })
	      		.subscribe(vedasUser => { });
	    	*/
	    	//
	    	this.http.post<VedasUser>(`${environment.apiUrl}/vedasUsers`, this.vedasUserAdded, { headers })
	      		.subscribe(vedasUser => { });
	      	//
	      	this.addDriverAndDriverStatus();
	      	this.activeModal.close();
	      	setTimeout(() => {
	            this.router.navigateByUrl('/', { skipLocationChange: true })
		            .then(() => {
		                this.router.navigate(['/customer-home', this.cid, 'driver-management']);
		            });
        	}, 1000);
      	}
	}

	addDriverAndDriverStatus() {
		const driverAdded: Driver = {
			id: this.vedasUserAddForm.value.username,
			cid: this.cid,
			lastName: this.vedasUserAddForm.value.lastName,
			firstName: this.vedasUserAddForm.value.firstName,
			licenseNumber: '',
			licenseState: '',
			phone: this.vedasUserAddForm.value.phone,
			email: this.vedasUserAddForm.value.email,
			eldExemptionStatus: 'non-exempt',
			pictureFileName: '',
			createdAt: new Date(),
			createdBy: this.uid,
			editedAt: null,
			editedBy: '',
			active: true
		};
		const driverStatusAdded: DriverStatus = {
   			id: this.vedasUserAddForm.value.username,
   			signedIn: false,
   			signedInAsCodriver: false,
   			dutyStatus: '1',
   			intentIndication: '3'
   		};	
		const headers = new HttpHeaders()
	      	.set("Content-Type", "application/json");
	    this.http.post<Driver>(`${environment.apiUrl}/drivers`, driverAdded, { headers })
	      	.subscribe(driver => { });
	    this.http.post<DriverStatus>(`${environment.apiUrl}/driverStatuses`, driverStatusAdded, { headers })
	      	.subscribe(driverStatus => { });
	}

	isVedasUserIdUnique(): boolean {
		let duplicate = false;
		if (this.allVedasUsers) {
			for (let u of this.allVedasUsers) 
				if (u.username == this.vedasUserAddForm.value.username) 
					duplicate = true;
		} 
		if (duplicate) {
			window.alert("The provided username has already been used. Please use another one.");  
			return false;    		
		} else {
			return true;
		}
	}

	assignVedasUserAddFormData() {		
		this.vedasUserAdded.id = this.vedasUserAddForm.value.username;
		this.vedasUserAdded.username = this.vedasUserAddForm.value.username;
		this.vedasUserAdded.password = this.vedasUserAddForm.value.password;
		this.vedasUserAdded.lastName = this.vedasUserAddForm.value.lastName;
		this.vedasUserAdded.firstName = this.vedasUserAddForm.value.firstName;
		this.vedasUserAdded.phone = this.vedasUserAddForm.value.phone;
		this.vedasUserAdded.email = this.vedasUserAddForm.value.email;
		this.vedasUserAdded.createdAt = new Date();
		this.vedasUserAdded.createdBy = this.uid;
	}
  
}
