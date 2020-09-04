import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Driver, Device } from '../../../interfaces';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-driver-detail',
    templateUrl: './driver-detail.component.html',
    styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {

    @Input() driver: Driver | null;
    deviceMap: Map<string, Device> = new Map<string, Device>();
    deviceIdMatched: string = null;
    vehicleIdMatched: string = null;
    pictureFilePath: string = null;
    
    constructor(private http: HttpClient) { }
    
    ngOnInit() {
        if (this.driver) {
            const params = new HttpParams()
                .set('cid', this.driver.cid)
                .set('active', 'true');
            this.http.get<Device[]>(`${environment.apiUrl}/devices`, { params })
                .subscribe(devices => {
                    for (let device of devices)
                        this.deviceMap.set(device.id, device);
                    for (let deviceId of this.deviceMap.keys()) 
                        if (this.deviceMap.get(deviceId).driverId == this.driver.id) {
                            this.deviceIdMatched = deviceId;
                            this.vehicleIdMatched = this.deviceMap.get(deviceId).vehicleId;
                        };
                });
            if (this.driver.pictureFileName) 
                this.pictureFilePath = `../../../../assets/customer/${this.driver.cid}/${this.driver.pictureFileName}`;
        } 
    }

}