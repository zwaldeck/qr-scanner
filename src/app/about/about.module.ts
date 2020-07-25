import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AboutComponent} from './about.component';
import {AboutRoutingModule} from './about-routing.module';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, AboutRoutingModule],
    declarations: [AboutComponent],
    exports: [AboutComponent]
})
export class AboutComponentModule {
}
