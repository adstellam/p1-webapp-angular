import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 


@Component({
	 selector: 'app-duty-status-select',
	 templateUrl: './duty-status-select.component.html',
	 styleUrls: ['./duty-status-select.component.css']
})
export class DutyStatusSelectComponent implements OnInit {

	@Input() currentDutyStatus: string; 
	@Output() dutyStatusSelected: EventEmitter<string> = new EventEmitter<string>();
	dutyStatusFormControl: FormControl = new FormControl('');
	dutyStatusList: object[];

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
		this.dutyStatusList = [
			{ val: '1', desc: 'Off-duty'},
			{ val: '2', desc: 'SB'},
			{ val: '3', desc: 'Driving'},
			{ val: '4', desc: 'On-duty not-driving'}
		];
	}

	onDutyStatusSelected(dutyStatus: string) {
		this.dutyStatusSelected.emit(dutyStatus);
		this.activeModal.close();
	}

}
