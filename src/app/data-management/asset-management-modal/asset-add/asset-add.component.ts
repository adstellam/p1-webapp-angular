import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Asset } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-asset-add',
	templateUrl: './asset-add.component.html',
	styleUrls: ['./asset-add.component.css']
})
export class AssetAddComponent implements OnInit {

	@Input() cid: string;
	assetAdded: Asset;
	assetAddForm: FormGroup; 
	allAssets: Asset[];
	stateList: string[];
	uid: string;
	

	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
		this.assetAdded = {
			id: '',
			cid: this.cid,
			type: '',
			length: null,
			width: null,
			height: null,
			weight: null,
			shipper: '',
			origin: '',
			destination: '',
			createdAt: null,
			createdBy: null,
			editedAt: null,
			editedBy: null,
			active: true
		};
		this.assetAddForm = this.fb.group({
			id: ['', Validators.required],
			type: ['', Validators.required],
			length: ['', Validators.required],
			width: ['', Validators.required],
			height: ['', Validators.required],
			weight: ['', Validators.required],
			shipper: [''],
			origin: [''],
			destination: ['']
   		 });
		const params = new HttpParams()
      		.set("cid", this.cid);
    	this.http.get<Asset[]>(`${environment.apiUrl}/assets`, { params })
      		.subscribe(
      			assets => {
      				this.allAssets = assets;
      			}
      		);
      	this.stateList = optionlists.stateList;
		this.uid = localStorage.getItem('UserId');
	}

	addAsset() {
		if (this.isAssetIdUnique()) {
			this.patchAssetAddFormData();
	    	const headers = new HttpHeaders()
	      		.set("Content-Type", "application/json");
	    	this.http.post<Asset>(`${environment.apiUrl}/assets`, this.assetAdded, { headers })
	      		.subscribe(asset => { });
	      	this.activeModal.close();
	      	setTimeout(() => {
	            this.router.navigateByUrl('/', { skipLocationChange: true })
		            .then(() => {
		                this.router.navigate(['/customer-home', this.cid, 'asset-management']);
		            });
        	}, 1000);
      	}
	}

	isAssetIdUnique(): boolean {
		let duplicate = false;
		for (let a of this.allAssets) 
			if (a.id == this.assetAddForm.value.id) 
				duplicate = true;
		if (duplicate) {
			window.alert("The provided id value has already been used. Please use another value for id.");  
			return false;    		
		} else {
			return true;
		}
	}

	patchAssetAddFormData() {		
		this.assetAdded.id = this.assetAddForm.value.id;
		this.assetAdded.type = this.assetAddForm.value.type;
		this.assetAdded.length = this.assetAddForm.value.length;
		this.assetAdded.width = this.assetAddForm.value.width;
		this.assetAdded.height = this.assetAddForm.value.height;
		this.assetAdded.weight = this.assetAddForm.value.weight;
		this.assetAdded.shipper = this.assetAddForm.value.shipper;
		this.assetAdded.origin = this.assetAddForm.value.origin;
		this.assetAdded.destination = this.assetAddForm.value.destination;
		this.assetAdded.createdAt = new Date();
		this.assetAdded.createdBy = this.uid;
	}
  
}
