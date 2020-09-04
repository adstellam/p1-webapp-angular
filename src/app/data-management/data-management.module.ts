import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VedasUserManagementComponent } from './vedas-user-management/vedas-user-management.component';
import { VedasUserDetailComponent } from './vedas-user-management-modal/vedas-user-detail/vedas-user-detail.component';
import { VedasUserEditComponent } from './vedas-user-management-modal/vedas-user-edit/vedas-user-edit.component';
import { VedasUserDeleteComponent } from './vedas-user-management-modal/vedas-user-delete/vedas-user-delete.component';
import { VedasUserAddComponent } from './vedas-user-management-modal/vedas-user-add/vedas-user-add.component';
import { DeviceManagementComponent } from './device-management/device-management.component';
import { DeviceDetailComponent } from './device-management-modal/device-detail/device-detail.component';
import { DeviceEditComponent } from './device-management-modal/device-edit/device-edit.component';
import { DeviceDeleteComponent } from './device-management-modal/device-delete/device-delete.component';
import { DeviceAddComponent } from './device-management-modal/device-add/device-add.component';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';
import { VehicleDetailComponent } from './vehicle-management-modal/vehicle-detail/vehicle-detail.component';
import { VehicleEditComponent } from './vehicle-management-modal/vehicle-edit/vehicle-edit.component';
import { VehicleDeleteComponent } from './vehicle-management-modal/vehicle-delete/vehicle-delete.component';
import { VehicleAddComponent } from './vehicle-management-modal/vehicle-add/vehicle-add.component';
import { DriverManagementComponent } from './driver-management/driver-management.component';
import { DriverDetailComponent } from './driver-management-modal/driver-detail/driver-detail.component';
import { DriverEditComponent } from './driver-management-modal/driver-edit/driver-edit.component';
import { DriverDeleteComponent } from './driver-management-modal/driver-delete/driver-delete.component';
import { DriverAddComponent } from './driver-management-modal/driver-add/driver-add.component';
import { AssetManagementComponent } from './asset-management/asset-management.component';
import { AssetDetailComponent } from './asset-management-modal/asset-detail/asset-detail.component';
import { AssetEditComponent } from './asset-management-modal/asset-edit/asset-edit.component';
import { AssetDeleteComponent } from './asset-management-modal/asset-delete/asset-delete.component';
import { AssetAddComponent } from './asset-management-modal/asset-add/asset-add.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { CustomerEditComponent } from './customer-management-modal/customer-edit/customer-edit.component';


@NgModule({
 	imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
       	VedasUserManagementComponent,
        VedasUserDetailComponent,
        VedasUserEditComponent,
        VedasUserDeleteComponent,
        VedasUserAddComponent,
        DeviceManagementComponent,
        DeviceDetailComponent,
       	DeviceEditComponent,
        DeviceDeleteComponent,
        DeviceAddComponent,
       	VehicleManagementComponent,
        VehicleDetailComponent,
        VehicleEditComponent,
        VehicleDeleteComponent,
        VehicleAddComponent,
        DriverManagementComponent,
        DriverDetailComponent,
        DriverEditComponent,
        DriverDeleteComponent,
        DriverAddComponent,
        CustomerManagementComponent,
        CustomerEditComponent,
        AssetManagementComponent,
        AssetDetailComponent,
        AssetEditComponent,
        AssetDeleteComponent,
        AssetAddComponent
    ],
    exports: [
		DeviceDetailComponent,
        VehicleDetailComponent,
        DriverDetailComponent
    ],
    entryComponents: [
        VedasUserDetailComponent,
        VedasUserEditComponent,
        VedasUserDeleteComponent,
        VedasUserAddComponent,
        DeviceDetailComponent,
        DeviceEditComponent,
        DeviceDeleteComponent,
        DeviceAddComponent,
        VehicleDetailComponent,
        VehicleEditComponent,
        VehicleDeleteComponent,
        VehicleAddComponent,
        DriverDetailComponent,
        DriverEditComponent,
        DriverDeleteComponent,
        DriverAddComponent,
        CustomerEditComponent,
        AssetDetailComponent,
        AssetEditComponent,
        AssetDeleteComponent,
        AssetAddComponent
    ]
})
export class DataManagementModule { }
