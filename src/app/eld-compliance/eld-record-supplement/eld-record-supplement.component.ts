import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { EldEvent } from '../../interfaces';


@Component({
	selector: 'app-eld-record-supplement',
	templateUrl: './eld-record-supplement.component.html',
	styleUrls: ['./eld-record-supplement.component.css']
})
export class EldRecordSupplementComponent implements OnInit {

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
