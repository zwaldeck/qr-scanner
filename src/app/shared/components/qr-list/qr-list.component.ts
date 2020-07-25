import {Component, Input, OnInit} from '@angular/core';
import {QR} from '../../model/qr';
import {QrService} from '../../services/qr.service';

@Component({
  selector: 'app-qr-list',
  templateUrl: './qr-list.component.html',
  styleUrls: ['./qr-list.component.scss'],
})
export class QrListComponent implements OnInit {

  @Input() codes: Map<string, QR[]>;

  constructor(private qrService: QrService) { }

  ngOnInit() {}

  getEssentialData(qr: QR): string {
    return this.qrService.getEssentialData(qr);
  }

  getIcon(qr: QR): string {
    return this.qrService.getIcon(qr);
  }

  keepOrder(): number {
    return 1;
  }

}
