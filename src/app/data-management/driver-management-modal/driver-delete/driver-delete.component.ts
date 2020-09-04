import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Driver, DriverStatus, VedasUser } from '../../../interfaces';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-driver-delete',
	templateUrl: './driver-delete.component.html',
	styleUrls: ['./driver-delete.component.css']
})
export class DriverDeleteComponent implements OnInit {

	@Input() driver: Driver;
    driverDeleted: Driver;
    uid: string;

	constructor(private router: Router, private http: HttpClient, public activeModal: NgbActiveModal) {}

  	ngOnInit() {
    
  	}

  	deleteDriver() {
        const update = {
            editedAt: new Date(),
            editedBy: localStorage.getItem('UserId'),
            active: false
        };
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        this.http.patch<Driver>(`${environment.apiUrl}/drivers/${this.driver.id}`, update, { headers })
            .subscribe(driver => {});  
        this.http.patch<VedasUser>(`${environment.apiUrl}/vedasUsers/${this.driver.id}`, update, { headers })
            .subscribe(vedasUser => {}); 
        this.http.delete<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.driver.id}`)
            .subscribe(driverStatus => {});
        this.activeModal.close();
        setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                    this.router.navigate(['/customer-home', this.driver.cid, 'driver-management']);
                });
        }, 1000);
    }

}
