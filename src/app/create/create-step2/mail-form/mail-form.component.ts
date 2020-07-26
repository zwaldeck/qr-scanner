import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../base.component';
import {QR} from '../../../shared/model/qr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GlobalEmitter} from '../../../shared/utils/global-emitter';
import {SEND_CREATE_QR_FORM} from '../../../shared/utils/constants';
import {takeUntil} from 'rxjs/operators';
import {Mail} from '../../../shared/model/qr-data/mail';
import {QrType} from '../../../shared/model/qr-type.enum';
import {ActionType} from '../../../shared/model/action-type.enum';
import {DataType} from '../../../shared/model/data.type';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss'],
})
export class MailFormComponent extends BaseComponent implements OnInit {

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
      to: ['', []],
      cc: ['', []],
      bcc: ['', []],
      subject: ['', []],
      body: ['', []],
    });
  }

  public submitForm(): void {
    const mail = new Mail();

    mail.to = this.form.value.to ? this.form.value.to.split(',') : [];
    mail.cc = this.form.value.cc ? this.form.value.cc.split(',') : [];
    mail.bcc = this.form.value.bcc ? this.form.value.bcc.split(',') : [];
    mail.subject = this.form.value.subject || '';
    mail.body = this.form.value.body || '';

    const qr = new QR(
        QrType.CREATED,
        ActionType.EMAIL,
        DataType.MAILTO,
        mail.mailTo(),
        new Date());

    this.result.emit(qr);
  }

}
