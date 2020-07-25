import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FavoritesRoutingModule} from './favorites-routing.module';
import {FavoritesComponent} from './favorites.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [
        FavoritesComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        FavoritesRoutingModule,
    ]
})
export class FavoritesModule {
}
