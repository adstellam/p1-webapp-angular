import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

import { Device, Vehicle, Driver, Rtd, Hos } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-device-line',
    templateUrl: './device-line.component.html',
    styleUrls: ['./device-line.component.css']
})
export class DeviceLineComponent implements OnInit {

    @Input() deviceId: string;
    @Input() rtdSubject: WebSocketSubject<Rtd>;
    @Input() hosSubject: WebSocketSubject<Hos>;
    @Input() device: Device;
    @Input() vehicle: Vehicle | null;
    @Input() driver: Driver | null;
    @Output() deviceDetailClicked: EventEmitter<string> = new EventEmitter<string>(); 
    @Output() vehicleDetailClicked: EventEmitter<string> = new EventEmitter<string>();
    @Output() driverDetailClicked: EventEmitter<string> = new EventEmitter<string>(); 
    rtd: Rtd;
    rtd$: Observable<Rtd>;
    rtdSubscription: Subscription;
    hos: Hos;
    hos$: Observable<Hos>;
    hosSubscription: Subscription;
    
    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

    ngOnInit() {
        const rtd$ = this.rtdSubject.multiplex(
            () => ({ subscribe: this.deviceId }),
            () => ({ unsubscribe: this.deviceId }),
            data => data.deviceId == this.deviceId 
        );
        this.rtdSubscription = rtd$.subscribe(rtd => {
            this.rtd = rtd;
        });
        const hos$ = this.hosSubject.multiplex(
            () => ({ subscribe: this.driver.id }),
            () => ({ unsubscribe: this.driver.id }),
            data => data.driverId == this.driver.id 
        );
        this.hosSubscription = hos$.subscribe(hos => {
            this.hos = hos;
        });
    }

    showDeviceDetail(id: string) {
        this.deviceDetailClicked.emit(id);
    }

    showVehicleDetail(id: string) {
        this.vehicleDetailClicked.emit(id);
    }

    showDriverDetail(id: string) {
        this.driverDetailClicked.emit(id);
    }

    showGeolocation(deviceId: string) {
        let vehicleDesc: string = this.vehicle ? this.vehicle.make + " " + this.vehicle.model + " (" + this.vehicle.year + ")" : null;
        let driverName: string = this.driver ? this.driver.firstName + " " + this.driver.lastName : null;
        this.router.navigate([`./${deviceId}`, 'geolocation', { vehicleDesc: vehicleDesc, driverName: driverName }], { relativeTo: this.route });
    }
    
    showAnalytics(deviceId: string) {
        let vehicleDesc: string = this.vehicle ? this.vehicle.make + " " + this.vehicle.model + " (" + this.vehicle.year + ")" : null;
        let driverName: string = this.driver ? this.driver.firstName + " " + this.driver.lastName : null;
        this.router.navigate([`./${deviceId}`, 'analytics', { vehicleDesc: vehicleDesc, driverName: driverName }], { relativeTo: this.route });
    }

    showLiveVideo(deviceId: string) {
        let vehicleDesc: string = this.vehicle ? this.vehicle.make + " " + this.vehicle.model + " (" + this.vehicle.year + ")" : null;
        let driverName: string = this.driver ? this.driver.firstName + " " + this.driver.lastName : null;
        this.router.navigate([`./${deviceId}`, 'live-video', { vehicleDesc: vehicleDesc, driverName: driverName }], { relativeTo: this.route });
    }

    showArchiveVideo(deviceId: string) {
        let vehicleDesc: string = this.vehicle ? this.vehicle.make + " " + this.vehicle.model + " (" + this.vehicle.year + ")" : null;
        let driverName: string = this.driver ? this.driver.firstName + " " + this.driver.lastName : null;
        this.router.navigate([`./${deviceId}`, 'archive-video', { vehicleDesc: vehicleDesc, driverName: driverName }], { relativeTo: this.route });
    }

}
