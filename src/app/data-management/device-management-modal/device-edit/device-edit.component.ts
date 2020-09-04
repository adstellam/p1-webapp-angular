import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Device, Vehicle, Driver } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-device-edit',
	templateUrl: './device-edit.component.html',
	styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {

	@Input() device: Device;
	@Input() deviceMap: Map<string, Device>;
	@Input() vehicleMap: Map<string, Vehicle>;
	deviceEdited: Device;
	deviceEditForm: FormGroup;
	peripheralFormArray: FormArray; 
	hardwareVersionList: string[];
	softwareVersionList: string[];
	optionalPeripheralList: string[];
	nspList: string[];
	uid: string;
	
	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
		this.deviceEdited = Object.assign({}, this.device);
		this.deviceEditForm = this.fb.group({
			vehicleId: [''],
			hardwareVersion: [''],
			softwareVersion: [''],
			optionalPeripheral: this.fb.array([]),
			ipAddress: [''],
			ipAddressType: [''],
			nsp: ['']
   		});
   		this.peripheralFormArray = (this.deviceEditForm.controls.optionalPeripheral as FormArray);
		for (let p of this.deviceEdited.optionalPeripheral)
			this.peripheralFormArray.push(new FormControl(p));
		this.hardwareVersionList = optionlists.hardwareVersionList;
		this.softwareVersionList = optionlists.softwareVersionList;
		this.optionalPeripheralList = optionlists.optionalPeripheralList;
		this.nspList = optionlists.netServiceProviderList;
		this.uid = localStorage.getItem('UserId');
	}

	setCheckboxFormControls(peripheral: string, isChecked: boolean) {
		if (isChecked) {
			this.peripheralFormArray.push(new FormControl(peripheral));
		} else {
			const idx = this.peripheralFormArray.controls.findIndex(x => x.value == peripheral);
			this.peripheralFormArray.removeAt(idx);
		}
	}

	editDevice() {
		this.assignDeviceEditFormData();
    	const headers = new HttpHeaders()
      		.set("Content-Type", "application/json");
    	this.http.put<Device>(`${environment.apiUrl}/devices/${this.device.id}`, this.deviceEdited, { headers })
      		.subscribe(device => { });
      	this.activeModal.close();
      	setTimeout(() => {
      		this.router.navigateByUrl('/', { skipLocationChange: true })
	            .then(() => {
	                this.router.navigate(['/customer-home', this.device.cid, 'device-management']);
	            });
	        }, 1000);
	}

	assignDeviceEditFormData() {
		if (this.deviceEditForm.value.hardwareVersion) {
			this.deviceEdited.hardwareVersion = this.deviceEditForm.value.hardwareVersion;
		}
		if (this.deviceEditForm.value.softwareVersion) {
			this.deviceEdited.softwareVersion = this.deviceEditForm.value.softwareVersion;
		}
		this.deviceEdited.optionalPeripheral = [];
		for (let x of this.peripheralFormArray.controls) {
			this.deviceEdited.optionalPeripheral.push(x.value);
		}
		if (this.deviceEditForm.value.ipAddress) {
			this.deviceEdited.ipAddress = this.deviceEditForm.value.ipAddress;
		}
		if (this.deviceEditForm.value.ipAddressType) {
			this.deviceEdited.ipAddressType = this.deviceEditForm.value.ipAddressType;
		}
		if (this.deviceEditForm.value.netServiceProvider) {
			this.deviceEdited.nsp = this.deviceEditForm.value.nsp;
		}
		this.deviceEdited.editedAt = new Date();
		this.deviceEdited.editedBy = this.uid;
	}

	/*
	changeVehicleProperty() {
		this.vehicleAssigned = null;
		this.vehicleReleased = null;
	 	this.deviceAffected = null;
	 	if (this.deviceEditForm.value.vehicleId !== "none") {
	 		this.vehicleAssigned = this.vehicleMap.get(this.deviceEditForm.value.vehicleId);
	 		this.vehicleReleased = this.vehicleMap.get(this.device.vehicleId);
	 		for (let deviceId of this.deviceMap.keys())
	 			if (this.deviceMap.get(deviceId).vehicleId == this.deviceEditForm.value.vehicleId)
	 				this.deviceAffected = this.deviceMap.get(deviceId);
	 	}
		if (this.vehicleAssigned) {
			if (!this.vehicleAssigned.hasVedas) {
				this.vehicleAssigned.hasVedas = true;
				this.vehicleAssigned.editedAt = new Date();
				this.vehicleAssigned.editedBy = this.uid + "|auto";
				const headers = new HttpHeaders()
					.set("Content-Type", "application/json");
				this.http.put<Vehicle>(`${environment.apiUrl}/vehicles/${this.vehicleAssigned.id}`, this.vehicleAssigned, { headers })
					.subscribe(vehicle => {
						window.alert(`This VeDAS device ${this.deviceEdited.id} is installed at vehicle ${vehicle.id}.`);
					});
			} else {
				this.deviceAffected.vehicleId = null;
				this.deviceAffected.editedAt = new Date();
				this.deviceAffected.editedBy = this.uid + "|auto";
				const headers = new HttpHeaders()
					.set("Content-Type", "application/json");
				this.http.put<Device>(`${environment.apiUrl}/devices/${this.deviceAffected.id}`, this.deviceAffected, { headers })
					.subscribe(device => {
						window.alert(`This VeDAS device ${this.deviceEdited.id} is installed at vehicle ${this.vehicleAssigned.id}, substituting the vehicle's previous VeDAS device ${this.deviceAffected.id}.`);
					});
			}
			
		}
		if (this.vehicleReleased) {
			this.vehicleReleased.hasVedas = false;
			this.vehicleReleased.editedAt = new Date();
			this.vehicleReleased.editedBy = this.uid + "|auto";
			const headers = new HttpHeaders()
					.set("Content-Type", "application/json");
			this.http.put<Vehicle>(`${environment.apiUrl}/vehicles/${this.vehicleReleased.id}`, this.vehicleReleased, { headers })
				.subscribe(vehicle => {
					window.alert(`Note that the vehicle ${this.vehicleReleased.id} is no longer VeDAS-enabled.`);
				});
		}
	*/

}
