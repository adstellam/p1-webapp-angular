import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '../../../interfaces';

@Component({
    selector: 'app-asset-detail',
    templateUrl: './asset-detail.component.html',
    styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {

    @Input() asset: Asset;
    
    constructor() { }
    
    ngOnInit() {
        
    }

}