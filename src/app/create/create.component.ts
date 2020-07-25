import {Component, OnInit} from '@angular/core';
import {ActionType} from '../shared/model/action-type.enum';
import {GlobalEmitter} from '../shared/utils/global-emitter';
import {SEND_CREATE_QR_FORM} from '../shared/utils/constants';
import {BaseComponent} from '../base.component';
import {QR} from '../shared/model/qr';
import {QrService} from '../shared/services/qr.service';
import {takeUntil} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {

    currentStep = 1;
    selectedType: ActionType = ActionType.TEXT;
    currentQR: QR = null;

    constructor(private qrService: QrService,
                private toastController: ToastController) {
        super();
    }

    ngOnInit() {
    }

    step1Complete(type: ActionType) {
        this.selectedType = type;
        this.currentStep = 2;
    }

    step2Complete(qr: QR) {
        this.currentQR = qr;
        this.currentStep = 3;
    }

    submitForm(): void {
        GlobalEmitter.of(SEND_CREATE_QR_FORM).emit(true);
    }

    saveQR() {
        this.qrService.saveQR(this.currentQR)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => this.toastController.create({
                    message: 'QR Code saved!',
                    duration: 2000
                }).then(toast => toast.present())
            );
    }

}
