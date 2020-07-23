import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractDetailsComponent} from '../abstract-details-component';
import {QR} from '../../shared/model/qr';
import {Mail} from '../../shared/model/qr-data/mail';
import {QrService} from '../../shared/services/qr.service';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.scss'],
})
export class PhoneDetailsComponent extends AbstractDetailsComponent implements OnInit, OnChanges {

  @Input() qr: QR;

  phone: string;

  constructor(private qrService: QrService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.phone = this.qrService.getData(changes.qr.currentValue as QR) as string;
    }
  }

}
