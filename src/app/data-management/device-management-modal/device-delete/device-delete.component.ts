import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Device, DeviceSeqNumber } from '../../../interfaces';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-device-delete',
    templateUrl: './device-delete.component.html',
    styleUrls: ['./device-delete.component.css']
})
export class DeviceDeleteComponent implements OnInit {

    @Input() device: Device;
    deviceDeleted: Device;
    uid: string;
    
	constructor(private router: Router, private http: HttpClient, public activeModal: NgbActiveModal) {}

  	ngOnInit() {
       
  	}

  	deleteDevice() {
        const update = {
            editedAt: new Date(),
            editedBy: localStorage.getItem('UserId'),
            active: false
        };
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        this.http.patch<Device>(`${environment.apiUrl}/devices/${this.device.id}`, update, { headers })
            .subscribe(device => {
                this.http.delete<DeviceSeqNumber>(`${environment.apiUrl}/deviceSeqNumbers/${device.id}`)
                    .subscribe(deviceSeqNumber => {}); 
            });
    	this.activeModal.close();
        setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                    this.router.navigate(['/customer-home', this.device.cid, 'device-management']);
                }); 
        }, 1000);
    }

}
