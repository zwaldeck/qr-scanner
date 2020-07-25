import {Component} from '@angular/core';
import {QrHistoryGroupType, QrService} from '../shared/services/qr.service';
import {BaseComponent} from '../base.component';
import {takeUntil, tap} from 'rxjs/operators';
import {QR} from '../shared/model/qr';
import {ActionSheetController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})
export class HistoryComponent extends BaseComponent {

    history: Map<string, QR[]>;

    constructor(private qrService: QrService,
                private toastController: ToastController) {
        super();
    }

    ionViewWillEnter(): void {
        this.loadHistory(QrHistoryGroupType.GROUP_BY_DATE);
    }

    ionViewDidLeave() {
        this.ngOnDestroy();
    }

    loadHistory(groupType: QrHistoryGroupType): void {
        this.qrService.loadHistory(groupType)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                // tap(res => console.log(res))
            ).subscribe(res => this.history = res);
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
