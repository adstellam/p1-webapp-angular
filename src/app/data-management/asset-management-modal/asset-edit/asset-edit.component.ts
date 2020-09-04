import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Asset } from '../../../interfaces';
import { optionlists } from '../../../optionlists';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-asset-edit',
	templateUrl: './asset-edit.component.html',
	styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {

	@Input() asset: Asset;
	assetEdited: Asset;
	assetEditForm: FormGroup; 
	stateList: string[];
	uid: string;

	constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) { }
	
	ngOnInit() {
        this.assetEdited = Object.assign({}, this.asset);
		this.assetEditForm = this.fb.group({
			type: [''],
			length: [null],
			width: [null],
			height: [null],
			weight: [null],
			shipper: [''],
			origin: [''],
			destination: ['']
   		});
   		this.stateList = optionlists.stateList;
   		this.uid = localStorage.getItem('UserId');
	}

	editAsset() {
		this.patchAssetEditFormData()
		const headers = new HttpHeaders()
      		.set("Content-Type", "application/json");
    	this.http.put<Asset>(`${environment.apiUrl}/assets/${this.asset.id}`, this.assetEdited, { headers })
      		.subscribe(
      			val => { 
          			console.log("Asset edited successfully: ", val);
        		},
        		err => {
          			console.log("Failed to edit asset: ", err);
        		}
      		);
      	this.activeModal.close();
      	setTimeout(() => {
      		this.router.navigateByUrl('/', { skipLocationChange: true })
	            .then(() => {
	                this.router.navigate(['/customer-home', this.asset.cid, 'asset-management']);
	            });
	        }, 1000);
	}

	patchAssetEditFormData() {
		if (this.assetEditForm.value.type) 
			this.assetEdited.type = this.assetEditForm.value.type;
		if (this.assetEditForm.value.length) 
			this.assetEdited.length = this.assetEditForm.value.length;
		if (this.assetEditForm.value.width) 
			this.assetEdited.width = this.assetEditForm.value.width;
		if (this.assetEditForm.value.height)
			this.assetEdited.height = this.assetEditForm.value.height;
		if (this.assetEditForm.value.weight)
			this.assetEdited.weight = this.assetEditForm.value.weight;
		if (this.assetEditForm.value.shipper)
			this.assetEdited.shipper = this.assetEditForm.value.shipper;
		if (this.assetEditForm.value.origin)
			this.assetEdited.origin = this.assetEditForm.value.origin;
		if (this.assetEditForm.value.destination)
			this.assetEdited.destination = this.assetEditForm.value.destination;
		this.assetEdited.editedAt = new Date();
		this.assetEdited.editedBy = this.uid;
	}
	
}
