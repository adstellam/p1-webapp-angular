import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'

import { DeviceSelectComponent } from '../admin-tasks-modal/device-select/device-select.component';
import { DeviceSelectCodriverComponent } from '../admin-tasks-modal/device-select-codriver/device-select-codriver.component';
import { DutyStatusSelectComponent } from '../admin-tasks-modal/duty-status-select/duty-status-select.component';
import { IntentIndicationSelectComponent } from '../admin-tasks-modal/intent-indication-select/intent-indication-select.component';
import { Device, Driver, DriverStatus, DriverHosSession, EldEvent, EldDateObj } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-driver-input',
	templateUrl: './driver-input.component.html', 
	styleUrls: ['./driver-input.component.css']
})
export class DriverInputComponent implements OnInit {

	cid: string;
	uid: string;
	driverId: string;
	driverIdFormControl: FormControl = new FormControl('');
	driver: Driver;
	drivers: Driver[];
	deviceMap: Map<string, Device> = new Map<string, Device>();
	deviceIdForDriver: string;
	deviceIdForCodriver: string;
	driverStatus: DriverStatus;
	isDriver: boolean;
	
	constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public modalService: NgbModal) { }

	ngOnInit() {
		this.cid = this.route.snapshot.parent.paramMap.get('cid');
		this.uid = localStorage.getItem('UserId');
		this.isDriver = localStorage.getItem('UserRole') == 'driver' ? true : false;
		if (this.isDriver) {
			this.driverId = this.uid;
			this.http.get<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driverId}`)
				.subscribe(driverStatus => {
					this.driverStatus = driverStatus;
				});
			this.http.get<Driver>(`${environment.apiUrl}/drivers/${this.driverId}`)
				.subscribe(driver => {
					this.driver = driver;
				});	
			const params = new HttpParams()
				.set('cid', this.cid)
				.set('active', 'true');
			this.http.get<Device[]>(`${environment.apiUrl}/devices`, { params })
				.subscribe(devices => {
					for (let d of devices) {
						this.deviceMap.set(d.id, d);
						if (d.driverId == this.driverId) 
							this.deviceIdForDriver = d.id;
						if (d.codriverId == this.driverId) 
							this.deviceIdForCodriver = d.id;
					}
				});
		} else {
			const params = new HttpParams()
				.set('cid', this.cid)
				.set('active', 'true');
			this.http.get<Driver[]>(`${environment.apiUrl}/drivers`, { params })
				.subscribe(drivers => {
					this.drivers = drivers;
				});
		}
	}

	proceedAsDriver(driverId: string) {
		this.isDriver = true;
		this.driverId = driverId;
		this.http.get<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driverId}`)
			.subscribe(driverStatus => {
				this.driverStatus = driverStatus;
			});
		this.http.get<Driver>(`${environment.apiUrl}/drivers/${this.driverId}`)
				.subscribe(driver => {
					this.driver = driver;
				});	
		const params = new HttpParams()
			.set('cid', this.cid)
			.set('active', 'true');
		this.http.get<Device[]>(`${environment.apiUrl}/devices`, { params })
			.subscribe(devices => {
				for (let d of devices) {
					this.deviceMap.set(d.id, d);
					if (d.driverId == this.driverId) 
						this.deviceIdForDriver = d.id;
					if (d.codriverId == this.driverId) 
						this.deviceIdForCodriver = d.id;
				}
			});  
	}

	onDriverSignout() {
		//Set HttpHeaders
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json'); 
		//Update DriverStatus and Device. Post DriverHosSession if driverStatus is "driving" and intentIndication is "3".
		const date: Date = new Date();
		const driverStatusUpdate = {
			signedIn: false,
			dutyStatus: '4',
			intentIndication: '3'
		};
		const deviceUpdate = {
			driverId: null,
			editedAt: date,
			editedBy: 'ng'
		};
		const driverHosSession = {
			id: this.driverId, 
			code: 'off', 
			t: date.getTime()
		};
		this.http.patch<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driverId}`, driverStatusUpdate, { headers })
			.subscribe(driverStatus => {
				this.http.patch<Device>(`${environment.apiUrl}/devices/${this.deviceIdForDriver}`, deviceUpdate, { headers })
					.subscribe(device => {});
				if (this.driverStatus.dutyStatus == '3' && this.driverStatus.intentIndication == '3')
					this.http.post<DriverHosSession>(`${environment.apiUrl}/driverHosSessions`, driverHosSession, { headers })
						.subscribe(session => {});
			});
		//Post EldEvent [some fields to be completed at the Node server].
		const eldEvent: EldEvent = {
			id: date.getTime(),
			deviceId: this.deviceIdForDriver,
			driverId: this.driverId,
			seqNumber: null,
			version: 1,
			status: '1',
			origin: '2',
			type: '5',
			code: '2',
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
		this.http.post<EldEvent>(`${environment.apiUrl}/eldEvents`, eldEvent, { headers })
			.subscribe(eldEvent => {});
		//Refresh
		setTimeout(() => {
			this.router.navigateByUrl('/', { skipLocationChange: true })
            	.then(() => {
                	this.router.navigate(['/customer-home', this.cid, 'driver-input']);
            	});
            window.alert("Your Duty Status is no longer 'Driving'. Please make sure to choose your new Duty Status.");
        }, 1000);
	}

	onDriverSignin() {
		//Not to be invoked if driver is signed in as codriver
		const modalRef: NgbModalRef = this.modalService.open(DeviceSelectComponent, { centered: true, backdrop: 'static', keyboard: false });
		modalRef.componentInstance.deviceMap = this.deviceMap;
		modalRef.componentInstance.deviceSelected
			.subscribe(deviceId => {
				this.handleDriverSignin(deviceId);
			});
	}

	onCodriverSignout() {
		//Set HttpHeaders
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json'); 
		//Update DriverStatus and Device.
		const driverStatusUpdate = {
			signedInAsCodriver: false
		};
		const deviceUpdate = {
			codriverId: null,
			editedAt: new Date(),
			editedBy: 'ng'
		};
		this.http.patch<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driverId}`, driverStatusUpdate, { headers })
			.subscribe(driverStatus => {
				this.http.patch<Device>(`${environment.apiUrl}/devices/${this.deviceIdForCodriver}`, deviceUpdate, { headers })
					.subscribe(device => {});
			});
		//No need to post EldEvent in case of codriver sign-out

		//Refresh
		setTimeout(() => {
			this.router.navigateByUrl('/', { skipLocationChange: true })
            	.then(() => {
                	this.router.navigate(['/customer-home', this.cid, 'driver-input']);
            	});
        }, 1000);
	}

	onCodriverSignin() {
		//Not to be invoked if driver is signed as primary driver
		const modalRef: NgbModalRef = this.modalService.open(DeviceSelectCodriverComponent, { centered: true, backdrop: 'static', keyboard: false });
		modalRef.componentInstance.deviceMap = this.deviceMap;
		modalRef.componentInstance.deviceSelected
			.subscribe(deviceId => {
				this.handleCodriverSignin(deviceId);
			});
	}

	onDriverDutyStatusChange() {
		const modalRef: NgbModalRef = this.modalService.open(DutyStatusSelectComponent, { centered: true, backdrop: 'static', keyboard: false });
		modalRef.componentInstance.currentDutyStatus = this.driverStatus.dutyStatus;
		modalRef.componentInstance.dutyStatusSelected
			.subscribe(dutyStatus => {
				this.handleDutyStatusChange(this.driverStatus.dutyStatus, dutyStatus);
			});
	}

	onDriverIntentIndicationChange() {
		const modalRef: NgbModalRef = this.modalService.open(IntentIndicationSelectComponent, { centered: true, backdrop: 'static', keyboard: false });
		modalRef.componentInstance.currentIntentIndication = this.driverStatus.intentIndication;
		modalRef.componentInstance.intentIndicationSelected
			.subscribe(intentIndication => {
				this.handleIntentIndicationChange(this.driverStatus.intentIndication, intentIndication);
			});
	}

	onUnauthenticatedDriverProfileAssumption() {
		
	}

	handleDriverSignin(deviceId: string) {
		//Set HttpHeaders
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json'); 
		//Update DriverStatus and Device. Post DriverHosSession.
		const date: Date = new Date();
		const driverStatusUpdate = {
			signedIn: true,
			dutyStatus: '3',
			intentIndication: '3'
		};
		const deviceUpdate = {
			driverId: this.driverId,
			editedAt: date,
			editedBy: 'ng'
		};
		const driverHosSession = {
			id: this.driverId, 
			code: 'on', 
			t: date.getTime()
		};
		this.http.patch<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driverId}`, driverStatusUpdate, { headers })
			.subscribe(driverStatus => {
				this.http.patch<Device>(`${environment.apiUrl}/devices/${deviceId}`, deviceUpdate, { headers })
					.subscribe(device => {});
				this.http.post<DriverHosSession>(`${environment.apiUrl}/driverHosSessions`, driverHosSession, { headers })
					.subscribe(driverHosSession => {});
			});
		//Post EldEvent [some fields to be completed at the Node server].
		const eldEvent: EldEvent = {
			id: date.getTime(),
			deviceId: deviceId,
			driverId: this.driverId,
			seqNumber: null,
			version: 1,
			status: '1',
			origin: '2',
			type: '5',
			code: '1',
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
		this.http.post<EldEvent>(`${environment.apiUrl}/eldEvents`, eldEvent, { headers })
			.subscribe(eldEvent => {});
		//Refresh
		setTimeout(() => {
			this.router.navigateByUrl('/', { skipLocationChange: true })
            	.then(() => {
                	this.router.navigate(['/customer-home', this.cid, 'driver-input']);
            	});
        	window.alert("Your Duty Status is now 'Driving'. Please review your indicated Driver Intent.");
        }, 1000);
	}

	handleCodriverSignin(deviceId: string) {
		//Set HttpHeaders
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json'); 
		//Update DriverStatus and Device.
		const driverStatusUpdate = {
			signedInAsCodriver: true
		};
		const deviceUpdate = {
			codriverId: this.driverId,
			editedAt: new Date(),
			editedBy: 'ng'
		};
		this.http.patch<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driverId}`, driverStatusUpdate, { headers })
			.subscribe(driverStatus => {
				this.http.patch<Device>(`${environment.apiUrl}/devices/${deviceId}`, deviceUpdate, { headers })
					.subscribe(device => {});
			});
		//No need to post EldEvent in case of codriver sign-in

		//Refresh
		setTimeout(() => {
			this.router.navigateByUrl('/', { skipLocationChange: true })
            	.then(() => {
                	this.router.navigate(['/customer-home', this.cid, 'driver-input']);
            	});
        }, 1000);
	}

	handleDutyStatusChange(currentDutyStatus: string, newDutyStatus: string) {
		if (currentDutyStatus != newDutyStatus) {
			//Set HttpHeaders
			const headers = new HttpHeaders()
				.set('Content-Type', 'application/json'); 
			//Update DriverStatus. Post DriverHosSession in certain cases.
			const date: Date = new Date();
			const driverStatusUpdate = {
				dutyStatus: newDutyStatus
			};
			this.http.patch<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driverId}`, driverStatusUpdate, { headers })
				.subscribe(driverStatus => {
					if (currentDutyStatus == '3')
						this.http.post<DriverHosSession>(`${environment.apiUrl}/driverHosSessions`, { id: this.driverId, code: 'off', t: date.getTime() }, { headers })
							.subscribe(session => {});
					if (newDutyStatus == '3')
						this.http.post<DriverHosSession>(`${environment.apiUrl}/driverHosSessions`, { id: this.driverId, code: 'on', t: date.getTime() }, { headers })
							.subscribe(session => {});
				});
			//Post EldEvent [some fields to be completed at the Node.js server].
			const eldEvent: EldEvent = {
				id: date.getTime(),
				deviceId: this.deviceIdForDriver,
				driverId: this.driverStatus.id,
				seqNumber: null,
				version: 1,
				status: '1',
				origin: '2',
				type: '1',
				code: newDutyStatus,
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
			this.http.post<EldEvent>(`${environment.apiUrl}/eldEvents`, eldEvent, { headers })
				.subscribe(eldEvent => {});
			//Refresh
			setTimeout(() => {
				this.router.navigateByUrl('/', { skipLocationChange: true })
	            	.then(() => {
	                	this.router.navigate(['/customer-home', this.cid, 'driver-input']);
	            	});
	        }, 1000);
		}	
	}

	handleIntentIndicationChange(currentIntentIndication: string, newIntentIndication: string) {
		if (currentIntentIndication != newIntentIndication) {
			//Set HttpHeaders
			const headers = new HttpHeaders()
				.set('Content-Type', 'application/json'); 
			//Update DriverStatus. Post DriverHosSession in certain cases.
			const date: Date = new Date();
			const driverStatusUpdate = {
				intentIndication: newIntentIndication
			};
			this.http.patch<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driverId}`, driverStatusUpdate, { headers })
				.subscribe(driverStatus => {
					if (this.driverStatus.dutyStatus == '3' && newIntentIndication != '3')
						this.http.post<DriverHosSession>(`${environment.apiUrl}/driverHosSessions`, { id: this.driverId, code: "off", t: date.getTime() }, { headers })
							.subscribe(session => {});
					if (this.driverStatus.dutyStatus == '3' && newIntentIndication == '3')
						this.http.post<DriverHosSession>(`${environment.apiUrl}/driverHosSessions`, { id: this.driverId, code: "on", t: date.getTime() }, { headers })
							.subscribe(session => {});
				});
			//Post EldEvent [some fields to be completed at the Node server].
			const eldEvent: EldEvent = {
				id: date.getTime(),
				deviceId: this.deviceIdForDriver,
				driverId: this.driverStatus.id,
				seqNumber: null,
				version: 1,
				status: '1',
				origin: '2',
				type: '3',
				code: newIntentIndication,
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
			this.http.post<EldEvent>(`${environment.apiUrl}/eldEvents`, eldEvent, { headers })
				.subscribe(eldEvent => {});
			//Refresh
			setTimeout(() => {
				this.router.navigateByUrl('/', { skipLocationChange: true })
	            	.then(() => {
	                	this.router.navigate(['/customer-home', this.cid, 'driver-input']);
	            	});
	        }, 1000);
		}
	}

	convertUtcTimeToEldDateObj(t: number): EldDateObj {
		let tadj: number = (Number(localStorage.getItem('Edo')) + Number(localStorage.getItem('Tzo')))*3600*1000;
		let dstr: string = new Date(t - tadj).toISOString().substring(0, 10);
		let from: number = new Date(dstr).getTime() + Number(localStorage.getItem('Edo'))*3600*1000;
		let to: number = from + 24*3600*1000;
		return { dateStr: dstr, from: from, to: to }
	}

}

