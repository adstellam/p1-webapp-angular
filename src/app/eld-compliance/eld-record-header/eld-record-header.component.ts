import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Customer, Device, Vehicle, Driver, EldEvent } from '../../interfaces';
import { environment } from '../../../environments/environment';

interface HeaderData {
	vehicleId: string;
    codriverId: string;
	loc: string; 
	vmstart: number;
	vmend: number;
	ehstart: number;
	ehend: number;
}

@Component({
	selector: 'app-eld-record-header',
	templateUrl: './eld-record-header.component.html',
	styleUrls: ['./eld-record-header.component.css']
})
export class EldRecordHeaderComponent implements OnInit {

	@Input() driverId: string;
	@Input() cid: string;
	@Input() eldRecordDate: string;
	@Input() eldEventSeqMap: Map<string, EldEvent[]>;
	@Output() showOtherEldRecordPartClicked: EventEmitter<string> = new EventEmitter<string>();

	customer: Customer;
	driverMap: Map<string, Driver>;
	vehicleMap: Map<string, Vehicle>;
	headerDataMap: Map<string, HeaderData> = new Map<string, HeaderData>();
	eldRecordPrintDisplayDate: string;
	headerComment: string;
	
	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.http.get<Customer>(`${environment.apiUrl}/customers/${this.cid}`)
			.subscribe(customer => {
				this.customer = customer;
			});

		const _driverMap: Map<string, Driver> = new Map<string, Driver>();
		const _vehicleMap: Map<string, Vehicle> = new Map<string, Vehicle>();
		const params: HttpParams = new HttpParams()
			.set('cid', this.cid)
			.set('active', 'true');
		this.http.get<Driver[]>(`${environment.apiUrl}/drivers`, { params }) 
			.subscribe(drivers => {
				for (let d of drivers)
					_driverMap.set(d.id, d);
				this.driverMap = new Map<string, Driver>(_driverMap);
			});
		this.http.get<Vehicle[]>(`${environment.apiUrl}/vehicles`, { params }) 
			.subscribe(vehicles => {
				for (let v of vehicles)
					_vehicleMap.set(v.id, v);
				this.vehicleMap = new Map<string, Vehicle>(_vehicleMap);
			});
		for (let deviceId of this.eldEventSeqMap.keys()) {
			let eldEventFirstOfDay: EldEvent = this.eldEventSeqMap.get(deviceId)[0];
			let eldEventLastOfDay: EldEvent = this.eldEventSeqMap.get(deviceId)[this.eldEventSeqMap.get(deviceId).length-1];
			this.http.get<Device>(`${environment.apiUrl}/devices/${deviceId}`)
				.subscribe(device => {
            		this.headerDataMap.set(deviceId, { 
            			vehicleId: device.vehicleId,
            			codriverId: device.codriverId,
	            		loc: eldEventLastOfDay.location, 
	            		vmstart: eldEventFirstOfDay.vehicleMiles,
	            		vmend: eldEventLastOfDay.vehicleMiles, 
	            		ehstart: eldEventFirstOfDay.engineHours, 
	            		ehend: eldEventLastOfDay.engineHours 
	            	});
			    });
		}
		let t: number = new Date().getTime();
		let tadj: number = Number(localStorage.getItem('Tzo'))*3600*1000;
		this.eldRecordPrintDisplayDate = new Date(t - tadj).toISOString().substring(0, 10);
		this.headerComment = "";
	}

	switchTo(part: string) {
		this.showOtherEldRecordPartClicked.emit(part);
	}

}
