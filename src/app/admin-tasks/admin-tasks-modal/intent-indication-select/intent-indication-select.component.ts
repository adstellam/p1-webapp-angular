import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 


@Component({
	selector: 'app-intent-indication-select',
	templateUrl: './intent-indication-select.component.html',
	styleUrls: ['./intent-indication-select.component.css']
})
export class IntentIndicationSelectComponent implements OnInit {

  	@Input() currentIntentIndication: string; 
	@Output() intentIndicationSelected: EventEmitter<string> = new EventEmitter<string>();
	intentIndicationFormControl: FormControl = new FormControl('');
	intentIndicationList: object[];

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
		this.intentIndicationList = [
			{ val: '1', desc: 'Personal use'},
			{ val: '2', desc: 'Yard move'},
			{ val: '3', desc: 'No intent indicated'}
		];
	}

	onIntentIndicationSelected(intentIndication: string) {
		this.intentIndicationSelected.emit(intentIndication);
		this.activeModal.close();
	}

}
