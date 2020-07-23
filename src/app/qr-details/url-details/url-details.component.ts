import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractDetailsComponent} from '../abstract-details-component';
import {QR} from '../../shared/model/qr';
import {Mail} from '../../shared/model/qr-data/mail';
import {QrService} from '../../shared/services/qr.service';

@Component({
  selector: 'app-url-details',
  templateUrl: './url-details.component.html',
  styleUrls: ['./url-details.component.scss'],
})
export class UrlDetailsComponent extends AbstractDetailsComponent implements OnInit, OnChanges {

  @Input() qr: QR;

  url: string;

  constructor(private qrService: QrService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.url = this.qrService.getData(changes.qr.currentValue as QR) as string;
    }
  }

}
