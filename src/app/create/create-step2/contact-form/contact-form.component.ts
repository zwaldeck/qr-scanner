import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalEmitter} from '../../../shared/utils/global-emitter';
import {BaseComponent} from '../../../base.component';
import {SEND_CREATE_QR_FORM} from '../../../shared/utils/constants';
import {takeUntil} from 'rxjs/operators';
import {VCard, VCardFormatter} from 'ngx-vcard';
import {QR} from '../../../shared/model/qr';
import {QrType} from '../../../shared/model/qr-type.enum';
import {ActionType} from '../../../shared/model/action-type.enum';
import {DataType} from '../../../shared/model/data.type';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent extends BaseComponent implements OnInit {

    @Output() result = new EventEmitter<QR>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        GlobalEmitter.of(SEND_CREATE_QR_FORM)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => this.submitForm());

        this.form = this.fb.group({
            displayName: ['', Validators.required],
            firstName: ['', []],
            lastName: ['', []],
            mobile: ['', []],
            phone: ['', []],
            email: ['', []],
            website: ['', []],
            birthDay: ['', []],
            notes: ['', []],
            workPhone: ['', []],
            workEmail: ['', []],
            company: ['', []],
            job: ['', []],
        });
    }

    public submitForm(): void {
        const vCard: VCard = {
            nickname: this.form.value.displayName || '',
            name: {
                lastNames: this.form.value.lastName || '',
                firstNames: this.form.value.fistName || '',
            },
            formattedName: {
                lastNames: this.form.value.lastName || '',
                firstNames: this.form.value.firstName || '',
            },
            birthday: this.form.value.birthDay ? new Date(this.form.value.birthDay) : undefined,
            telephone: [
                {value: this.form.value.mobile || '', param: {type: ['home', 'cell']}},
                {value: this.form.value.phone || '', param: {type: 'home'}},
                {value: this.form.value.workPhone || '', param: {type: 'work'}}
            ],
            email: [
                {value: this.form.value.email || '', param: {type: 'home'}},
                {value: this.form.value.workEmail || '', param: {type: 'work'}}
            ],
            title: this.form.value.job || '',
            organization: this.form.value.job || '',
            note: this.form.value.note || ''
        };

        const vcardData = VCardFormatter.getVCardAsString(vCard);

        const qr = new QR(
            QrType.CREATED,
            ActionType.CONTACT,
            DataType.VCARD,
            vcardData,
            new Date());

        this.result.emit(qr);
    }
}
