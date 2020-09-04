import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CubejsClientModule } from '@cubejs-client/ngx';
import { ChartsModule } from 'ng2-charts';
import { DataManagementModule } from '../data-management/data-management.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceLineComponent } from './device-line/device-line.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { MapComponent } from './map/map.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChartComponent } from './chart/chart.component';
import { LiveVideoComponent } from './live-video/live-video.component';
import { ArchiveVideoComponent } from './archive-video/archive-video.component';
import { DeviceDetailComponent } from '../data-management/device-management-modal/device-detail/device-detail.component';
import { VehicleDetailComponent } from '../data-management/vehicle-management-modal/vehicle-detail/vehicle-detail.component';
import { DriverDetailComponent } from '../data-management/driver-management-modal/driver-detail/driver-detail.component';
import { environment } from '../../environments/environment';

export function tokenGetter() {
    return localStorage.getItem('CubejsToken');
}

@NgModule({
 	imports: [
        CommonModule,  
        ReactiveFormsModule,     
        NgbModule,
        AgmCoreModule.forRoot({
            apiKey: `${environment.googleMapApiKey}`
        }),
        CubejsClientModule.forRoot({
            token: tokenGetter,
            options: {
                apiUrl: `${environment.cubejsApiUrl}/cubejs-api/v1`
            }
        }),
        ChartsModule,
        DataManagementModule
    ],
    declarations: [
        DashboardComponent, 
        DeviceLineComponent,
        GeolocationComponent,
        MapComponent,
        AnalyticsComponent,
        ChartComponent,
        LiveVideoComponent,
        ArchiveVideoComponent
    ],
    exports: [
        MapComponent
    ],
    entryComponents: [
		DeviceDetailComponent, 
        VehicleDetailComponent, 
        DriverDetailComponent
    ]
})
export class VedasMonitorModule { }
