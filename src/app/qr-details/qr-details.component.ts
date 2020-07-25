import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QrService} from '../shared/services/qr.service';
import {mergeMap, take, takeUntil} from 'rxjs/operators';
import {QR} from '../shared/model/qr';
import {ActionType} from '../shared/model/action-type.enum';
import {ActionService} from '../shared/services/action.service';
import {ModalController} from '@ionic/angular';
import {ShowQRCodeModalComponent} from '../shared/components/show-qrcode-modal/show-qrcode-modal.component';
import {AbstractHistoryAwareComponent} from '../shared/components/abstract-history-aware-component';

@Component({
    selector: 'app-qr-details',
    templateUrl: './qr-details.component.html',
    styleUrls: ['./qr-details.component.scss'],
})
export class QrDetailsComponent extends AbstractHistoryAwareComponent implements OnInit {

    public readonly ActionType = ActionType;

    qr: QR;
    id: number;

    constructor(private activatedRoute: ActivatedRoute,
                router: Router,
                private qrService: QrService,
                private actionService: ActionService,
                private modalController: ModalController) {
        super(router);
    }

    ngOnInit() {
        super.ngOnInit();
        this.activatedRoute.params.pipe(
            mergeMap((params: Params) => {
                this.id = +params.id;
                return this.qrService.getQrById(params.id);
            }),
            takeUntil(this.ngUnsubscribe),
            // tap(qr => console.log(qr))
        ).subscribe((qr: QR) => this.qr = qr);
    }

    getButtonText(actionType: ActionType): string {
        switch (actionType) {
            case ActionType.CONTACT:
                return 'Add contact';
            case ActionType.EMAIL:
                return 'Send email';
            case ActionType.URL:
                return 'Go to url';
            case ActionType.EVENT:
                return 'Add event';
            case ActionType.PHONE:
                return 'Call';
            case ActionType.SMS:
                return 'Send sms';
            case ActionType.WIFI:
                return 'Open settings';
            case ActionType.TEXT:
            default:
                return '';
        }
    }

    getIcon(qr: QR): string {
        return this.qrService.getIcon(qr);
    }

    preformAction(qr: QR) {
        this.actionService.handleAction(qr);
    }

    toggleFavorite(): void {
        this.qr.favorite = !this.qr.favorite;
        this.qrService.updateQR(this.qr)
            .pipe(take(1))
            .subscribe();
    }

    showQRCode() {
        this.modalController.create({
            component: ShowQRCodeModalComponent,
            componentProps: {qr: this.qr, id: this.id}
        }).then(modal => modal.present());
    }

}
