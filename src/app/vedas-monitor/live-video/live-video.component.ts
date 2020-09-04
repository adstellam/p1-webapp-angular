import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Device, Vehicle, Driver, Rtd } from '../../interfaces';
import { environment } from '../../../environments/environment';


declare const JSMpeg: any;


@Component({
    selector: 'app-live-video',
    templateUrl: './live-video.component.html',
    styleUrls: ['./live-video.component.css']
})
export class LiveVideoComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('canvasFwd', { static: true }) canvasFwd: ElementRef;
	@ViewChild('canvasCab', { static: true }) canvasCab: ElementRef;
	@ViewChild('canvasAux1', { static: true }) canvasAux1: ElementRef;
    @ViewChild('canvasAux2', { static: true }) canvasAux2: ElementRef;
    @ViewChild('canvasAux3', { static: true }) canvasAux3: ElementRef;
    deviceId: string;
    vehicleDesc: string;
    driverName: string;
    peripherals: string[];
    rtspHost: string;
    videoSelected: string[] = [];
    videosFormArray: FormArray;
    videoSelectionForm: FormGroup;
    playerFwd: any;
    playerCab: any;
    playerAux1: any;
    playerAux2: any;
    playerAux3: any;
    eventSource: EventSource;
    rtd: Rtd;

    
    constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private zone: NgZone) { }

    ngOnInit() {
    	this.deviceId = this.route.snapshot.paramMap.get('did');
        this.vehicleDesc = this.route.snapshot.paramMap.get('vehicleDesc');
        this.driverName = this.route.snapshot.paramMap.get('driverName');
        this.http.get<Device>(`${environment.apiUrl}/devices/${this.deviceId}`)
            .subscribe(device => {
                this.peripherals = device.optionalPeripheral;
                this.rtspHost = device.ipAddress.split('/')[0];
            });
        this.videoSelectionForm = this.fb.group({
            videos: this.fb.array([
                new FormControl('fwd'),
                new FormControl('cab')
            ])
        });
        this.videosFormArray = (this.videoSelectionForm.controls.videos as FormArray);  
        this.eventSource = new EventSource(`${environment.sseUrl}/rtd/${this.deviceId}`);
        this.eventSource.onmessage = (msg) => { 
            this.zone.run(() => {
                this.rtd = JSON.parse(msg.data);
            });
        }
            
    }

    setVideosFormArray(video: string, isChecked: boolean) {
        if (isChecked) {
            this.videosFormArray.push(new FormControl(video));
        } else {
            const idx = this.videosFormArray.controls.findIndex(x => x.value === video);
            this.videosFormArray.removeAt(idx);
        }
    }

    onVideoSelectionSubmitted() {
        this.videoSelected = this.videosFormArray.controls.map(x => x.value);
    }

    ngAfterViewInit() {
        try {
            if (this.videoSelected.includes('fwd'))
                this.playerFwd = new JSMpeg.Player(`${environment.mtsWssUrl}/fwd?rtspHost=${this.rtspHost}`, { canvas: this.canvasFwd.nativeElement, video: true, audio: false });
            if (this.videoSelected.includes('cab'))
                this.playerCab = new JSMpeg.Player(`${environment.mtsWssUrl}/cab?rtspHost=${this.rtspHost}`, { canvas: this.canvasCab.nativeElement, video: true, audio: false });
            if (this.videoSelected.includes('aux1'))
                this.playerAux1 = new JSMpeg.Player(`${environment.mtsWssUrl}/aux1?rtspHost=${this.rtspHost}`, { canvas: this.canvasAux1.nativeElement, video: true, audio: false });
            if (this.videoSelected.includes('aux2'))
                this.playerAux2 = new JSMpeg.Player(`${environment.mtsWssUrl}/aux2?rtspHost=${this.rtspHost}`, { canvas: this.canvasAux1.nativeElement, video: true, audio: false });
            if (this.videoSelected.includes('aux3'))
                this.playerAux3 = new JSMpeg.Player(`${environment.mtsWssUrl}/aux3?$rtspHost={this.rtspHost}`, { canvas: this.canvasAux1.nativeElement, video: true, audio: false });
        } catch(err) {
            console.log("JSMpeg.Player has thrown error: ", err.message);
        }
    }

    ngOnDestroy() {
        this.eventSource.close();
        //this.devDatSubject.unsubscribe();
    }

    play(video: string) {
        switch (video) {
            case "fwd": 
                if (this.playerFwd) this.playerFwd.play();
                break;
            case "cab": 
                if (this.playerCab) this.playerCab.play();
                break;
            case "aux1": 
                if (this.playerAux1) this.playerAux1.play();
                break;
            case "aux2": 
                if (this.playerAux2) this.playerAux2.play();
                break;
            case "aux3": 
                if (this.playerAux3) this.playerAux3.play();
                break;
        }
    }

    pause(video: string) {
        switch (video) {
            case "fwd": 
                if (this.playerFwd) this.playerFwd.pause();
                break;
            case "cab": 
                if (this.playerCab) this.playerCab.pause();
                break;
            case "aux1": 
                if (this.playerAux1) this.playerAux1.pause();
                break;
            case "aux2": 
                if (this.playerAux2) this.playerAux2.pause();
                break;
            case "aux3": 
                if (this.playerAux3) this.playerAux3.pause();
                break;
        }
    }

    stop(video: string) {
        switch (video) {
            case "fwd": 
                if (this.playerFwd) this.playerFwd.stop();
                break;
            case "cab": 
                if (this.playerCab) this.playerCab.stop();
                break;
            case "aux1": 
                if (this.playerAux1) this.playerAux1.stop();
                break;
            case "aux2": 
                if (this.playerAux2) this.playerAux2.stop();
                break;
            case "aux3": 
                if (this.playerAux3) this.playerAux3.stop();
                break;
        }
    }
}
