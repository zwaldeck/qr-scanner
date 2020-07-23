import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QR} from '../../shared/model/qr';
import {Mail} from '../../shared/model/qr-data/mail';
import {QrService} from '../../shared/services/qr.service';
import {Sms} from '../../shared/model/qr-data/sms';
import {AbstractDetailsComponent} from '../abstract-details-component';

@Component({
  selector: 'app-sms-details',
  templateUrl: './sms-details.component.html',
  styleUrls: ['./sms-details.component.scss'],
})
export class SmsDetailsComponent extends AbstractDetailsComponent implements OnInit, OnChanges {

  @Input() qr: QR;

  sms: Sms;

  constructor(private qrService: QrService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.sms = this.qrService.getData(changes.qr.currentValue as QR) as Sms;
    }
  }
}
