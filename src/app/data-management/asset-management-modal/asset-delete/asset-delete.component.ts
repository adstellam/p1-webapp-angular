import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Asset } from '../../../interfaces';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-asset-delete',
	templateUrl: './asset-delete.component.html',
	styleUrls: ['./asset-delete.component.css']
})
export class AssetDeleteComponent implements OnInit {

	@Input() asset: Asset;
    assetDeleted: Asset;
    uid: string;

	constructor(private router: Router, private http: HttpClient, public activeModal: NgbActiveModal) {}

  	ngOnInit() {
        this.assetDeleted = Object.assign({}, this.asset);
        this.uid = localStorage.getItem('UserId');
  	}

    setAssetDeleted() {
        this.assetDeleted.editedAt = new Date();
        this.assetDeleted.editedBy = this.uid;
        this.assetDeleted.active = false;
    }

  	deleteAsset() {
        const update = {
            editedAt: new Date(),
            editedBy: localStorage.getItem('UserId'),
            active: false
        };
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        this.http.patch<Asset>(`${environment.apiUrl}/assets/${this.asset.id}`, update, { headers })
            .subscribe(asset => {});
        this.activeModal.close();
        setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                    this.router.navigate(['/customer-home', this.asset.cid, 'asset-management']);
                });
        }, 1000);
    }

}
