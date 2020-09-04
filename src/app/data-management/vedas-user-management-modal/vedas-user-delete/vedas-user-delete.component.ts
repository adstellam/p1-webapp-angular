import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VedasUser, Driver, DriverStatus } from '../../../interfaces';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-vedas-user-delete',
	templateUrl: './vedas-user-delete.component.html',
	styleUrls: ['./vedas-user-delete.component.css']
})
export class VedasUserDeleteComponent implements OnInit {

	@Input() vedasUser: VedasUser
    vedasUserDeleted: VedasUser;
    uid: string;

	constructor(private router: Router, private http: HttpClient, public activeModal: NgbActiveModal) {}

  	ngOnInit() {
        
  	}

  	deleteVedasUser() {
        const update = {
            editedAt: new Date(),
            editedBy: localStorage.getItem('UserId'),
            active: false
        };
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        this.http.patch<VedasUser>(`${environment.apiUrl}/vedasUsers/${this.vedasUser.username}`, update, { headers })
            .subscribe(vedasUser => {}); 
        if (this.vedasUser.role == 'driver') { 
            this.http.patch<Driver>(`${environment.apiUrl}/drivers/${this.vedasUser.username}`, update, { headers })
                .subscribe(driver => {}); 
            this.http.delete<DriverStatus>(`${environment.apiUrl}/driverStatuses/${this.vedasUser.username}`)
                .subscribe(driverStatus => {}); 
        }
        this.activeModal.close();
        setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                    this.router.navigate(['/customer-home', this.vedasUser.cid, 'vedas-user-management']);
                });
        }, 1000);
    }

}
