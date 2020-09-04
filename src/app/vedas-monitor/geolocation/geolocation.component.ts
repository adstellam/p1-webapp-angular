import { Component, Input, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { MapComponent } from '../map/map.component';
import { Device, LatLng } from '../../interfaces';
import { optionlists } from '../../optionlists';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-geolocation',
	templateUrl: './geolocation.component.html',
	styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit, AfterViewChecked {

	@ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
	cid: string;
	deviceId: string;
	device: Device;
	vehicleDesc: string;
	driverName: string;
	speed: number;
	location: string;
	pathDuration: number;
	pathDurationFormControl: FormControl;
	hourList: number[];

	constructor(private route: ActivatedRoute, private http: HttpClient) { }

	ngOnInit() {
		this.cid = this.route.snapshot.parent.paramMap.get('cid');
		this.deviceId = this.route.snapshot.paramMap.get('did');
        this.vehicleDesc = this.route.snapshot.paramMap.get('vehicleDesc');
        this.driverName = this.route.snapshot.paramMap.get('driverName');
        this.speed = 0;
        this.location = "";
        this.pathDuration = 1;
        this.pathDurationFormControl = new FormControl('');
        this.hourList = optionlists.hourList;
        this.http.get<Device>(`${environment.apiUrl}/devices/${this.deviceId}`)
        	.subscribe(device => {
        		this.device = device;
        	});
	}

	ngAfterViewChecked() {
		this.speed = this.mapComponent.speed;
		this.location = this.mapComponent.location;
	}

	getPath() {
		this.pathDuration = this.pathDurationFormControl.value;
	}

}
