import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

import { ChartComponent } from '../chart/chart.component';


@Component({
	selector: 'app-analytics',
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

	cid: string;
	deviceId: string;
	vehicleDesc: string;
	driverName: string;
	chartSelected: string[] = [];
	chartSelectionForm: FormGroup;
	chartsFormArray: FormArray;
	sensitivitySettingForm: FormGroup;
	aecThreshold: number;
	ihpThreshold: number;
	dlaThreshold: number;
	queryAec: object;
	queryIhp: object;
	queryDla: object;
	querySpd: object;

	constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

	ngOnInit() {
		this.cid = this.route.snapshot.parent.paramMap.get('cid');
		this.deviceId = this.route.snapshot.paramMap.get('did');
		this.vehicleDesc = this.route.snapshot.paramMap.get('vehicleDesc');
        this.driverName = this.route.snapshot.paramMap.get('driverName');
        this.chartSelectionForm = this.fb.group({
        	charts: this.fb.array([
        		new FormControl('aec'),
        		new FormControl('ihp'),
        		new FormControl('dla'),
        		new FormControl('spd')
        	])
        });
        this.chartsFormArray = (this.chartSelectionForm.controls.charts as FormArray);
		this.sensitivitySettingForm = this.fb.group({
        	aec: [''],
        	ihp: [''],
        	dla: ['']
        });
        this.queryAec = {
        	measures: [
                'VedasMetrics.aecCount'
            ],
            timeDimensions: [
                {
                    dimension: 'VedasMetrics.ts',
                    dateRange: `from 60 minutes ago to now`,
                    granularity: 'second'
                }
            ],
            renewQuery: true
        };
		this.queryIhp = {
			measures: [
                'VedasMetrics.ihpCount'
            ],
            timeDimensions: [
                {
                    dimension: 'VedasMetrics.ts',
                    dateRange: `from 60 minutes ago to now`,
                    granularity: 'second'
                }
            ],
            renewQuery: true
		};
		this.queryDla = {
			measures: [
                'VedasMetrics.dlaCount'
            ],
            timeDimensions: [
                {
                    dimension: 'VedasMetrics.ts',
                    dateRange: `from 60 minutes ago to now`,
                    granularity: 'second'
                }
            ],
            renewQuery: true
		};
		this.querySpd = {
			measures: [
                'VedasMetrics.spdAvg'
            ],
            timeDimensions: [
                {
                    dimension: 'VedasMetrics.ts',
                    dateRange: `from 60 minutes ago to now`,
                    granularity: 'second'
                }
            ],
            renewQuery: true
		};
	}

	setChartsFormArray(chart: string, isChecked: boolean) {
		if (isChecked) {
			this.chartsFormArray.push(new FormControl(chart));
		} else {
			const idx = this.chartsFormArray.controls.findIndex(x => x.value === chart);
			this.chartsFormArray.removeAt(idx);
		}
	}

	onChartSelectionSubmitted() {
		this.chartSelected = this.chartsFormArray.controls.map(x => x.value);
	}

	onSensitivitySettingFormSubmitted() {
		this.aecThreshold = this.sensitivitySettingForm.value.aec;
		this.ihpThreshold = this.sensitivitySettingForm.value.ihp;
		this.dlaThreshold = this.sensitivitySettingForm.value.dla;
	}


}
