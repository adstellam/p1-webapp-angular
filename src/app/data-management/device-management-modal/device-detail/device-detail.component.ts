import { Component, OnInit, Input } from '@angular/core';
import { Device, Vehicle, Driver } from '../../../interfaces';


@Component({
	selector: 'app-device-detail',
	templateUrl: './device-detail.component.html',
	styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

	@Input() device: Device;
	@Input() vehicle: Vehicle | null;
	@Input() driver: Driver | null;
	@Input() codriver: Driver | null;
	
	constructor() { }
	
	ngOnInit() {
		
	}

}