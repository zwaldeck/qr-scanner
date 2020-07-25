import {Component, Input, OnInit} from '@angular/core';
import {QR} from '../../shared/model/qr';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-create-step3',
    templateUrl: './create-step3.component.html',
    styleUrls: ['./create-step3.component.scss'],
})
export class CreateStep3Component implements OnInit {

    @Input() qr: QR;

    width: number;

    constructor(private platform: Platform) {
    }

    ngOnInit() {
        this.width = this.platform.width();
    }

}
