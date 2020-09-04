import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EldRecordHeaderComponent } from '../eld-record-header/eld-record-header.component';
import { EldRecordRodsComponent } from '../eld-record-rods/eld-record-rods.component';
import { EldRecordSupplementComponent } from '../eld-record-supplement/eld-record-supplement.component';
import { EldRecordModifyComponent } from '../eld-record-modify/eld-record-modify.component';
import { Customer, VedasUser, Driver, EldDateObj, EldRecord, EldEvent, EldEventPair } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-eld-record-management',
	templateUrl: './eld-record-management.component.html',
	styleUrls: ['./eld-record-management.component.css']
})
export class EldRecordManagementComponent implements OnInit {

	cid: string;
	driverId: string;
	driverMap: Map<string, Driver>;
	eldRecordSelectionForm: FormGroup;
	eldRecordDate: string;
	eldRecordVersion: number;
	eldRecordPart: string;
	eldRecordCertifiedAt: Date;
	eldRecordCertifiedCount: number = 0;
	eldRecordId: number = 0;
	eldDateObjList: EldDateObj[] = [];
	eldEventSeqMap: Map<string, EldEvent[]>;
	uid: string;
	isDriver: boolean = false;
	
	constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, public modalService: NgbModal) { }

	ngOnInit() {
		this.cid = this.route.snapshot.parent.paramMap.get('cid');
		this.http.get<Customer>(`${environment.apiUrl}/customers/${this.cid}`)
			.subscribe(customer => {
				localStorage.setItem('Tzo', this.getTimezoneOffset(customer.timezone).toString());
				localStorage.setItem('Edo', customer.eldDayStart.toString());
			})
		for (let i = 0; i < 8; i++) {
			this.eldDateObjList.push(this.convertUtcTimeToEldDateObj(new Date().getTime() - i*24*3600*1000))
		}
		this.eldRecordSelectionForm = this.fb.group({
			driverId: ['', Validators.required],
			eldRecordDate: ['', Validators.required],
		});
		const _driverMap: Map<string, Driver> = new Map<string, Driver>();
		const params = new HttpParams()
			.set('cid', this.cid)
			.set('active', 'true');
		this.http.get<Driver[]>(`${environment.apiUrl}/drivers`, { params })
			.subscribe(drivers => {
				for (let d of drivers)
					_driverMap.set(d.id, d);
				this.driverMap = new Map(_driverMap);
			});
		this.uid = localStorage.getItem('Usr');
		/*
		this.uid = localStorage.getItem('Jwt');
		*/
		this.http.get<VedasUser>(`${environment.apiUrl}/vedasUsers/${this.uid}`)
			.subscribe(user => {
				if (user.role == "driver")
					this.isDriver = true;
			});
	}

	onEldRecordSelectionFormSubmitted() {
		this.driverId = this.eldRecordSelectionForm.value.driverId;
		this.eldRecordDate = this.eldRecordSelectionForm.value.eldRecordDate;
		this.eldRecordPart = "rods";	
		const params = new HttpParams()
			.set('driverId', this.driverId)
			.set('dateStr', this.eldRecordDate);
		this.http.get<EldRecord[]>(`${environment.apiUrl}/eldRecords`, { params })
			.subscribe(eldRecords => {
				if (eldRecords.length && this.eldRecordDate !== this.eldDateObjList[0].dateStr) {
					let eldRecordCurrent: EldRecord;
					let highestVersion: number = -1;
					for (let r of eldRecords)
						if (r.version > highestVersion) {
							highestVersion = r.version;
							eldRecordCurrent = r;
						}
					this.retrieveEldEventSeqMap(eldRecordCurrent);
					this.eldRecordVersion = eldRecordCurrent.version;
					this.eldRecordCertifiedAt = eldRecordCurrent.certifiedAt;
					return;
				} 
				if (eldRecords.length && this.eldRecordDate == this.eldDateObjList[0].dateStr) {
					let eldRecordCurrent: EldRecord;
					let highestVersion: number = -1;
					for (let r of eldRecords)
						if (r.version > highestVersion) {
							highestVersion = r.version;
							eldRecordCurrent = r;
						}
					this.createEldEventSeqMap(this.driverId, this.eldRecordDate);
					this.eldRecordVersion = eldRecordCurrent.version;
					this.eldRecordCertifiedAt = null;
					return;
				}
				this.createEldEventSeqMap(this.driverId, this.eldRecordDate);
				this.eldRecordVersion = 1;
				this.eldRecordCertifiedAt = null;
			});
	}

	retrieveEldEventSeqMap(eldRecord: EldRecord) {
		let deviceIdSeq: string[] = [];
		let deviceIdDistinctSeq: string[];
		const _eldEventSeqMap: Map<string, EldEvent[]> = new Map<string, EldEvent[]>();
		const eventSeq = JSON.parse(eldRecord.eldEventSeqStr);
		if (eventSeq) {
			eventSeq.forEach(event => { deviceIdSeq.push(event.deviceId); })
			deviceIdDistinctSeq = Array.from(new Set(deviceIdSeq));
			for (let deviceId of deviceIdDistinctSeq) 
				_eldEventSeqMap.set(deviceId, []);
			eventSeq.forEach(event => { _eldEventSeqMap.get(event.deviceId).push(event)});
			this.eldEventSeqMap = new Map(_eldEventSeqMap);
		}
	}

	createEldEventSeqMap(driverId: string, eldRecordDate: string) {
		let deviceIdSeq: string[] = [];
		let deviceIdDistinctSeq: string[];
		const _eldEventSeqMap: Map<string, EldEvent[]> = new Map<string, EldEvent[]>();
		const params = new HttpParams()
			.set('driverId', driverId)
			.set('dateStr', eldRecordDate)
			.set('status', '1');
		this.http.get<EldEvent[]>(`${environment.apiUrl}/eldEvents`, { params })
			.pipe(
				tap(eventSeq => {
					eventSeq.forEach(event => { deviceIdSeq.push(event.deviceId); })
					deviceIdDistinctSeq = Array.from(new Set(deviceIdSeq));
					for (let deviceId of deviceIdDistinctSeq) 
						_eldEventSeqMap.set(deviceId, []);
				})
			)
			.subscribe(eventSeq => {
				eventSeq.forEach(event => { _eldEventSeqMap.get(event.deviceId).push(event); });
				this.eldEventSeqMap = new Map(_eldEventSeqMap);
				this.postEldRecordVersion(1);
			});	
	}

	modifyEldRecord() {
		this.eldRecordPart = 'modification';
	}
	
	onModificationCommitted(preAndPostModEventPairs: EldEventPair[]) {	
		const headers: HttpHeaders = new HttpHeaders()
			.set("Content-Type", "application/json");
		preAndPostModEventPairs.forEach(eventPair => {
			eventPair.post.id = new Date().getTime();
			this.http.post<EldEvent>(`${environment.apiUrl}/eldEvents`, eventPair.post, { headers })
				.subscribe(null);
			eventPair.pre.status = "3";	
			this.http.put<EldEvent>(`${environment.apiUrl}/eldEvents/${eventPair.pre.id}`, eventPair.pre, { headers })
				.subscribe(null);
		});
		this.postEldRecordVersion(this.eldRecordVersion + 1);
		setTimeout(() => {
			this.eldRecordPart = 'rods';
		});
	}

	postEldRecordVersion(version: number) {
		let eldEventSeq: EldEvent[] = [];
		for (let deviceId of this.eldEventSeqMap.keys())
			for (let eldEvent of this.eldEventSeqMap.get(deviceId))
				eldEventSeq.push(eldEvent);
		const eldRecordUpdated = {
			id: new Date().getTime(),
			driverId: this.driverId,
			eldRecordDate: this.eldRecordDate,
			version: version,
			eldEventSeqStr: JSON.stringify(eldEventSeq),
			urlPdfFile: null,
			certifiedAt: null,
			certifiedBy: null
		};
		const headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		this.http.post<EldRecord>(`${environment.apiUrl}/eldRecords`, eldRecordUpdated, { headers })
			.pipe(
				tap(() => { 
					this.eldRecordVersion = eldRecordUpdated.version;
					this.eldRecordCertifiedAt = null;
					this.eldRecordId = eldRecordUpdated.id;
				})
			)
			.subscribe(null);
	}

	showOtherEldRecordPart(part: string) {
		setTimeout(() => {
			this.eldRecordPart = part;
		});
	}

	certifyEldRecordByDriver() {
		/*
		if (!this.isDriver) {
			window.alert("The session user is not authorized to certify ELD record.")
			return;
		}
		*/
		if (this.eldRecordDate == this.eldDateObjList[0].dateStr) {
			window.alert("Today's ELD record cannot be certified before the close of the day.");
			return;
		}
		if (!this.eldRecordId) {
			window.alert("Eld record has not been modified since the last certification.");
			return;
		}
		const headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		this.http.get<EldRecord>(`${environment.apiUrl}/eldRecords/${this.eldRecordId}`)
			.subscribe(eldRecord => {
				eldRecord.certifiedAt = new Date();
				eldRecord.certifiedBy = this.uid;
				this.http.put<EldRecord>(`${environment.apiUrl}/eldRecords/${this.eldRecordId}`, eldRecord, { headers })
					.subscribe(eldRecord => {
						this.eldRecordCertifiedAt = eldRecord.certifiedAt;
						this.eldRecordCertifiedCount = eldRecord.certifiedCount;
					});
			});
		for (let deviceId of this.eldEventSeqMap.keys()) {
            const date: Date = new Date();
			const certifyEvent: EldEvent = {
				id: date.getTime(),
				deviceId: deviceId,
				driverId: this.driverId,
				seqNumber: null,
				version: 1,
				status: '1',
				origin: '2',
				type: '4',
				code: (this.eldRecordCertifiedCount++).toString(),
				lat: null,
				lng: null, 
				location: null,
				vehicleMiles: null,
				engineHours: null,
				malIndicatorStatus: null,
				ddeIndicatorStatus: null, 
				mdeCode: null,
				comment: '',
				dateStr: this.convertUtcTimeToEldDateObj(date.getTime()).dateStr,
				timeStr: date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString()
			}
			this.http.post<EldEvent>(`${environment.apiUrl}/eldEvents`, certifyEvent, { headers })
				.subscribe(null);
		}
	}

	showEldRecordInPdf() {
	
	}

	saveEldRecordInPdf() {
	
	}

	printEldRecordInPdf() {

	}

	getTimezoneOffset(tz: string): number {
		let offset: number;
		switch (tz) {
			case 'AST': offset = 4; break;
			case 'EST': offset = 5; break;
			case 'CST': offset = 6; break;
			case 'MST': offset = 7; break;
			case 'PST': offset = 8; break;
			case 'AKST': offset = 9; break;
			case 'ADT': offset = 3; break;
			case 'EDT': offset = 4; break;
			case 'CDT': offset = 5; break;
			case 'MDT': offset = 6; break;
			case 'PDT': offset = 7; break;
			case 'AKDT': offset = 8; break;
			default: console.log("Error: Wrong TZ specified.")
		}
		return offset;
	}

	convertUtcTimeToEldDateObj(t: number): EldDateObj {
		let tadj: number = (Number(localStorage.getItem('Edo')) + Number(localStorage.getItem('Tzo')))*3600*1000;
		let dstr: string = new Date(t - tadj).toISOString().substring(0, 10);
		let from: number = new Date(dstr).getTime() + Number(localStorage.getItem('Edo'))*3600*1000;
		let to: number = from + 24*3600*1000;
		return { dateStr: dstr, from: from, to: to }
	} 

}