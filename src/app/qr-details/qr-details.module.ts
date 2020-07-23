import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {QrDetailsComponent} from './qr-details.component';
import {QrDetailsRoutingModule} from './qr-details-routing.module';
import {ContactDetailsComponent} from './contact-details/contact-details.component';
import {MailDetailsComponent} from './mail-details/mail-details.component';
import {SmsDetailsComponent} from './sms-details/sms-details.component';
import {EventDetailsComponent} from './event-details/event-details.component';
import {PhoneDetailsComponent} from './phone-details/phone-details.component';
import {TextDetailsComponent} from './text-details/text-details.component';
import {WifiDetailsComponent} from './wifi-details/wifi-details.component';
import {UrlDetailsComponent} from './url-details/url-details.component';


@NgModule({
    declarations: [
        QrDetailsComponent,
        ContactDetailsComponent,
        MailDetailsComponent,
        SmsDetailsComponent,
        EventDetailsComponent,
        PhoneDetailsComponent,
        TextDetailsComponent,
        WifiDetailsComponent,
        UrlDetailsComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SharedModule,
        QrDetailsRoutingModule
    ]
})
export class QrDetailsModule {
}
