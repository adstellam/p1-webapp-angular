import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { EldEvent } from '../../interfaces';


@Component({
	selector: 'app-eld-event-edit',
	templateUrl: './eld-event-edit.component.html',
	styleUrls: ['./eld-event-edit.component.css']
})
export class EldEventEditComponent implements OnInit {

	@Input() eldEventSelected: EldEvent;
	@Output() doneClicked: EventEmitter<EldEvent> = new EventEmitter<EldEvent>();
	eldEventEdited: EldEvent;
	eldEventEditForm: FormGroup;
	typeList: object[];
	type1CodeList: object[];
	type2CodeList: object[];
	type3CodeList: object[];
	type4CodeList: object[];
	type5CodeList: object[];
	type6CodeList: object[];
	type7CodeList: object[];
	statusList: object[];
	originList: object[];

	constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

	ngOnInit() {
		this.eldEventEdited = Object.assign({}, this.eldEventSelected);
		this.eldEventEditForm = this.fb.group({
			type: [''],
			code: [''],
			status: [''],
			origin: [''],
			location: [''],
			vehicleMiles: [''],
			engineHours: [''],
			comment: ['']
		});
		this.statusList = [
			{ val: '1', desc: 'Active'},
			{ val: '2', desc: 'Inactive/changed'},
			{ val: '3', desc: 'Change requested'},
			{ val: '4', desc: 'Change rejected'}
		];
		this.originList = [
			{ val: '1', desc: 'Auto'},
			{ val: '2', desc: 'Driver'},
			{ val: '3', desc: 'Support personnel'},
			{ val: '4', desc: 'Assumed from unauthenticated'}
		];
		this.typeList = [ 
			{ val: '1', desc: 'Change of Duty Status' }, 
			{ val: '2', desc: 'Intervening Logging' }, 
			{ val: '3', desc: 'Change of Intent Indication' }, 
			{ val: '4', desc: 'Driver Certification' }, 
			{ val: '5', desc: 'Driver Login/Logout' }, 
			{ val: '6', desc: 'Engine Power-Up/Shutdown' }, 
			{ val: '7', desc: 'Malfunction & DDE' }
		];
		this.type1CodeList = [
			{ val: '1', desc: 'Off-duty'},
			{ val: '2', desc: 'SB'},
			{ val: '3', desc: 'Driving'},
			{ val: '4', desc: 'ODND'}
		];
		this.type2CodeList = [
			{ val: '1', desc: 'Conventional prec'},
			{ val: '2', desc: 'Reduced precision'}
		];
		this.type3CodeList = [
			{ val: '1', desc: 'Personal use'},
			{ val: '2', desc: 'Yard move'},
			{ val: '3', desc: 'P/Y Cleared'}
		];
		this.type4CodeList = [
			{ val: '1', desc: '1st certification'},
			{ val: '2', desc: '2nd certification'},
			{ val: '3', desc: '3rd certification'},
			{ val: '4', desc: '4th certification'},
			{ val: '5', desc: '5th certification'},
			{ val: '6', desc: '6th certification'},
			{ val: '7', desc: '7th certification'},
			{ val: '8', desc: '8th certification'},
			{ val: '9', desc: '9th certification'}
		];
		this.type5CodeList = [
			{ val: '1', desc: 'Driver login'},
			{ val: '2', desc: 'Driver logout'}
		];
		this.type6CodeList = [
			{ val: '1', desc: 'Engine power-up'},
			{ val: '2', desc: 'Engine power-up red prec'},
			{ val: '3', desc: 'Engine shutdown'},
			{ val: '4', desc: 'Engine shutdown red prec'}
		];
		this.type7CodeList = [
			{ val: '1', desc: 'Malfunction'},
			{ val: '2', desc: 'Malfunction cleared'},
			{ val: '3', desc: 'DDE'},
			{ val: '4', desc: 'DDE cleared'}
		];
	}

	editEldEvent() {
		this.eldEventEdited.id = new Date().getTime();
		this.patchEldEventEditFormData();
		this.eldEventEdited.version = this.eldEventSelected.version + 1;
		this.eldEventEdited.status = "1";
		this.doneClicked.emit(this.eldEventEdited);
		this.activeModal.close();
	}

	patchEldEventEditFormData() {
		if (this.eldEventEditForm.value.type)
			this.eldEventEdited.type = this.eldEventEditForm.value.type;
		if (this.eldEventEditForm.value.code)
			this.eldEventEdited.code = this.eldEventEditForm.value.code;
		if (this.eldEventEditForm.value.status)
			this.eldEventEdited.status = this.eldEventEditForm.value.status;
		if (this.eldEventEditForm.value.origin)
			this.eldEventEdited.origin = this.eldEventEditForm.value.origin;
		if (this.eldEventEditForm.value.location)
			this.eldEventEdited.location = this.eldEventEditForm.value.location;
		if (this.eldEventEditForm.value.vehicleMiles)
			this.eldEventEdited.vehicleMiles = this.eldEventEditForm.value.vehicleMiles;
		if (this.eldEventEditForm.value.engineHours)
			this.eldEventEdited.engineHours = this.eldEventEditForm.value.engineHours;
		if (this.eldEventEditForm.value.comment)
			this.eldEventEdited.comment = this.eldEventEditForm.value.comment;
	}

}

