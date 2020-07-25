import { Component, OnInit } from '@angular/core';
import {QrHistoryGroupType, QrService} from '../shared/services/qr.service';
import {QR} from '../shared/model/qr';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent extends BaseComponent {

  savedCodes: Map<string, QR[]>;

  constructor(private qrService: QrService) {
    super();
  }

  ionViewWillEnter(): void {
    this.loadSaved(QrHistoryGroupType.GROUP_BY_DATE);
  }

  ionViewDidLeave() {
    this.ngOnDestroy();
  }

  loadSaved(groupType: QrHistoryGroupType): void {
    this.qrService.loadSaved(groupType)
        .pipe(
            takeUntil(this.ngUnsubscribe),
        ).subscribe(res => this.savedCodes = res);
  }
}
