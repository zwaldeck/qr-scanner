import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QR} from '../../shared/model/qr';
import {ActionType} from '../../shared/model/action-type.enum';
import {QrService} from '../../shared/services/qr.service';
import {Contact} from '../../shared/model/qr-data/contact';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() qr: QR;

  contact: Contact;

  constructor(private qrService: QrService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.contact = this.qrService.getData(changes.qr.currentValue as QR) as Contact;
    }
  }

}
