import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QrService} from '../shared/services/qr.service';
import {mergeMap, take, takeUntil, tap} from 'rxjs/operators';
import {QR} from '../shared/model/qr';
import {ActionType} from '../shared/model/action-type.enum';
import {ActionService} from '../shared/services/action.service';
import {SafeUrl} from '@angular/platform-browser';
import {DataType} from '../shared/model/data.type';
import {FileSaverService} from 'ngx-filesaver';

@Component({
    selector: 'app-qr-details',
    templateUrl: './qr-details.component.html',
    styleUrls: ['./qr-details.component.scss'],
})
export class QrDetailsComponent extends BaseComponent implements OnInit {

    public readonly ActionType = ActionType;

    qr: QR;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private qrService: QrService,
                private actionService: ActionService,
                private fileSaverService: FileSaverService) {
        super();
    }

    ngOnInit() {
        this.activatedRoute.params.pipe(
            mergeMap((params: Params) => this.qrService.getQrById(params.id)),
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

}
