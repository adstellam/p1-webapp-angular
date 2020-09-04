import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'

import { VehicleSelectAssetComponent } from '../admin-tasks-modal/vehicle-select-asset/vehicle-select-asset.component';
import { ShippingDocListComponent } from '../admin-tasks-modal/shipping-doc-list/shipping-doc-list.component';

import { Asset, Vehicle } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-asset-loading',
	templateUrl: './asset-loading.component.html',
	styleUrls: ['./asset-loading.component.css']
})
export class AssetLoadingComponent implements OnInit {

	cid: string;
	assetSelectionForm: FormGroup;
	assetFilterForm: FormGroup;
	assetSelected: Asset;
	assetsFiltered: Asset[];
	assetToVehicleMap: Map<string, string>;
	vehicleMap: Map<string, Vehicle>;

	constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, public modalService: NgbModal) { }

	ngOnInit() {
		this.cid = this.route.snapshot.parent.paramMap.get('cid');
		this.assetSelectionForm = this.fb.group({
			id: ['', Validators.required]
		});
		this.assetFilterForm = this.fb.group({
			type: [''],
			shipper: ['']
		});
		const _assetToVehicleMap: Map<string, string> = new Map<string, string>();
		const _vehicleMap: Map<string, Vehicle> = new Map<string, Vehicle>();
		const params = new HttpParams()
			.set('cid', this.cid)
			.set('active', 'true');
		this.http.get<Vehicle[]>(`${environment.apiUrl}/vehicles`, { params })
			.subscribe(vehicles => {
				for (let v of vehicles) 
					_vehicleMap.set(v.id, v);
				this.vehicleMap = new Map<string, Vehicle>(_vehicleMap);
				for (let v of vehicles) 
					for (let id of v.shippingDocNumber)
						_assetToVehicleMap.set(id, v.id);
				this.assetToVehicleMap = new Map<string, string>(_assetToVehicleMap);
			});
	}

	onAssetSelectionFormSubmitted() {
		this.assetsFiltered = null;
		const params: HttpParams = new HttpParams()
			.set('cid', this.cid)
			.set('active', 'true');
		this.http.get<Asset>(`${environment.apiUrl}/assets/${this.assetSelectionForm.value.id}`, { params })
			.subscribe(asset => {
				this.assetSelected = asset;	
			});
	}

	onAssetFilterFormSubmitted() {
		this.assetSelected = null;
		let params: HttpParams;
		if (this.assetFilterForm.value.type) {
			if (this.assetFilterForm.value.shipper) {
				params = new HttpParams()
					.set('cid', this.cid)
					.set('type', this.assetFilterForm.value.id)
					.set('shipper', this.assetFilterForm.value.shipper)
					.set('active', 'true');
			} else {
				params = new HttpParams()
					.set('cid', this.cid)
					.set('type', this.assetFilterForm.value.type)
					.set('active', 'true');
			}
		} else {
			if (this.assetFilterForm.value.shipper) {
				params = new HttpParams()
					.set('cid', this.cid)
					.set('shipper', this.assetFilterForm.value.shipper)
					.set('active', 'true');
			} else {
				params = new HttpParams()
					.set('cid', this.cid)
					.set('active', 'true');
			}
		}
		this.http.get<Asset[]>(`${environment.apiUrl}/assets`, { params })
			.subscribe(assets => {
				this.assetsFiltered = assets;
			});
	}

	onAssetTransferred(assetId: string, fromVehicleId: string) {
		const modalRef: NgbModalRef = this.modalService.open(VehicleSelectAssetComponent, { centered: true, backdrop: 'static', keyboard: false });
		modalRef.componentInstance.vehicleMap = this.vehicleMap;
		modalRef.componentInstance.vehicleSelected 
			.subscribe(toVehicleId => {
				this.handleAssetTransfer(assetId, fromVehicleId, toVehicleId);
			});
	}

	handleAssetTransfer(assetId: string, fromVehicleId: string, toVehicleId: string) {
		const toShippingDocNumber: string[] = this.vehicleMap.get(toVehicleId).shippingDocNumber;
		const fromShippingDocNumber: string[] = this.vehicleMap.get(fromVehicleId).shippingDocNumber;
		toShippingDocNumber.push(assetId);
		
		for (let i = 0; i < fromShippingDocNumber.length; i++)
			if (fromShippingDocNumber[i] == assetId)
				fromShippingDocNumber.splice(i, 1);
		const headers: HttpHeaders = new HttpHeaders()
			.set('Content-Type', 'application/json');
		this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${toVehicleId}`, { shippingDocNumber: toShippingDocNumber }, { headers })
			.subscribe(vehicle => { });
		this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${fromVehicleId}`, { shippingDocNumber: fromShippingDocNumber }, { headers })
			.subscribe(vehicle => { });
		this.assetToVehicleMap.set(assetId, toVehicleId);
	}

	onAssetLoaded(assetId: string) {
		const modalRef: NgbModalRef = this.modalService.open(VehicleSelectAssetComponent, { centered: true, backdrop: 'static', keyboard: false });
		modalRef.componentInstance.vehicleMap = this.vehicleMap;
		modalRef.componentInstance.vehicleSelected 
			.subscribe(toVehicleId => {
				this.handleAssetLoad(assetId, toVehicleId);
			});
	}

	handleAssetLoad(assetId: string, toVehicleId: string) {
		const shippingDocNumber: string[] = this.vehicleMap.get(toVehicleId).shippingDocNumber;
		shippingDocNumber.push(assetId);
		const headers: HttpHeaders = new HttpHeaders()
			.set('Content-Type', 'application/json');
		this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${toVehicleId}`, { shippingDocNumber: shippingDocNumber }, { headers })
			.subscribe(vehicle => { });
		this.assetToVehicleMap.set(assetId, toVehicleId);
	}

	onAssetRemoved(assetId: string, fromVehicleId: string) {
		const shippingDocNumber: string[] = this.vehicleMap.get(fromVehicleId).shippingDocNumber;
		for (let i = 0; i < shippingDocNumber.length; i++)
			if (shippingDocNumber[i] == assetId)
				shippingDocNumber.splice(i, 1);
		const headers: HttpHeaders = new HttpHeaders()
			.set('Content-Type', 'application/json');
		this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${fromVehicleId}`, { shippingDocNumber: shippingDocNumber }, { headers })
			.subscribe(vehicle => { });
		this.assetToVehicleMap.delete(assetId);
	}

	showShippingDocList(vehicleId: string) {
		const modalRef: NgbModalRef = this.modalService.open(ShippingDocListComponent, { centered: true });
		modalRef.componentInstance.cid = this.cid;
		modalRef.componentInstance.vehicleMap = this.vehicleMap;
		modalRef.componentInstance.vehicleId = vehicleId;
	}

}
