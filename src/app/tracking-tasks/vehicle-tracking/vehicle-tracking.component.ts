import { Component, Input, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { MapComponent } from '../../vedas-monitor/map/map.component';
import { Device, Vehicle, Driver } from '../../interfaces';
import { optionlists } from '../../optionlists';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-vehicle-tracking',
	templateUrl: './vehicle-tracking.component.html',
	styleUrls: ['./vehicle-tracking.component.css']
})
export class VehicleTrackingComponent implements OnInit, AfterViewChecked {

	@ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
	cid: string;
	devices: Device[];
	vehicles: Vehicle[];
	drivers: Driver[];
	deviceId: string;
	vehicleId: string;
	driverId: string;
	vehicleDesc: string;
	driverName: string;
	powerUnitNumber: string;
	trailerNumber: string;
	shippingDocNumber: string[];
	vehicleIdFormControl: FormControl;
	speed: number;
	location: string;
	pathDuration: number;
	pathDurationFormControl: FormControl;
	hourList: number[];

	constructor(private route: ActivatedRoute, private http: HttpClient) { }

	ngOnInit() {
		this.cid = this.route.snapshot.parent.paramMap.get('cid');
        const params = new HttpParams()
        	.set('cid', this.cid)
        	.set('active', 'true');
        this.http.get<Device[]>(`${environment.apiUrl}/devices`, { params })
        	.subscribe(devices => {
        		this.devices = devices;
        	});
        this.http.get<Vehicle[]>(`${environment.apiUrl}/vehicles`, { params })
        	.subscribe(vehicles => {
        		this.vehicles = vehicles;
        	});
        this.http.get<Driver[]>(`${environment.apiUrl}/drivers`, { params })
        	.subscribe(drivers => {
        		this.drivers = drivers;
        	});
        this.deviceId = null;
        this.vehicleDesc = null;
        this.driverName = null;
        this.powerUnitNumber = null;
        this.trailerNumber = null;
        this.shippingDocNumber = [];
        this.vehicleIdFormControl = new FormControl('');
        this.speed = null;
        this.location = null;
        this.pathDuration = 0;
        this.pathDurationFormControl = new FormControl('');
        this.hourList = optionlists.hourList;
	}

	ngAfterViewChecked() {
		this.speed = this.mapComponent.speed;
		this.location = this.mapComponent.location;
	}

	getInfo() {
		this.vehicleId = this.vehicleIdFormControl.value;
		for (let d of this.devices) {
			if (d.vehicleId == this.vehicleId) {
				this.deviceId = d.id;
				this.driverId = d.driverId;
			}
		}
		for (let v of this.vehicles) {
			if (v.id == this.vehicleId) {
				this.vehicleDesc = v.make + " " + v.model + "-" + v.year;
				this.powerUnitNumber = v.powerUnitNumber;
				this.trailerNumber = v.trailerNumber;
				this.shippingDocNumber = v.shippingDocNumber;
			}
		}
		for (let e of this.drivers) {
			if (e.id == this.driverId)
				this.driverName = e.firstName + " " + e.lastName;
		}
	}

	getPath() {
		this.pathDuration = this.pathDurationFormControl.value;
	}

}

