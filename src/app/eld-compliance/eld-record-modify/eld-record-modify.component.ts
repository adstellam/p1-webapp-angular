import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators'

import { EldEventEditComponent } from '../eld-event-edit/eld-event-edit.component';
import { EldEvent, EldEventPair } from '../../interfaces';


@Component({
    selector: 'app-eld-record-modify',
    templateUrl: './eld-record-modify.component.html',
    styleUrls: ['./eld-record-modify.component.css']
})
export class EldRecordModifyComponent implements OnInit {

	@Input() cid: string;
	@Input() driverId: string;
	@Input() eldRecordDate: string;
	@Input() eldEventSeqMap: Map<string, EldEvent[]> = new Map<string, EldEvent[]>();
	@Output() commitClicked: EventEmitter<EldEventPair[]> = new EventEmitter<EldEventPair[]>();
    @Output() discardClicked: EventEmitter<string> = new EventEmitter<string>();
    modifiedEventSeqNumbers: number[] = [];
    preAndPostModEventPairs: EldEventPair[] = [];
    
 	constructor(private http: HttpClient, public modalService: NgbModal) { }

 	ngOnInit() {
       
    }

 	openEldEventEditModal(deviceId: string, eldEventSelected: EldEvent) {
 		const modalRef: NgbModalRef = this.modalService.open(EldEventEditComponent, { centered: true, backdrop: 'static', keyboard: false }); 
        modalRef.componentInstance.eldEventSelected = eldEventSelected;
        modalRef.componentInstance.doneClicked
        	.pipe(
                /* For updated event sequence display in the component's template; no effect on EldRecordManagementComponent */
                tap((eldEventModified: EldEvent) => {
                    let pos: number;
                    this.modifiedEventSeqNumbers.push(eldEventModified.seqNumber);
                    for (let i = 0; i < this.eldEventSeqMap.get(deviceId).length; i++) 
                        if (this.eldEventSeqMap.get(deviceId)[i].seqNumber == eldEventModified.seqNumber)
                            pos = i;  
                    this.eldEventSeqMap.get(deviceId).splice(pos, 1, eldEventModified);
                })
            )
            .subscribe((eldEventModified: EldEvent) => {
        		this.preAndPostModEventPairs.push({ pre: eldEventSelected, post: eldEventModified });
       		});
 	}

    commitModifications() {
        this.commitClicked.emit(this.preAndPostModEventPairs);
    }

    discardModifications() {
        this.discardClicked.emit('rods');
    }

}