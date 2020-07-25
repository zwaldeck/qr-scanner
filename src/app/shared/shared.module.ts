import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileSaverModule} from 'ngx-filesaver';
import {QrListComponent} from './components/qr-list/qr-list.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {QrListSortButtonComponent} from './components/qr-list-sort-button/qr-list-sort-button.component';
import {ShowQRCodeModalComponent} from './components/show-qrcode-modal/show-qrcode-modal.component';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
    declarations: [
        QrListComponent,
        QrListSortButtonComponent,
        ShowQRCodeModalComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FileSaverModule,
        QRCodeModule,
    ],
    exports: [
        FileSaverModule,
        QrListComponent,
        QrListSortButtonComponent,
        ShowQRCodeModalComponent
    ]
})
export class SharedModule {
}
