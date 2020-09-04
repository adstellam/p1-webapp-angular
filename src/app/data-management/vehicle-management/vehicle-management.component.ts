import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { VehicleAddComponent } from '../vehicle-management-modal/vehicle-add/vehicle-add.component';
import { VehicleDetailComponent } from '../vehicle-management-modal/vehicle-detail/vehicle-detail.component';
import { VehicleEditComponent } from '../vehicle-management-modal/vehicle-edit/vehicle-edit.component';
import { VehicleDeleteComponent } from '../vehicle-management-modal/vehicle-delete/vehicle-delete.component';

import { Vehicle } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-vehicle-management',
    templateUrl: './vehicle-management.component.html',
    styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit {

    cid: string;
    vehicleMap: Map<string, Vehicle>;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public modalService: NgbModal) { }

    ngOnInit() {
        this.cid = this.route.snapshot.parent.paramMap.get('cid');
        const _vehicleMap: Map<string, Vehicle> = new Map<string, Vehicle>();
        const params = new HttpParams()
            .set('cid', this.cid)
            .set('active', 'true');
        this.http.get<Vehicle[]>(`${environment.apiUrl}/vehicles`, { params })
            .subscribe(vehicles => {
                for (let vehicle of vehicles)
                    _vehicleMap.set(vehicle.id, vehicle); 
                this.vehicleMap = new Map<string, Vehicle>(_vehicleMap);
            });
    }

    openVehicleAddModal(cid: string) {
        const modalRef: NgbModalRef = this.modalService.open(VehicleAddComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.cid = cid;
    }

    openVehicleEditModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(VehicleEditComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.vehicle = this.vehicleMap.get(id);
    }

    openVehicleDetailModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(VehicleDetailComponent, { centered: true }); 
        modalRef.componentInstance.vehicle = this.vehicleMap.get(id);
    }


    openVehicleDeleteModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(VehicleDeleteComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.vehicle = this.vehicleMap.get(id);
    }

}

