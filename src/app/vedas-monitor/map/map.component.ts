import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
//import { LatLngLiteral } from '@agm/core';

import { Rtd, LatLng, JwtObj } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @Input() deviceId: string;
    @Input() cid: string;
    @Input() pathDuration: number;
    eventSource: EventSource;
    lat: number = 37.36395;
    lng: number = -121.92894;
    speed: number = null;
    location: string = null;
    zoom: number = 10;
    minZoom: number = 8;
    maxZoom: number = 15;
    path: LatLng[] = [];
    pathVisible: boolean = true;

    constructor(private router: Router, private http: HttpClient, private zone: NgZone) { }

    ngOnInit() {
        this.eventSource = new EventSource(`${environment.sseUrl}/rtd/${this.deviceId}`);
        this.eventSource.onmessage = (msg) => { 
            this.zone.run(() => {
                if (msg.data) {
                    const rtd: Rtd = JSON.parse(msg.data);
                    this.lat = rtd.lat;
                    this.lng = rtd.lng;
                    this.speed = rtd.spd;
                    this.location = rtd.loc;
                }
            });
        };
        this.eventSource.onerror = (err) => {
            console.log("EventSource returns an error: ", err);
        };
        const params = new HttpParams()
            .set('pathDuration', this.pathDuration.toString());
        this.http.get<LatLng[]>(`${environment.apiUrl}/pathCoordinates/${this.deviceId}`, { params })
            .subscribe(coordinates => {
                for (let latlng of coordinates) 
                    this.path.push(latlng);
            });
        /*
        const query = {
            measures: [
                'VedasMetrics.lat',
                'VedasMetrics.lng', 
                'VedasMetrics.speed'
            ],
            filters: [
                {
                    member: 'VedasMetrics.deviceId',
                    operator: 'equals',
                    values: [this.deviceId]
                }
            ],
            timeDimensions: [
                {
                    dimension: 'VedasMetrics.t',
                    dateRange: `from ${this.pathDuration} hours ago to now`,
                    granularity: 'second'
                }
            ],
            order: {
                'VedasMetrics.t': 'desc'
            }
        };
        this.cubejsSubscription = this.cubejs.load(query).subscribe(
            resultSet => {
                const latArray: number[] = resultSet.chartPivot().map(obj => obj['VedasMetrics.lat']);
                const lngArray: number[] = resultSet.chartPivot().map(obj => obj['VedasMetrics.lng']);
                const spdArray: number[] = resultSet.chartPivot().map(obj => obj['VedasMetrics.speed']);
                for (let i = 0; i < latArray.length; i++) 
                    this.path.push({ lat: latArray[i], lng: lngArray[i]});
            },
            err => {
                console.log("cubeje load() ", err);
            }
        );*/
    }

    ngOnDestroy() {
        this.eventSource.close();
    }

    zoomIn() {
        if (this.zoom < this.maxZoom) this.zoom++;
    }

    zoomOut() {
        if (this.zoom > this.minZoom) this.zoom--;
    }

    toggleShowPath() {
        this.pathVisible = !this.pathVisible;
    }

    close() {
        this.router.navigate(['/customer-home', this.cid, 'vedas-monitor']);
    }

}
