import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../base.component';
import {QR} from '../../../shared/model/qr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GlobalEmitter} from '../../../shared/utils/global-emitter';
import {SEND_CREATE_QR_FORM} from '../../../shared/utils/constants';
import {takeUntil} from 'rxjs/operators';
import {Sms} from '../../../shared/model/qr-data/sms';
import {QrType} from '../../../shared/model/qr-type.enum';
import {ActionType} from '../../../shared/model/action-type.enum';
import {DataType} from '../../../shared/model/data.type';

@Component({
  selector: 'app-sms-form',
  templateUrl: './sms-form.component.html',
  styleUrls: ['./sms-form.component.scss'],
})
export class SmsFormComponent extends BaseComponent implements OnInit {

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
      numbers: ['', []],
      message: ['', []],
    });
  }

  public submitForm(): void {
    const sms = new Sms();
    sms.numbers = this.form.value.numbers ? this.form.value.numbers.split(',') : [];
    sms.message = this.form.value.message || '';

    const qr = new QR(
        QrType.CREATED,
        ActionType.SMS,
        DataType.SMS,
        sms.smsTo(),
        new Date());

    this.result.emit(qr);
  }

}
