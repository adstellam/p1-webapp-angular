import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Vehicle } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-vehicle-edit',
	templateUrl: './vehicle-edit.component.html',
	styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

	@Input() vehicle: Vehicle;
	vehicleEdited: Vehicle;
	vehicleEditForm: FormGroup; 
	yearList: number[];
	uid: string;

	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
		this.vehicleEdited = Object.assign({}, this.vehicle);
		this.vehicleEditForm = this.fb.group({
			vin: [''],
			powerUnitNumber: [''],
			make: [''],
			model: [''],
			year: [''],
			milesAtMilClear: [''],
			trailerNumber: ['']
   		});
   		this.yearList = [];
   		const currentYr = new Date().getFullYear();
		for (let yr of optionlists.yearList) 
			if (yr < currentYr + 2)
				this.yearList.push(yr);
		this.uid = localStorage.getItem('UserId');
	}

	editVehicle() {
		this.patchVehicleEditFormData()
		const headers = new HttpHeaders()
      		.set("Content-Type", "application/json");
    	this.http.put<Vehicle>(`${environment.apiUrl}/vehicles/${this.vehicle.id}`, this.vehicleEdited, { headers })
      		.subscribe(
      			val => { 
          			console.log("Vehicle edited successfully: ", val);
        		},
        		err => {
          			console.log("Failed to edit vehicle: ", err);
        		}
      		);
      	this.activeModal.close();
      	setTimeout(() => {
      		this.router.navigateByUrl('/', { skipLocationChange: true })
	            .then(() => {
	                this.router.navigate(['/customer-home', this.vehicle.cid, 'vehicle-management']);
	            });
	      	}, 1000);
	}

	patchVehicleEditFormData() {
		if (this.vehicleEditForm.value.vin) 
			this.vehicleEdited.vin = this.vehicleEditForm.value.vin;
		if (this.vehicleEditForm.value.powerUnitNumber)
			this.vehicleEdited.powerUnitNumber = this.vehicleEditForm.value.powerUnitNumber;
		if (this.vehicleEditForm.value.make) 
			this.vehicleEdited.make = this.vehicleEditForm.value.make;
		if (this.vehicleEditForm.value.model) 
			this.vehicleEdited.model = this.vehicleEditForm.value.model;
		if (this.vehicleEditForm.value.year)
			this.vehicleEdited.year = this.vehicleEditForm.value.year;
		if (this.vehicleEditForm.value.milesAtMilClear)
			this.vehicleEdited.milesAtMilClear = this.vehicleEditForm.value.milesAtMilClear;
		if (this.vehicleEditForm.value.trailerNumber)
			this.vehicleEdited.trailerNumber = this.vehicleEditForm.value.trailerNumber;
		this.vehicleEdited.editedAt = new Date();
		this.vehicleEdited.editedBy = this.uid;
	}

}
