import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QR} from '../../model/qr';
import {QrService} from '../../services/qr.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-qr-list',
  templateUrl: './qr-list.component.html',
  styleUrls: ['./qr-list.component.scss'],
})
export class QrListComponent implements OnInit {

  @Input() codes: Map<string, QR[]>;
  @Input() showDelete = false;

  @Output() deleteQr: EventEmitter<number> = new EventEmitter<number>();

  constructor(private qrService: QrService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}

  getEssentialData(qr: QR): string {
    return this.qrService.getEssentialData(qr);
  }

  getIcon(qr: QR): string {
    return this.qrService.getIcon(qr);
  }

  navigateToDetail(id: number) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }

  askForDeletion(qr: QR) {
    this.alertController.create({
      header: 'Are you sure?',
      message: `Are you sure you want to delete the qr code: '${this.getEssentialData(qr)}'`,
      buttons: ['Cancel', {
        text: 'I\'m sure!',
        handler: () => this.delete((qr as any).id) // Dirty trick to get extra data that's on the object
      } ]
    }).then(alert => alert.present());
  }

  keepOrder(): number {
    return 1;
  }

  private delete(id: number) {
    this.deleteQr.emit(id);

    for (const [key, value] of this.codes) {
      this.codes.set(key, value.filter(qr => (qr as any).id !== id));
    }
  }

}
