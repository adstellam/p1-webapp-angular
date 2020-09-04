import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Vehicle } from '../../../interfaces';
import { environment } from '../../../../environments/environment';


@Component({
	selector: 'app-vehicle-delete',
	templateUrl: './vehicle-delete.component.html',
	styleUrls: ['./vehicle-delete.component.css']
})
export class VehicleDeleteComponent implements OnInit {

	@Input() vehicle: Vehicle;
    vehicleDeleted: Vehicle;
    uid: string;

	constructor(private router: Router, private http: HttpClient, public activeModal: NgbActiveModal) {}

  	ngOnInit() {
        
  	}

  	deleteVehicle() {              
        const update = {
            editedAt: new Date(),
            editedBy: localStorage.getItem('UserId'),
            active: false
        };
        const params = new HttpParams()
            .set("cid", this.vehicle.cid);
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        this.http.patch<Vehicle>(`${environment.apiUrl}/vehicles/${this.vehicle.id}`, update, { params, headers })
            .subscribe(vehicle => {});   
        this.activeModal.close();
        setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                   this.router.navigate(['/customer-home', this.vehicle.cid, 'vehicle-management']);
                });
        }, 1000);
    }

}
