import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DriverInputComponent } from './driver-input/driver-input.component';
import { AssetLoadingComponent } from './asset-loading/asset-loading.component';
import { VedasSetupComponent } from './vedas-setup/vedas-setup.component';
import { DeviceSelectComponent } from './admin-tasks-modal/device-select/device-select.component';
import { DeviceSelectCodriverComponent } from './admin-tasks-modal/device-select-codriver/device-select-codriver.component';
import { DutyStatusSelectComponent } from './admin-tasks-modal/duty-status-select/duty-status-select.component';
import { IntentIndicationSelectComponent } from './admin-tasks-modal/intent-indication-select/intent-indication-select.component';
import { ShippingDocListComponent } from './admin-tasks-modal/shipping-doc-list/shipping-doc-list.component';
import { VehicleSelectAssetComponent } from './admin-tasks-modal/vehicle-select-asset/vehicle-select-asset.component';
import { VehicleSelectVedasComponent } from './admin-tasks-modal/vehicle-select-vedas/vehicle-select-vedas.component';


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgbModule
	],
	declarations: [
		DriverInputComponent,
		AssetLoadingComponent,
		VedasSetupComponent,
		DeviceSelectComponent,
		DeviceSelectCodriverComponent,
		DutyStatusSelectComponent,
		IntentIndicationSelectComponent,
		ShippingDocListComponent,
		VehicleSelectAssetComponent,
		VehicleSelectVedasComponent
	],
	entryComponents: [
		DeviceSelectComponent,
		DeviceSelectCodriverComponent,
		DutyStatusSelectComponent,
		IntentIndicationSelectComponent,
		ShippingDocListComponent,
		VehicleSelectAssetComponent,
		VehicleSelectVedasComponent
	]
})
export class AdminTasksModule { }
