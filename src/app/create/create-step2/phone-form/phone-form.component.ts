import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../base.component';
import {QR} from '../../../shared/model/qr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GlobalEmitter} from '../../../shared/utils/global-emitter';
import {SEND_CREATE_QR_FORM} from '../../../shared/utils/constants';
import {takeUntil} from 'rxjs/operators';
import {QrType} from '../../../shared/model/qr-type.enum';
import {ActionType} from '../../../shared/model/action-type.enum';
import {DataType} from '../../../shared/model/data.type';

@Component({
    selector: 'app-phone-form',
    templateUrl: './phone-form.component.html',
    styleUrls: ['./phone-form.component.scss'],
})
export class PhoneFormComponent extends BaseComponent implements OnInit {

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
            phone: ['', []]
        });
    }

    public submitForm(): void {
        const qr = new QR(
            QrType.CREATED,
            ActionType.PHONE,
            DataType.PHONE,
            'tel:' + this.form.value.phone,
            new Date());

        this.result.emit(qr);
    }
}
