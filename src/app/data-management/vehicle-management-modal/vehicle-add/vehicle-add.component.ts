import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Vehicle } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-vehicle-add',
	templateUrl: './vehicle-add.component.html',
	styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {

	@Input() cid: string;
	vehicleAdded: Vehicle;
	vehicleAddForm: FormGroup; 
	allVehicles: Vehicle[];
	yearList: number[];
	uid: string;

	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
		this.vehicleAdded = {
			id: '',
			cid: this.cid,
			vin: '',
			powerUnitNumber: '',
			deviceId: null,
			make: '',
			model: '',
			year: null,
			milesAtMilClear: 0,
			trailerNumber: '',
			shippingDocNumber: [],
			createdAt: null,
			createdBy: null,
			editedAt: null,
			editedBy: null,
			active: true
		};
		this.vehicleAddForm = this.fb.group({
			id: ['', Validators.required],
			vin: ['', Validators.required],
			powerUnitNumber: ['', Validators.required],
			make: [''],
			model: [''],
			year: [],
			milesAtMilClear: ['', Validators.required],
			trailerNumber: ['']
   		});
   		const params = new HttpParams()
      		.set("cid", this.cid);
    	this.http.get<Vehicle[]>(`${environment.apiUrl}/vehicles`, { params })
      		.subscribe(
      			vehicles => {
      				this.allVehicles = vehicles;
      			}
      		);
   		this.yearList = [];
   		const currentYr = new Date().getFullYear();
		for (let yr of optionlists.yearList) 
			if (yr < currentYr + 2)
				this.yearList.push(yr);
		this.uid = localStorage.getItem('UserId');
	}

	addVehicle() {
		if (this.isVehicleIdUnique()) {
			this.patchVehicleAddFormData();
	    	const headers = new HttpHeaders()
	      		.set("Content-Type", "application/json");
	    	this.http.post<Vehicle>(`${environment.apiUrl}/vehicles`, this.vehicleAdded, { headers })
	      		.subscribe(vehicle => {});
	      	this.activeModal.close();
	      	setTimeout(() => {
	            this.router.navigateByUrl('/', { skipLocationChange: true })
		            .then(() => {
		                this.router.navigate(['/customer-home', this.cid, 'vehicle-management']);
		            });
        	}, 1000);
      	}
	}

	isVehicleIdUnique(): boolean {
		let duplicate = false;
		if (this.allVehicles) {
			for (let v of this.allVehicles) 
				if (v.id.slice(5) == this.vehicleAddForm.value.id) 
					duplicate = true;
		}
		if (duplicate) {
			window.alert("The provided id value has already been used. Please use another value for id.");  
			return false;    		
		} else {
			return true;
		}
	}

	patchVehicleAddFormData() {		
		this.vehicleAdded.id = this.cid + ":" + this.vehicleAddForm.value.id;
		this.vehicleAdded.vin = this.vehicleAddForm.value.vin;
		this.vehicleAdded.powerUnitNumber = this.vehicleAddForm.value.powerUnitNumber;
		this.vehicleAdded.make = this.vehicleAddForm.value.make;
		this.vehicleAdded.model = this.vehicleAddForm.value.model;
		this.vehicleAdded.year = this.vehicleAddForm.value.year;
		this.vehicleAdded.milesAtMilClear = this.vehicleAddForm.value.milesAtMilClear;
		this.vehicleAdded.trailerNumber = this.vehicleAddForm.value.trailerNumber;
		this.vehicleAdded.createdAt = new Date();
		this.vehicleAdded.createdBy = this.uid;
	}
  
}
