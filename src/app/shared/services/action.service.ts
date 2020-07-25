import {Injectable} from '@angular/core';
import {ActionType} from '../model/action-type.enum';
import {QR} from '../model/qr';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {from, Observable} from 'rxjs';
import {QrType} from '../model/qr-type.enum';
import {QR_DB_STORE} from '../utils/constants';
import {DataType} from '../model/data.type';
import {FileSaverService} from 'ngx-filesaver';
import {QrService} from './qr.service';
import {Mail} from '../model/qr-data/mail';

@Injectable({
    providedIn: 'root'
})
export class ActionService {


    constructor(private dbService: NgxIndexedDBService,
                private qrService: QrService,
                private fileSaverService: FileSaverService) {
    }

    // TODO: Move to QrService
    public handleScan(resultString: string): Observable<number> {
        const uppercaseResult = resultString.toUpperCase();
        let type = ActionType.TEXT;
        let dataType = DataType.TEXT;
        if (uppercaseResult.startsWith('MAILTO:')) {
         type = ActionType.EMAIL;
         dataType = DataType.MAILTO;
        } else if (uppercaseResult.startsWith('MATMSG:')) {
            type = ActionType.EMAIL;
            dataType = DataType.MATMSG;
        } else if (uppercaseResult.startsWith('SMSTO:')) {
            type = ActionType.SMS;
            dataType = DataType.SMS;
        } else if (uppercaseResult.startsWith('BEGIN: VEVENT') || uppercaseResult.startsWith('BEGIN:VEVENT')) {
            type = ActionType.EVENT;
            dataType = DataType.VEVENT;
        } else if (uppercaseResult.startsWith('TEL:')) {
            type = ActionType.PHONE;
            dataType = DataType.PHONE;
        } else if (uppercaseResult.startsWith('BEGIN:VCARD') || uppercaseResult.startsWith('BEGIN: VCARD')) {
            type = ActionType.CONTACT;
            dataType = DataType.VCARD;
        } else if (uppercaseResult.startsWith('MECARD:')) {
            type = ActionType.CONTACT;
            dataType = DataType.MECARD;
        } else if (uppercaseResult.startsWith('WIFI:')) {
            type = ActionType.WIFI;
            dataType = DataType.WIFI;
        } else if (uppercaseResult.startsWith('HTTP://') || uppercaseResult.startsWith('HTTPS://')) {
            type = ActionType.URL;
            dataType = DataType.URL;
        }

        return from(this.dbService.add(QR_DB_STORE, new QR(QrType.SCANNED, type, dataType, resultString)));
    }

    public handleAction(qr: QR): void {
        switch (qr.dataType) {
            case DataType.VCARD:
                this.downloadFile(qr.data, 'contact.vcf', 'text/x-vcard');
                break;
            case DataType.MECARD:
                // todo: Create vcard from mecard
                break;
            case DataType.MATMSG:
                window.location.href = (this.qrService.getData(qr) as Mail).mailTo();
                break;
            case DataType.VEVENT:
                this.downloadFile(qr.data, 'event.ics', 'text/calendar');
                break;
            case DataType.PHONE:
            case DataType.SMS:
            case DataType.MAILTO:
                window.location.href = qr.data;
                break;
            case DataType.URL:
                window.open(qr.data, '_blank');
                break;
        }
    }

    private downloadFile(data: string, filename: string, type: string): void {
        const blob = new Blob([data], {type});
        this.fileSaverService.save(blob, filename, type);
    }
}
