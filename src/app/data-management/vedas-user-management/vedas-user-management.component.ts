import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { VedasUserAddComponent } from '../vedas-user-management-modal/vedas-user-add/vedas-user-add.component';
import { VedasUserDetailComponent } from '../vedas-user-management-modal/vedas-user-detail/vedas-user-detail.component';
import { VedasUserEditComponent } from '../vedas-user-management-modal/vedas-user-edit/vedas-user-edit.component';
import { VedasUserDeleteComponent } from '../vedas-user-management-modal/vedas-user-delete/vedas-user-delete.component';

import { VedasUser } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-vedas-user-management',
    templateUrl: './vedas-user-management.component.html',
    styleUrls: ['./vedas-user-management.component.css']
})
export class VedasUserManagementComponent implements OnInit {

    cid: string;
    uid: string;
    urole: string;
    inferiorRoles: string[];
    vedasUserMap: Map<string, VedasUser>;
    
    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public modalService: NgbModal) { }

    ngOnInit() {
        this.cid = this.route.snapshot.parent.paramMap.get('cid');
        this.uid = localStorage.getItem('UserId');
        this.urole = localStorage.getItem('UserRole');
        switch (this.urole) {
            case 'driver': this.inferiorRoles = [];
            case 'admin': this.inferiorRoles = ['driver'];
            case 'super': this.inferiorRoles = ['admin', 'driver'];
            case 'sysop': this.inferiorRoles = ['super', 'admin', 'driver'];
        }
        const _vedasUserMap: Map<string, VedasUser> = new Map<string, VedasUser>();
        const params = new HttpParams()
            .set('cid', this.cid)
            .set('active', 'true');
        this.http.get<VedasUser[]>(`${environment.apiUrl}/vedasUsers`, { params })
            .subscribe(vedasUsers => {
                for (let vedasUser of vedasUsers)
                    if (vedasUser.username == this.uid || this.inferiorRoles.includes(vedasUser.role))
                        _vedasUserMap.set(vedasUser.username, vedasUser);
                this.vedasUserMap = new Map<string, VedasUser>(_vedasUserMap);
            });   
    }

    openVedasUserAddModal(cid: string) {
        const modalRef: NgbModalRef = this.modalService.open(VedasUserAddComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.cid = cid;
    }

    openVedasUserDetailModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(VedasUserDetailComponent, { centered: true }); 
        modalRef.componentInstance.vedasUser = this.vedasUserMap.get(id);
    }

    openVedasUserEditModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(VedasUserEditComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.vedasUser = this.vedasUserMap.get(id);
    }

    openVedasUserDeleteModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(VedasUserDeleteComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.vedasUser = this.vedasUserMap.get(id);
    }

}

