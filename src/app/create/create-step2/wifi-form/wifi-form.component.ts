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
import {Wifi} from '../../../shared/model/qr-data/wifi';

@Component({
  selector: 'app-wifi-form',
  templateUrl: './wifi-form.component.html',
  styleUrls: ['./wifi-form.component.scss'],
})
export class WifiFormComponent extends BaseComponent implements OnInit {

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
      ssid: ['', []],
      type: ['', []],
      password: ['', []],
    });
  }

  public submitForm(): void {
    const wifi = new Wifi();

    wifi.ssid = this.form.value.ssid || '';
    wifi.ssid = this.form.value.type || 'WPA';
    wifi.password = this.form.value.password || '';

    const qr = new QR(
        QrType.CREATED,
        ActionType.EMAIL,
        DataType.MAILTO,
        wifi.toQrData(),
        new Date());

    this.result.emit(qr);
  }
}
