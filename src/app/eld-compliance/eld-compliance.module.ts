import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EldRecordManagementComponent } from './eld-record-management/eld-record-management.component';
import { EldReportSubmissionComponent } from './eld-report-submission/eld-report-submission.component';
import { EldRecordHeaderComponent } from './eld-record-header/eld-record-header.component';
import { EldRecordRodsComponent } from './eld-record-rods/eld-record-rods.component';
import { EldRecordSupplementComponent } from './eld-record-supplement/eld-record-supplement.component';
import { EldRecordModifyComponent } from './eld-record-modify/eld-record-modify.component';
import { EldEventEditComponent } from './eld-event-edit/eld-event-edit.component';


@NgModule({ 	
  	imports: [
    	CommonModule,
    	ReactiveFormsModule,
    	HttpClientModule,
    	NgbModule
  	],
  	declarations: [
  		EldRecordManagementComponent,
  		EldReportSubmissionComponent,
  		EldRecordHeaderComponent,
  		EldRecordSupplementComponent,
  		EldRecordRodsComponent,
  		EldRecordModifyComponent,
  		EldEventEditComponent
  	],
    entryComponents: [
      EldEventEditComponent
    ]
})
export class EldComplianceModule { }
