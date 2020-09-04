import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AssetAddComponent } from '../asset-management-modal/asset-add/asset-add.component';
import { AssetDetailComponent } from '../asset-management-modal/asset-detail/asset-detail.component';
import { AssetEditComponent } from '../asset-management-modal/asset-edit/asset-edit.component';
import { AssetDeleteComponent } from '../asset-management-modal/asset-delete/asset-delete.component';

import { Asset } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-asset-management',
    templateUrl: './asset-management.component.html',
    styleUrls: ['./asset-management.component.css']
})
export class AssetManagementComponent implements OnInit {

    cid: string;
    assetMap: Map<string, Asset>;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public modalService: NgbModal) { }

    ngOnInit() {
        this.cid = this.route.snapshot.parent.paramMap.get('cid');
        const _assetMap: Map<string, Asset> = new Map<string, Asset>();
        const params = new HttpParams()
            .set('cid', this.cid)
            .set('active', 'true');
        this.http.get<Asset[]>(`${environment.apiUrl}/assets`, { params })
            .subscribe(assets => {
                for (let asset of assets)
                    _assetMap.set(asset.id, asset);
                this.assetMap = new Map<string, Asset>(_assetMap);
            });   
    }

    openAssetAddModal(cid: string) {
        const modalRef: NgbModalRef = this.modalService.open(AssetAddComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.cid = cid;
    }

    openAssetEditModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(AssetEditComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.asset = this.assetMap.get(id);
    }

    openAssetDetailModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(AssetDetailComponent, { centered: true }); 
        modalRef.componentInstance.asset = this.assetMap.get(id);
    }

    openAssetDeleteModal(id: string) {
        const modalRef: NgbModalRef = this.modalService.open(AssetDeleteComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.asset = this.assetMap.get(id);
    }

}