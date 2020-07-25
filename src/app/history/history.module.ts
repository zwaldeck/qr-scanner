import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HistoryComponent} from './history.component';
import {HistoryRoutingModule} from './history-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SharedModule,
        HistoryRoutingModule
    ],
    declarations: [HistoryComponent]
})
export class HistoryModule {
}
