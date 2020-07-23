import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileSaverModule} from 'ngx-filesaver';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FileSaverModule
    ],
    exports: [
        FileSaverModule
    ]
})
export class SharedModule {
}
