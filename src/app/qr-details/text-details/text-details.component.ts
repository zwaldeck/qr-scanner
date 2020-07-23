import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractDetailsComponent} from '../abstract-details-component';
import {QR} from '../../shared/model/qr';
import {QrService} from '../../shared/services/qr.service';

@Component({
  selector: 'app-text-details',
  templateUrl: './text-details.component.html',
  styleUrls: ['./text-details.component.scss'],
})
export class TextDetailsComponent extends AbstractDetailsComponent implements OnInit, OnChanges {

  @Input() qr: QR;

  text: string;

  constructor(private qrService: QrService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.qr && changes.qr.currentValue) {
      this.text = this.qrService.getData(changes.qr.currentValue as QR) as string;
    }
  }

}
