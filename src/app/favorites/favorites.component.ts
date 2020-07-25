import {Component} from '@angular/core';
import {QR} from '../shared/model/qr';
import {QrHistoryGroupType, QrService} from '../shared/services/qr.service';
import {takeUntil, tap} from 'rxjs/operators';
import {BaseComponent} from '../base.component';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent extends BaseComponent {

  favorites: Map<string, QR[]>;

  constructor(private qrService: QrService,
              private toastController: ToastController) {
    super();
  }

  ionViewWillEnter(): void {
    this.loadFavorites(QrHistoryGroupType.GROUP_BY_DATE);
  }

  ionViewDidLeave() {
    this.ngOnDestroy();
  }

  loadFavorites(groupType: QrHistoryGroupType): void {
    this.qrService.loadFavorites(groupType)
        .pipe(
            takeUntil(this.ngUnsubscribe),
        ).subscribe(res => this.favorites = res);
  }

  deleteQr(id: number): void {
    this.qrService.deleteQR(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.toastController.create({
          message: 'QR Code deleted!',
          duration: 2000
        }).then(toast => toast.present()));
  }

}
