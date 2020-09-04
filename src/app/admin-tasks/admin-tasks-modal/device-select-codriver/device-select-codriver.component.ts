import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Device } from '../../../interfaces';


@Component({
	selector: 'app-device-select-codriver',
	templateUrl: './device-select-codriver.component.html',
	styleUrls: ['./device-select-codriver.component.css']
})
export class DeviceSelectCodriverComponent implements OnInit {

	@Input() deviceMap: Map<string, Device>;
	@Output() deviceSelected: EventEmitter<string> = new EventEmitter<string>();
	deviceIdFormControl: FormControl = new FormControl('');

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
		
	}

	onDeviceSelected(deviceId: string) {
		this.deviceSelected.emit(deviceId);
		this.activeModal.close();
	}

}
