import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DriverAddComponent } from '../driver-management-modal/driver-add/driver-add.component';
import { DriverDetailComponent } from '../driver-management-modal/driver-detail/driver-detail.component';
import { DriverEditComponent } from '../driver-management-modal/driver-edit/driver-edit.component';
import { DriverDeleteComponent } from '../driver-management-modal/driver-delete/driver-delete.component';

import { Driver } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-driver-management',
    templateUrl: './driver-management.component.html',
    styleUrls: ['./driver-management.component.css']
})
export class DriverManagementComponent implements OnInit {

    cid: string;
    driverMap: Map<string, Driver>;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public modalService: NgbModal) { }

    ngOnInit() {
        this.cid = this.route.snapshot.parent.paramMap.get('cid');
        const _driverMap: Map<string, Driver> = new Map<string, Driver>();
        const params = new HttpParams()
            .set('cid', this.cid)
            .set('active', 'true');
        this.http.get<Driver[]>(`${environment.apiUrl}/drivers`, { params })
            .subscribe(drivers => {
                for (let driver of drivers)
                    _driverMap.set(driver.id, driver);
                this.driverMap = new Map<string, Driver>(_driverMap);
            });   
    }

    openDriverAddModal(cid: string) {
        const modalRef: NgbModalRef = this.modalService.open(DriverAddComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.cid = cid;
    }

    openDriverEditModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(DriverEditComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.driver = this.driverMap.get(id);
    }

    openDriverDetailModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(DriverDetailComponent, { centered: true }); 
        modalRef.componentInstance.driver = this.driverMap.get(id);
    }

    openDriverDeleteModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(DriverDeleteComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.driver = this.driverMap.get(id);
    }

}