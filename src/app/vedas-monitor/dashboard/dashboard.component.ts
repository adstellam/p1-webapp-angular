import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { DeviceDetailComponent } from '../../data-management/device-management-modal/device-detail/device-detail.component';
import { VehicleDetailComponent } from '../../data-management/vehicle-management-modal/vehicle-detail/vehicle-detail.component';
import { DriverDetailComponent } from '../../data-management/driver-management-modal/driver-detail/driver-detail.component';
import { Device, Vehicle, Driver, Rtd, Hos } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    cid: string;
    deviceMap: Map<string, Device>;
    vehicleMap: Map<string, Vehicle>;
    driverMap: Map<string, Driver>;
    rtdSubject: WebSocketSubject<Rtd>;
    hosSubject: WebSocketSubject<Hos>;
    riskLevelThreshold: number;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public modalService: NgbModal) { }

    ngOnInit() {
        this.cid = this.route.snapshot.parent.paramMap.get('cid');
        const _deviceMap: Map<string, Device> = new Map<string, Device>();
        const _vehicleMap: Map<string, Vehicle> = new Map<string, Vehicle>();
        const _driverMap: Map<string, Driver> = new Map<string, Driver>();
        const params = new HttpParams()
            .set('cid', this.cid)
            .set('active', 'true');
        this.http.get<Device[]>(`${environment.apiUrl}/devices`, { params })
            .subscribe(devices => {
                for (let d of devices)
                    _deviceMap.set(d.id, d);
                this.deviceMap = new Map<string, Device>(_deviceMap);
            });
        this.http.get<Vehicle[]>(`${environment.apiUrl}/vehicles`, { params })
            .subscribe(vehicles => {
                for (let v of vehicles)
                    _vehicleMap.set(v.id, v);
                this.vehicleMap = new Map<string, Vehicle>(_vehicleMap);
            });
        this.http.get<Driver[]>(`${environment.apiUrl}/drivers`, { params })
            .subscribe(drivers => {
                for (let e of drivers)
                    _driverMap.set(e.id, e);
                this.driverMap = new Map<string, Driver>(_driverMap);
            });
        this.rtdSubject = webSocket<Rtd>(`${environment.rtdWssUrl}`);
        this.hosSubject = webSocket<Hos>(`${environment.hosWssUrl}`);
    }

    ngOnDestroy() {
        this.rtdSubject.unsubscribe();
        this.hosSubject.unsubscribe();
    }

    openDeviceDetailModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(DeviceDetailComponent, { centered: true });
        modalRef.componentInstance.device = this.deviceMap.get(id);
        if (this.deviceMap.get(id).vehicleId)
            modalRef.componentInstance.vehicle = this.vehicleMap.get(this.deviceMap.get(id).vehicleId);
        else
            modalRef.componentInstance.vehicle = null;
        if (this.deviceMap.get(id).driverId)
            modalRef.componentInstance.driver = this.driverMap.get(this.deviceMap.get(id).driverId);
        else 
            modalRef.componentInstance.driver = null;
        if (this.deviceMap.get(id).codriverId)
            modalRef.componentInstance.codriver = this.driverMap.get(this.deviceMap.get(id).codriverId);
        else
            modalRef.componentInstance.codriver = null;
    }
                
    openVehicleDetailModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(VehicleDetailComponent, { centered: true }); 
        modalRef.componentInstance.vehicle = this.vehicleMap.get(id);
    }

    openDriverDetailModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(DriverDetailComponent, { centered: true });
        modalRef.componentInstance.driver = this.driverMap.get(id);
    }

    addDeviceToVedasRiskLevelGroup() {
    
    }

    setVedasRiskLevelThreshold(n) {
        this.riskLevelThreshold = n;
    }

}
