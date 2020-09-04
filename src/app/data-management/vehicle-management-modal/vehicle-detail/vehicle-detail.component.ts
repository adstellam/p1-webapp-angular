import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../../interfaces';


@Component({
	selector: 'app-vehicle-detail',
	templateUrl: './vehicle-detail.component.html',
	styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

	@Input() vehicle: Vehicle | null;
 	
	constructor() { }
	
	ngOnInit() {
		
	}

}