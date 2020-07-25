import {Component} from '@angular/core';
import {QR} from '../shared/model/qr';
import {QrHistoryGroupType, QrService} from '../shared/services/qr.service';
import {takeUntil, tap} from 'rxjs/operators';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent extends BaseComponent {

  favorites: Map<string, QR[]>;

  constructor(private qrService: QrService) {
    super();
  }

  ionViewWillEnter(): void {
    this.loadHistory(QrHistoryGroupType.GROUP_BY_DATE);
  }

  ionViewDidLeave() {
    this.ngOnDestroy();
  }

  loadHistory(groupType: QrHistoryGroupType): void {
    this.qrService.loadFavorites(groupType)
        .pipe(
            takeUntil(this.ngUnsubscribe),
        ).subscribe(res => this.favorites = res);
  }

}
