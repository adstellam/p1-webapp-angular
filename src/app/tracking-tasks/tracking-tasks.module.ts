import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { VedasMonitorModule } from '../vedas-monitor/vedas-monitor.module';

import { VehicleTrackingComponent } from './vehicle-tracking/vehicle-tracking.component';
import { AssetTrackingComponent } from './asset-tracking/asset-tracking.component';
import { RouteOptimizationComponent } from './route-optimization/route-optimization.component';
import { environment } from '../../environments/environment';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: `${environment.googleMapApiKey}`
        }),
        VedasMonitorModule
    ],
    declarations: [
    	VehicleTrackingComponent, 
    	AssetTrackingComponent, 
    	RouteOptimizationComponent
    ]
})
export class TrackingTasksModule { }
