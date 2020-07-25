import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileSaverModule} from 'ngx-filesaver';
import {QrListComponent} from './components/qr-list/qr-list.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {QrListSortButtonComponent} from './components/qr-list-sort-button/qr-list-sort-button.component';

@NgModule({
    declarations: [
        QrListComponent,
        QrListSortButtonComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FileSaverModule
    ],
    exports: [
        FileSaverModule,
        QrListComponent,
        QrListSortButtonComponent
    ]
})
export class SharedModule {
}
