import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import { SysopHomeComponent } from './sysop-home/sysop-home.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

import { DashboardComponent } from './vedas-monitor/dashboard/dashboard.component';
import { GeolocationComponent } from './vedas-monitor/geolocation/geolocation.component';
import { AnalyticsComponent } from './vedas-monitor/analytics/analytics.component';
import { LiveVideoComponent } from './vedas-monitor/live-video/live-video.component';
import { ArchiveVideoComponent } from './vedas-monitor/archive-video/archive-video.component';
import { VehicleTrackingComponent } from './tracking-tasks/vehicle-tracking/vehicle-tracking.component';
import { AssetTrackingComponent } from './tracking-tasks/asset-tracking/asset-tracking.component';
import { RouteOptimizationComponent } from './tracking-tasks/route-optimization/route-optimization.component';
import { EldRecordManagementComponent } from './eld-compliance/eld-record-management/eld-record-management.component';
import { EldReportSubmissionComponent } from './eld-compliance/eld-report-submission/eld-report-submission.component';
import { VedasUserManagementComponent } from './data-management/vedas-user-management/vedas-user-management.component';
import { DriverInputComponent } from './admin-tasks/driver-input/driver-input.component';
import { AssetLoadingComponent } from './admin-tasks/asset-loading/asset-loading.component';
import { VedasSetupComponent } from './admin-tasks/vedas-setup/vedas-setup.component';
import { DeviceManagementComponent } from './data-management/device-management/device-management.component';
import { VehicleManagementComponent } from './data-management/vehicle-management/vehicle-management.component';
import { DriverManagementComponent } from './data-management/driver-management/driver-management.component';
import { CustomerManagementComponent } from './data-management/customer-management/customer-management.component';
import { AssetManagementComponent } from './data-management/asset-management/asset-management.component';

const routes: Routes = [
	{ 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'customer-home/:cid', 
        component: CustomerHomeComponent, 
        children: [
            {   
                path: 'vedas-monitor/:did/geolocation',
                component: GeolocationComponent
            },
            {
                path: 'vedas-monitor/:did/analytics',
                component: AnalyticsComponent
            },
            {
                path: 'vedas-monitor/:did/live-video',
                component: LiveVideoComponent
            },
            {
                path: 'vedas-monitor/:did/archive-video',
                component: ArchiveVideoComponent
            },
            {
                path: 'vedas-monitor',
                component: DashboardComponent
            },
            {
                path: 'vehicle-tracking',
                component: VehicleTrackingComponent
            },
            {
                path: 'asset-tracking',
                component: AssetTrackingComponent
            },
            {
                path: 'route-optimization',
                component: RouteOptimizationComponent
            },
            {
                path: 'eld-record-management',
                component: EldRecordManagementComponent
            },
            {
                path: 'eld-report-submission',
                component: EldReportSubmissionComponent
            },
            {
                path: 'driver-input',
                component: DriverInputComponent
            },
            {
                path: 'asset-loading',
                component: AssetLoadingComponent
            },
            {
                path: 'vedas-setup',
                component: VedasSetupComponent
            },
            {
                path: 'vedas-user-management',
                component: VedasUserManagementComponent
            },
            {
                path: 'device-management',
                component: DeviceManagementComponent
            },
            {
                path: 'vehicle-management',
                component: VehicleManagementComponent
            },
            {
                path: 'driver-management',
                component: DriverManagementComponent
            },
            {
                path: 'asset-management',
                component: AssetManagementComponent
            },
            {
                path: 'customer-management',
                component: CustomerManagementComponent
            },
            {
                path: '',
                component: BackgroundImageComponent
            }
        ]
    },
    {
        path: 'driver-home/:eid', 
        component: DriverHomeComponent, 
        children: [

        ]
    },
    {
        path: 'sysop-home/:sid', 
        component: SysopHomeComponent, 
        children: [

        ]
    },
    { 
 		path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
 	},
    { 
        path: '**', 
        component: PageNotFoundComponent 
    }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes, { enableTracing: true }) 
  ],
  exports: [ 
    RouterModule 
  ]
})
export class AppRoutingModule { }
