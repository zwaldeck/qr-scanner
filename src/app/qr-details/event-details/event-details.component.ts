import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractDetailsComponent} from '../abstract-details-component';
import {QR} from '../../shared/model/qr';
import {Mail} from '../../shared/model/qr-data/mail';
import {QrService} from '../../shared/services/qr.service';
import {VEvent} from '../../shared/model/qr-data/vevent';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent extends AbstractDetailsComponent implements OnInit, OnChanges {

  @Input() qr: QR;

  event: VEvent;

  constructor(private qrService: QrService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.event = this.qrService.getData(changes.qr.currentValue as QR) as VEvent;
    }
  }

}
