import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CubejsClient } from '@cubejs-client/ngx';
import { Subscription } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Label, Color } from 'ng2-charts';

import { JwtObj } from '../../interfaces';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

	@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective; 
	@Input() deviceId: string;
	@Input() chartType: string;
	@Input() title: string;
	@Input() query: object;
	cubejsSubscription: Subscription;
	chartLabels: Label[];
	chartDatasets: ChartDataSets[];
	chartColors: Color[];
	chartOptions: object; 
	//chartLegend
	//chartPlugins
	chartReady: boolean = false;

	constructor(private http: HttpClient, private cubejs: CubejsClient) { }

	ngOnInit() {
		this.chartColors = [

		];
		this.chartOptions = {
			responsive: true,
			scales: {

			}
		};
		if (!localStorage.getItem('CubejsToken'))
            this.http.get<JwtObj>(`${environment.cubejsApiUrl}/auth/cubejs-token/${this.deviceId}`)
                .subscribe(jwtObj => {
                    localStorage.setItem('CubejsToken', jwtObj.jwt);
                });
		this.cubejsSubscription = this.cubejs.load(this.query).subscribe(
			resultSet => {
				this.chartLabels = resultSet.chartPivot().map(({ x }) => x );
				this.chartDatasets = resultSet.seriesNames().map(({ key, title }) => (
					{ 
						label: title,
					  	data: resultSet.chartPivot().map(dataObj => dataObj[key]) 
					}
				));
				this.chartReady = true;
			},
			err => {
				console.log("cubeje load() ", err);
			}
		);
	}

	ngOnDestroy() {
        this.cubejsSubscription.unsubscribe();
    }

	onChartHovered() {

	}

	onChartClicked() {

	}

}
