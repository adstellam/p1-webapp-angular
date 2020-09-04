import { Component, Input, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { MapComponent } from '../../vedas-monitor/map/map.component';
import { Device, Vehicle, Driver, Asset } from '../../interfaces';
import { optionlists } from '../../optionlists';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-asset-tracking',
	templateUrl: './asset-tracking.component.html',
	styleUrls: ['./asset-tracking.component.css']
})
export class AssetTrackingComponent implements OnInit, AfterViewChecked {

	@ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
	cid: string;
	devices: Device[];
	vehicles: Vehicle[];
	drivers: Driver[];
	assets: Asset[];
	deviceId: string;
	vehicleId: string;
	driverId: string;
	assetId: string;
	vehicleDesc: string;
	driverName: string;
	assetDesc: string;
	assetIdFormControl: FormControl;
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
        this.http.get<Asset[]>(`${environment.apiUrl}/assets`, { params })
        	.subscribe(assets => {
        		this.assets = assets;
        	});	
        this.assetId = null;
        this.deviceId = null;
        this.assetDesc = null;
        this.vehicleDesc = null;
        this.driverName = null;
        this.assetIdFormControl = new FormControl('');
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
		this.assetId = this.assetIdFormControl.value;
		for (let v of this.vehicles) {
			if (v.shippingDocNumber && v.shippingDocNumber.includes(this.assetId)) {
				this.vehicleId = v.id;
				this.vehicleDesc = v.make + " " + v.model + "-" + v.year;
			}
		}
		if (!this.vehicleId) {
			window.alert("This asset has not been assigned to any vehicle, and hence cannot be tracked.");
			return;
		}
		for (let d of this.devices) {
			if (d.vehicleId == this.vehicleId) {
				this.driverId = d.driverId;
			}
		}
		for (let e of this.drivers) {
			if (e.id == this.driverId)
				this.driverName = e.firstName + " " + e.lastName;
		}
		for (let a of this.assets) {
			if (a.id == this.assetId) {
				this.assetDesc = a.type + " for " + a.shipper + " destined to " + a.destination;
			}
		}
	}

	getPath() {
		this.pathDuration = this.pathDurationFormControl.value;
    }

}


