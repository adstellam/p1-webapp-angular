import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { EldEvent } from '../../interfaces';


@Component({
	selector: 'app-eld-record-rods',
	templateUrl: './eld-record-rods.component.html',
	styleUrls: ['./eld-record-rods.component.css']
})
export class EldRecordRodsComponent implements OnInit {

	@Input() cid: string;
	@Input() driverId: string;
	@Input() eldRecordDate: string;
	@Input() eldEventSeqMap: Map<string, EldEvent[]>;
	@Output() showOtherEldRecordPartClicked: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
		
	}

	switchTo(part: string) {
		this.showOtherEldRecordPartClicked.emit(part);
	}

}
