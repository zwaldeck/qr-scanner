import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractDetailsComponent} from '../abstract-details-component';
import {QR} from '../../shared/model/qr';
import {Mail} from '../../shared/model/qr-data/mail';
import {QrService} from '../../shared/services/qr.service';
import {Wifi} from '../../shared/model/qr-data/wifi';

@Component({
  selector: 'app-wifi-details',
  templateUrl: './wifi-details.component.html',
  styleUrls: ['./wifi-details.component.scss'],
})
export class WifiDetailsComponent extends AbstractDetailsComponent implements OnInit, OnChanges {

  @Input() qr: QR;

  wifi: Wifi;

  constructor(private qrService: QrService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.wifi = this.qrService.getData(changes.qr.currentValue as QR) as Wifi;
    }
  }

}
