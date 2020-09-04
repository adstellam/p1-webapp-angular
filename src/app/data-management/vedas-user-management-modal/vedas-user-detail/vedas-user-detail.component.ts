import { Component, OnInit, Input } from '@angular/core';
import { VedasUser } from '../../../interfaces';


@Component({
    selector: 'app-vedas-user-detail',
    templateUrl: './vedas-user-detail.component.html',
    styleUrls: ['./vedas-user-detail.component.css']
})
export class VedasUserDetailComponent implements OnInit {

    @Input() vedasUser: VedasUser;
    
    constructor() { }
    
    ngOnInit() {
        
    }

}