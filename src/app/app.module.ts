import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';


// Ahead of time compiles requires an exported function for factories
export function migrationFactory() {
    return {
        1: (db, transaction) => {
            // const store = transaction.objectStore('people');
            // store.createIndex('country', 'country', { unique: false });
        },
        4: (db, transaction) => {
            const store = transaction.objectStore('codes');
            store.createIndex('dataType', 'dataType', { unique: false });
        },
        5: (db, transaction) => {
            const store = transaction.objectStore('codes');
            store.createIndex('favorite', 'favorite', { unique: false });
        }
    };
}

const dbConfig: DBConfig = {
    name: 'QrScanner',
    version: 5,
    objectStoresMeta: [{
        store: 'codes',
        storeConfig: {keyPath: 'id', autoIncrement: true},
        storeSchema: [
            {name: 'type', keypath: 'type', options: {unique: false}},
            {name: 'actionType', keypath: 'actionType', options: {unique: false}},
            {name: 'dataType', keypath: 'dataType', options: {unique: false}},
            {name: 'data', keypath: 'data', options: {unique: false}},
            {name: 'createdAt', keypath: 'createdAt', options: {unique: false}},
            {name: 'favorite', keypath: 'favorite', options: {unique: false}},
        ]
    }],
    migrationFactory
};

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        NgxIndexedDBModule.forRoot(dbConfig)
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
