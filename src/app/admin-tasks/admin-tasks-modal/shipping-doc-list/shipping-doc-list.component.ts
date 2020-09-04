import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Vehicle, Asset } from '../../../interfaces';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-shipping-doc-list',
	templateUrl: './shipping-doc-list.component.html',
	styleUrls: ['./shipping-doc-list.component.css']
})
export class ShippingDocListComponent implements OnInit {

	@Input() cid: string;
	@Input() vehicleMap: Map<string, Vehicle>;
	@Input() vehicleId: string;
	assetMap: Map<string, Asset>; 

	constructor(private http: HttpClient, public activeModal: NgbActiveModal) { }

	ngOnInit() {
		const _assetMap: Map<string, Asset> = new Map<string, Asset>();
		const params: HttpParams = new HttpParams()
			.set('cid', this.cid)
			.set('active', 'true');
		this.http.get<Asset[]>(`${environment.apiUrl}/assets`, { params })
			.subscribe(assets => {
				for (let a of assets)
					_assetMap.set(a.id, a);
				this.assetMap = new Map<string, Asset>(_assetMap);
			})
	}

}
