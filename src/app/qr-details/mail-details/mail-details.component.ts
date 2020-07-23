import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QR} from '../../shared/model/qr';
import {QrService} from '../../shared/services/qr.service';
import {Mail} from '../../shared/model/qr-data/mail';
import {AbstractDetailsComponent} from '../abstract-details-component';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.scss'],
})
export class MailDetailsComponent extends AbstractDetailsComponent implements OnInit, OnChanges {

  @Input() qr: QR;

  mail: Mail;

  constructor(private qrService: QrService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.mail = this.qrService.getData(changes.qr.currentValue as QR) as Mail;
    }
  }

}
