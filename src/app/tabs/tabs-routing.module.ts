import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'scanner',
        loadChildren: () => import('../scanner/scanner.module').then(m => m.ScannerModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then(m => m.HistoryModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesModule)
      },
      {
        path: 'create-qr',
        loadChildren: () => import('../create/create.module').then(m => m.CreateComponentModule)
      },
      {
        path: 'saved',
        loadChildren: () => import('../saved/saved.module').then(m => m.SavedComponentModule)
      },
      {path: 'details/:id', loadChildren: () => import('../qr-details/qr-details.module').then(m => m.QrDetailsModule)},
      {path: 'about', loadChildren: () => import('../about/about.module').then(m => m.AboutComponentModule)},
      {
        path: '',
        redirectTo: '/tabs/scanner',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/scanner',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
