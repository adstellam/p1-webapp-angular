import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Device } from '../../interfaces';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-archive-video',
	templateUrl: './archive-video.component.html',
	styleUrls: ['./archive-video.component.css']
})
export class ArchiveVideoComponent implements OnInit {

	deviceId: string;
    vehicleDesc: string;
    driverName: string;
    peripherals: string[];
	videoSelectionForm: FormGroup;
	videoFilename: string;

	constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient) { }

	ngOnInit() {
		this.deviceId = this.route.snapshot.paramMap.get('did');
        this.vehicleDesc = this.route.snapshot.paramMap.get('vehicleDesc');
        this.driverName = this.route.snapshot.paramMap.get('driverName');
        this.http.get<Device>(`${environment.apiUrl}/devices/${this.deviceId}`)
            .subscribe(device => {
                this.peripherals = device.optionalPeripheral;
            });
        this.videoSelectionForm = this.fb.group({
			video: [''],
			month: [''],
			day: [''],
			year: [''],
			hour: [''],
			min: [''],
			sec: ['']
		});
	}

	onVideoSelectionSubmitted() {
		this.videoFilename = `${environment.videoStoreUrl}`
								+ "/" + this.videoSelectionForm.value.video 
								+ "_20" + this.videoSelectionForm.value.year 
								+ this.videoSelectionForm.value.month 
								+ this.videoSelectionForm.value.day 
								+ "T" +this.videoSelectionForm.value.hour 
								+ this.videoSelectionForm.value.min 
								+ this.videoSelectionForm.value.sec;
	}

}
