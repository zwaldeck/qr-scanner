import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScannerComponent} from './scanner.component';
import {ScannerRoutingModule} from './scanner.routing.module';
import {IonicModule} from '@ionic/angular';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        ScannerComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ScannerRoutingModule,
        ZXingScannerModule,
        SharedModule
    ]
})
export class ScannerModule {
}
