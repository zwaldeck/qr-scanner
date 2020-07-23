import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'details/:id', loadChildren: () => import('./qr-details/qr-details.module').then(m => m.QrDetailsModule)},
    {path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
