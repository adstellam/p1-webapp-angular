import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'

import { VehicleSelectVedasComponent } from '../admin-tasks-modal/vehicle-select-vedas/vehicle-select-vedas.component';

import { Device, Vehicle } from '../../interfaces';
import { optionlists } from '../../optionlists';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-vedas-setup',
	templateUrl: './vedas-setup.component.html',
	styleUrls: ['./vedas-setup.component.css']
})
export class VedasSetupComponent implements OnInit {

	cid: string;
	deviceSelectionForm: FormGroup;
	deviceFilterForm: FormGroup;
	deviceSelected: Device;
	devicesFiltered: Device[];
	hardwareVersionList: string[];
	vehicleMap: Map<string, Vehicle>;
	
	constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, public modalService: NgbModal) { }

	ngOnInit() {
		this.cid = this.route.snapshot.parent.paramMap.get('cid');
		this.deviceSelectionForm = this.fb.group({
			id: ['', Validators.required]
		});
		this.deviceFilterForm = this.fb.group({
			checkbox: [],
			hardwareVersion: ['']
		});
		this.hardwareVersionList = optionlists.hardwareVersionList;
		const _vehicleMap: Map<string, Vehicle> = new Map<string, Vehicle>();
		const params = new HttpParams()
			.set('cid', this.cid)
			.set('active', 'true');
		this.http.get<Vehicle[]>(`${environment.apiUrl}/vehicles`, { params })
			.subscribe(vehicles => {
				for (let v of vehicles)
					_vehicleMap.set(v.id, v);
				this.vehicleMap = new Map<string, Vehicle>(_vehicleMap);
			});
	}

	setCheckboxFormControl(isChecked: boolean) {
		if (isChecked) 
			this.deviceFilterForm.controls.checkbox.setValue(true);
		else
			this.deviceFilterForm.controls.checkbox.setValue(false);
	}

	onDeviceSelectionFormSubmitted() {
		this.devicesFiltered = null;
		this.http.get<Device>(`${environment.apiUrl}/devices/${this.deviceSelectionForm.value.id}`)
			.subscribe(device => {
				this.deviceSelected = device;	
			});
	}

	onDeviceFilterFormSubmitted() {
		this.deviceSelected = null;
		let params = new HttpParams();
		params = params.append('cid', this.cid)
		params = params.append('active', 'true');
		if (this.deviceFilterForm.value.checkbox)
			params = params.append('vehicleId', 'null');
		if (this.deviceFilterForm.value.hardwareVersion)
			params = params.append('hardwareVersion', this.deviceFilterForm.value.hardwareVersion);
		this.http.get<Device[]>(`${environment.apiUrl}/devices`, { params })
			.subscribe(devices => {
				this.devicesFiltered = devices;
			});
	}

	onDeviceTransferred(deviceId: string, fromVehicleId: string) {
		const modalRef: NgbModalRef = this.modalService.open(VehicleSelectVedasComponent, { centered: true, backdrop: 'static', keyboard: false });
		modalRef.componentInstance.vehicleMap = this.vehicleMap;
		modalRef.componentInstance.vehicleSelected 
			.subscribe(toVehicleId => {
				this.handleDeviceTransfer(deviceId, fromVehicleId, toVehicleId);
			});
	}

	handleDeviceTransfer(deviceId: string, fromVehicleId: string, toVehicleId: string) {
		const headers: HttpHeaders = new HttpHeaders()
			.set('Content-Type', 'application/json');
		if (this.vehicleMap.get(toVehicleId).deviceId)
			this.http.patch<Device>(`${environment.apiUrl}/devices/${this.vehicleMap.get(toVehicleId).deviceId}`, { vehicleId: null }, { headers })
				.subscribe(vehicle => { });
		this.http.patch<Device>(`${environment.apiUrl}/devices/${deviceId}`, { vehicleId: toVehicleId }, { headers })
			.subscribe(device => { });
		this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${toVehicleId}`, { deviceId: deviceId }, { headers })
			.subscribe(vehicle => { });
		this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${fromVehicleId}`, { deviceId: null }, { headers })
			.subscribe(vehicle => { });
		setTimeout(() => {
	            this.router.navigateByUrl('/', { skipLocationChange: true })
		            .then(() => {
		                this.router.navigate(['/customer-home', this.cid, 'vedas-setup']);
		            });
        	}, 1000);
	}

	onDeviceInstalled(deviceId: string) {
		const modalRef: NgbModalRef = this.modalService.open(VehicleSelectVedasComponent, { centered: true, backdrop: 'static', keyboard: false });
		modalRef.componentInstance.vehicleMap = this.vehicleMap;
		modalRef.componentInstance.vehicleSelected 
			.subscribe(toVehicleId => {
				this.handleDeviceInstall(deviceId, toVehicleId);
			});
	}

	handleDeviceInstall(deviceId: string, toVehicleId: string) {
		const headers: HttpHeaders = new HttpHeaders()
			.set('Content-Type', 'application/json');
		if (this.vehicleMap.get(toVehicleId).deviceId)
			this.http.patch<Device>(`${environment.apiUrl}/devices/${this.vehicleMap.get(toVehicleId).deviceId}`, { vehicleId: null }, { headers })
				.subscribe(vehicle => { });
		this.http.patch<Device>(`${environment.apiUrl}/devices/${deviceId}`, { vehicleId: toVehicleId }, { headers })
			.subscribe(device => { });
		this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${toVehicleId}`, { deviceId: deviceId }, { headers })
			.subscribe(vehicle => { });
		setTimeout(() => {
	            this.router.navigateByUrl('/', { skipLocationChange: true })
		            .then(() => {
		                this.router.navigate(['/customer-home', this.cid, 'vedas-setup']);
		            });
        	}, 1000);
	}

	onDeviceRemoved(deviceId: string, fromVehicleId: string) {
		const headers: HttpHeaders = new HttpHeaders()
			.set('Content-Type', 'application/json');
		this.http.patch<Device>(`${environment.apiUrl}/devices/${deviceId}`, { vehicleId: null }, { headers })
			.subscribe(device => { });
		this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${fromVehicleId}`, { deviceId: null }, { headers })
			.subscribe(vehicle => { });
		setTimeout(() => {
	            this.router.navigateByUrl('/', { skipLocationChange: true })
		            .then(() => {
		                this.router.navigate(['/customer-home', this.cid, 'vedas-setup']);
		            });
        	}, 1000);
	}

}
