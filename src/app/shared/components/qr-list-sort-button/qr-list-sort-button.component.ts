import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QrHistoryGroupType} from '../../services/qr.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-qr-list-sort-button',
  templateUrl: './qr-list-sort-button.component.html',
  styleUrls: ['./qr-list-sort-button.component.scss'],
})
export class QrListSortButtonComponent implements OnInit {

  @Output('sortTypeChanged') sortTypeChanged = new EventEmitter<QrHistoryGroupType>();

  constructor(private actionSheetController: ActionSheetController) { }

  ngOnInit() {}

  showSortByActionSheet(): void {
    this.actionSheetController.create({
      header: 'Sort by',
      buttons: [
        {
          text: 'Date',
          icon: 'calendar-outline',
          handler: () => this.sortTypeChanged.emit(QrHistoryGroupType.GROUP_BY_DATE)
        },
        {
          text: 'Type',
          icon: 'pricetag-outline',
          handler: () => this.sortTypeChanged.emit(QrHistoryGroupType.GROUP_BY_TYPE)
        }
      ]
    }).then(sheet => sheet.present());
  }

}
