import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {CreateComponent} from './create.component';
import {CreateStep1Component} from './create-step1/create-step1.component';
import {CreateRoutingModule} from './create-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CreateStep2Component} from './create-step2/create-step2.component';
import {ContactFormComponent} from './create-step2/contact-form/contact-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxVcardModule} from 'ngx-vcard';
import {EventFormComponent} from './create-step2/event-form/event-form.component';
import {PhoneFormComponent} from './create-step2/phone-form/phone-form.component';
import {MailFormComponent} from './create-step2/mail-form/mail-form.component';
import {SmsFormComponent} from './create-step2/sms-form/sms-form.component';
import {TextFormComponent} from './create-step2/text-form/text-form.component';
import {UrlFormComponent} from './create-step2/url-form/url-form.component';
import {WifiFormComponent} from './create-step2/wifi-form/wifi-form.component';
import {CreateStep3Component} from './create-step3/create-step3.component';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        CreateRoutingModule,
        ReactiveFormsModule,
        NgxVcardModule,
        QRCodeModule
    ],
    declarations: [
        CreateComponent,
        CreateStep1Component,
        CreateStep2Component,
        CreateStep3Component,
        ContactFormComponent,
        EventFormComponent,
        MailFormComponent,
        PhoneFormComponent,
        SmsFormComponent,
        TextFormComponent,
        UrlFormComponent,
        WifiFormComponent
    ]
})
export class CreateComponentModule {
}
