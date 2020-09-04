import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DeviceAddComponent } from '../device-management-modal/device-add/device-add.component';
import { DeviceDetailComponent } from '../device-management-modal/device-detail/device-detail.component';
import { DeviceEditComponent } from '../device-management-modal/device-edit/device-edit.component';
import { DeviceDeleteComponent } from '../device-management-modal/device-delete/device-delete.component';

import { Device, Vehicle, Driver } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-device-management',
    templateUrl: './device-management.component.html',
    styleUrls: ['./device-management.component.css']
})
export class DeviceManagementComponent implements OnInit {

    cid: string;
    deviceMap: Map<string, Device> = new Map<string, Device>();
    vehicleMap: Map<string, Vehicle> = new Map<string, Vehicle>();
    driverMap: Map<string, Driver> = new Map<string, Driver>();

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
    }

    openDeviceAddModal(cid: string) {
        const modalRef: NgbModalRef = this.modalService.open(DeviceAddComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.cid = cid;
        modalRef.componentInstance.deviceMap = this.deviceMap;
        modalRef.componentInstance.vehicleMap = this.vehicleMap;
    }

    openDeviceEditModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(DeviceEditComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.device = this.deviceMap.get(id);
        modalRef.componentInstance.deviceMap = this.deviceMap;
        modalRef.componentInstance.vehicleMap = this.vehicleMap;
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

    openDeviceDeleteModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(DeviceDeleteComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.device = this.deviceMap.get(id);
    }

}
