import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SavedComponent} from './saved.component';
import {SharedModule} from '../shared/shared.module';
import {SavedRoutingModule} from './saved-routing.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        SavedRoutingModule
    ],
    declarations: [SavedComponent],
    exports: [SavedComponent]
})
export class SavedComponentModule {
}
