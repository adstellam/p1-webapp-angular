import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthModule } from './auth/auth.module';
import { VedasMonitorModule } from './vedas-monitor/vedas-monitor.module';
import { TrackingTasksModule } from './tracking-tasks/tracking-tasks.module';
import { EldComplianceModule } from './eld-compliance/eld-compliance.module';
import { AdminTasksModule } from './admin-tasks/admin-tasks.module';
import { DataManagementModule } from './data-management/data-management.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import { SysopHomeComponent } from './sysop-home/sysop-home.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

import { HttpErrorInterceptorService } from './http-error-interceptor.service';
import { environment } from '../environments/environment';


export function tokenGetter() {
    return localStorage.getItem('Jwt');
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: [environment.jwtModuleWhitelist, 'localhost:22081'],
                blacklistedRoutes: []
            }
        }),
        NgbModule,
        AuthModule,
        VedasMonitorModule,
        TrackingTasksModule,
        EldComplianceModule,
        AdminTasksModule,
        DataManagementModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        CustomerHomeComponent,
        DriverHomeComponent,
        SysopHomeComponent,
        BackgroundImageComponent,
        PageNotFoundComponent,
        ComposeMessageComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true }
    ],
    bootstrap: [ 
        AppComponent
    ]
})
export class AppModule { }
