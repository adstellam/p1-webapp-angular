import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Device, Vehicle, Driver, DeviceSeqNumber } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-device-add',
	templateUrl: './device-add.component.html',
	styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {

	@Input() cid: string;
	@Input() deviceMap: Map<string, Device>;
	@Input() vehicleMap: Map<string, Vehicle>;
	deviceAdded: Device;
	deviceAddForm: FormGroup; 
	peripheralFormArray: FormArray;
	allDevices: Device[];
	hardwareVersionList: string[];
	softwareVersionList: string[];
	optionalPeripheralList: string[];
	nspList: string[];
	uid: string;

	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
		this.deviceAdded = {
			id: '',
			hardwareVersion: '',
			softwareVersion: '',
			optionalPeripheral: [],
			ipAddress: '',
			ipAddressType: '',
			nsp: '',
			cid: this.cid,
			vehicleId: null,
			driverId: null,
			codriverId: null,
			createdAt: null,
			createdBy: null,
			editedAt: null,
			editedBy: null,
			active: true
		};
		this.deviceAddForm = this.fb.group({
			id: ['', Validators.required],
			hardwareVersion: ['', Validators.required],
			softwareVersion: ['', Validators.required],
			optionalPeripheral: this.fb.array([]),
			ipAddress: ['', Validators.required],
			ipAddressType: ['', Validators.required],
			nsp: ['', Validators.required]
   		});
   		this.peripheralFormArray = (this.deviceAddForm.controls.optionalPeripheral as FormArray);
		this.http.get<Device[]>(`${environment.apiUrl}/devices`)
			.subscribe(
				allDevices => { 
					this.allDevices = allDevices;
			   	}
			);
		this.hardwareVersionList = optionlists.hardwareVersionList;
		this.softwareVersionList = optionlists.softwareVersionList;
		this.optionalPeripheralList = optionlists.optionalPeripheralList;
		this.nspList = optionlists.netServiceProviderList;
		this.uid = localStorage.getItem('UserId');
	}

	setPeripheralFormArray(peripheral: string, isChecked: boolean) {
		if (isChecked) {
			this.peripheralFormArray.push(new FormControl(peripheral));
		} else {
			const idx = this.peripheralFormArray.controls.findIndex(x => x.value === peripheral);
			this.peripheralFormArray.removeAt(idx);
		}
	}

	addDevice() {
		if (this.isDeviceIdUnique()) {
			this.assignDeviceAddFormData();
	    	const headers = new HttpHeaders()
	      		.set("Content-Type", "application/json");
	    	this.http.post<Device>(`${environment.apiUrl}/devices`, this.deviceAdded, { headers })
	      		.subscribe(device => {
	      			this.http.post<DeviceSeqNumber>(`${environment.apiUrl}/deviceSeqNumbers`, { id: device.id, seqNumber: 0 }, { headers })
	      				.subscribe(deviceSeqNumber => {});
	      		});
	      	this.activeModal.close();
	      	setTimeout(() => {
	            this.router.navigateByUrl('/', { skipLocationChange: true })
		            .then(() => {
		                this.router.navigate(['/customer-home', this.cid, 'device-management']);
		            });
        	}, 1000);
		}
	}

	isDeviceIdUnique(): boolean {
		let duplicate = false;
		if (this.allDevices) {
			for (let d of this.allDevices) 
				if (d.id == this.deviceAddForm.value.id) 
					duplicate = true;
		}
		if (duplicate) {
			window.alert("The provided id value has already been used. Please use another value for id.");  
			return false;    		
		} 
		return true;
	}

	assignDeviceAddFormData() {
		this.deviceAdded.id = this.deviceAddForm.value.id;
		this.deviceAdded.hardwareVersion = this.deviceAddForm.value.hardwareVersion;
		this.deviceAdded.softwareVersion = this.deviceAddForm.value.softwareVersion;
		for (let x of this.peripheralFormArray.controls) 
			this.deviceAdded.optionalPeripheral.push(x.value);
		this.deviceAdded.ipAddress = this.deviceAddForm.value.ipAddress;
		this.deviceAdded.ipAddressType = this.deviceAddForm.value.ipAddressType;
		this.deviceAdded.nsp = this.deviceAddForm.value.nsp;
		this.deviceAdded.createdAt = new Date();;
		this.deviceAdded.createdBy = this.uid;
	}

}
