import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Vehicle } from '../../../interfaces';


@Component({
	selector: 'app-vehicle-select-vedas',
	templateUrl: './vehicle-select-vedas.component.html',
	styleUrls: ['./vehicle-select-vedas.component.css']
})
export class VehicleSelectVedasComponent implements OnInit {

 	@Input() vehicleMap: Map<string, Vehicle>; 
	@Output() vehicleSelected: EventEmitter<string> = new EventEmitter<string>();
	vehicleIdFormControl: FormControl = new FormControl('');

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
		
	}

	onVehicleSelected(vehicleId: string) {
		this.vehicleSelected.emit(vehicleId);
		this.activeModal.close();
	}

}
