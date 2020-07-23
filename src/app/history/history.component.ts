import {Component} from '@angular/core';
import {QrHistoryGroupType, QrService} from '../shared/services/qr.service';
import {BaseComponent} from '../base.component';
import {takeUntil, tap} from 'rxjs/operators';
import {QR} from '../shared/model/qr';
import {ActionSheetController} from '@ionic/angular';

@Component({
    selector: 'app-history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})
export class HistoryComponent extends BaseComponent {

    history: Map<string, QR[]>;

    constructor(private qrService: QrService,
                private actionSheetController: ActionSheetController) {
        super();
    }

    ionViewWillEnter(): void {
        this.loadHistory(QrHistoryGroupType.GROUP_BY_DATE);
    }

    ionViewDidLeave() {
        this.ngOnDestroy();
    }

    getEssentialData(qr: QR): string {
        return this.qrService.getEssentialData(qr);
    }

    getIcon(qr: QR): string {
        return this.qrService.getIcon(qr);
    }

    keepOrder(): number {
        return 1;
    }

    showSortByActionSheet(): void {
        this.actionSheetController.create({
            header: 'Sort by',
            buttons: [
                {
                    text: 'Date',
                    icon: 'calendar-outline',
                    handler: () => this.loadHistory(QrHistoryGroupType.GROUP_BY_DATE)
                },
                {
                    text: 'Type',
                    icon: 'pricetag-outline',
                    handler: () => this.loadHistory(QrHistoryGroupType.GROUP_BY_TYPE)
                }
            ]
        }).then(sheet => sheet.present());
    }

    private loadHistory(groupType: QrHistoryGroupType): void {
        this.qrService.loadHistory(groupType)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                tap(res => console.log(res))
            ).subscribe(res => this.history = res);
    }
}
