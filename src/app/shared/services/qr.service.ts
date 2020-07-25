import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {from, Observable} from 'rxjs';
import {QR} from '../model/qr';
import {QR_DB_STORE} from '../utils/constants';
import {map} from 'rxjs/operators';
import {QrType} from '../model/qr-type.enum';
import {QrDataParserRegistry} from '../utils/qr-data-parser-registry';
import {DataType} from '../model/data.type';
import {Contact} from '../model/qr-data/contact';
import {Mail} from '../model/qr-data/mail';
import {Sms} from '../model/qr-data/sms';
import {VEvent} from '../model/qr-data/vevent';
import {Wifi} from '../model/qr-data/wifi';
import {ActionType} from '../model/action-type.enum';

@Injectable({
    providedIn: 'root'
})
export class QrService {

    constructor(private dbService: NgxIndexedDBService) {
    }

    public loadHistory(groupType: QrHistoryGroupType = QrHistoryGroupType.GROUP_BY_DATE): Observable<Map<string, QR[]>> {
        return from(this.dbService.getAll<QR>(QR_DB_STORE))
            .pipe(
                map(codes => codes.filter(code => code.type === QrType.SCANNED)),
                map(codes => this.groupCodesHistory(groupType, codes))
            );
    }

    public loadFavorites(groupType: QrHistoryGroupType = QrHistoryGroupType.GROUP_BY_DATE): Observable<Map<string, QR[]>> {
        return from(this.dbService.getAll<QR>(QR_DB_STORE))
            .pipe(
                map(codes => codes.filter(code => code.favorite)),
                map(codes => this.groupCodesHistory(groupType, codes))
            );
    }

    public loadSaved(groupType: QrHistoryGroupType = QrHistoryGroupType.GROUP_BY_DATE): Observable<Map<string, QR[]>> {
        return from(this.dbService.getAll<QR>(QR_DB_STORE))
            .pipe(
                map(codes => codes.filter(code => code.type === QrType.CREATED)),
                map(codes => this.groupCodesHistory(groupType, codes))
            );
    }

    public getEssentialData(qr: QR): string {
        switch (qr.dataType) {
            case DataType.VCARD:
                const contacts = QrDataParserRegistry.getParser<Contact[]>(DataType.VCARD).parse(qr.data);
                const contact = contacts[0];
                return contact.displayName || (contact.lastName + ' - ' + contact.firstName);
            case DataType.MATMSG:
                return QrDataParserRegistry.getParser<Mail>(DataType.MATMSG).parse(qr.data).subject;
            case DataType.MAILTO:
                return QrDataParserRegistry.getParser<Mail>(DataType.MAILTO).parse(qr.data).subject;
            case DataType.SMS:
                // TODO: Translate
                return 'Sms for: ' + QrDataParserRegistry.getParser<Sms>(DataType.SMS).parse(qr.data).numbers.join(' - ');
            case DataType.VEVENT:
                return QrDataParserRegistry.getParser<VEvent[]>(DataType.VEVENT).parse(qr.data)[0].summary;
            case DataType.MECARD:
                const mecard = QrDataParserRegistry.getParser<Contact>(DataType.MECARD).parse(qr.data);
                return mecard.displayName || ((mecard.lastName || '') + ' - ' + (mecard.firstName || ''));
            case DataType.PHONE:
                return QrDataParserRegistry.getParser<string>(DataType.PHONE).parse(qr.data);
            case DataType.WIFI:
                return QrDataParserRegistry.getParser<Wifi>(DataType.WIFI).parse(qr.data).ssid;
            case DataType.TEXT:
            case DataType.URL:
            default:
                return qr.data;
        }
    }

    public getIcon(qr: QR): string {
        return this.getIconFromActionType(qr.actionType);
    }

    public getIconFromActionType(type: ActionType): string {
        switch (type) {
            case ActionType.CONTACT:
                return 'person-outline';
            case ActionType.EMAIL:
                return 'mail-open-outline';
            case ActionType.SMS:
                return 'chatbubble-ellipses-outline';
            case ActionType.EVENT:
                return 'calendar-outline';
            case ActionType.PHONE:
                return 'call-outline';
            case ActionType.WIFI:
                return 'wifi-outline';
            case ActionType.URL:
                return 'earth-outline';
            case ActionType.TEXT:
            default:
                return 'document-text-outline';
        }
    }

    public getQrById(id: number): Observable<QR> {
        return from(this.dbService.getByID<QR>(QR_DB_STORE, +id));
    }

    public updateQR(qr: QR): Observable<boolean> {
        return from(this.dbService.update<QR>(QR_DB_STORE, qr))
            .pipe(map(() => true));
    }

    public saveQR(qr: QR): Observable<boolean> {
        return from(this.dbService.add<QR>(QR_DB_STORE, qr))
            .pipe(map(() => true));
    }

    public deleteQR(id: number): Observable<boolean> {
        return from(this.dbService.delete(QR_DB_STORE, id))
            .pipe(map(() => true));
    }

    public getData(qr: QR): Contact|Mail|Sms|VEvent|string|Wifi {
        switch (qr.dataType) {
            case DataType.VCARD:
                return QrDataParserRegistry.getParser<Contact[]>(DataType.VCARD).parse(qr.data)[0];
            case DataType.MATMSG:
                return QrDataParserRegistry.getParser<Mail>(DataType.MATMSG).parse(qr.data);
            case DataType.MAILTO:
                return QrDataParserRegistry.getParser<Mail>(DataType.MAILTO).parse(qr.data);
            case DataType.SMS:
                return QrDataParserRegistry.getParser<Sms>(DataType.SMS).parse(qr.data);
            case DataType.VEVENT:
                return QrDataParserRegistry.getParser<VEvent[]>(DataType.VEVENT).parse(qr.data)[0];
            case DataType.MECARD:
                return QrDataParserRegistry.getParser<Contact>(DataType.MECARD).parse(qr.data);
            case DataType.PHONE:
                return QrDataParserRegistry.getParser<string>(DataType.PHONE).parse(qr.data);
            case DataType.WIFI:
                return QrDataParserRegistry.getParser<Wifi>(DataType.WIFI).parse(qr.data);
            case DataType.TEXT:
            case DataType.URL:
            default:
                return qr.data;
        }
    }

    private groupCodesHistory(groupType: QrHistoryGroupType, codes: QR[]): Map<string, QR[]> {
        switch (groupType) {
            case QrHistoryGroupType.GROUP_BY_TYPE:
                return this.groupCodesHistoryByType(codes);
            case QrHistoryGroupType.GROUP_BY_DATE:
            default:
                return this.groupCodesHistoryByDate(codes);
        }
    }

    private groupCodesHistoryByDate(codes: QR[]): Map<string, QR[]> {
        const groups = codes
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .reduce((currentGroups, qr) => {
                const date = qr.createdAt.toISOString().split('T')[0];
                if (!currentGroups[date]) {
                    currentGroups[date] = [];
                }
                currentGroups[date].push(qr);
                return currentGroups;
            }, {});

        const sortedKeys = Object.keys(groups).sort((a, b) => {
            const d1 = new Date(a);
            const d2 = new Date(b);
            return d2.getTime() - d1.getTime();
        });

        const codeGroups = new Map<string, QR[]>();

        for (const key of sortedKeys) {
            codeGroups.set(key, groups[key]);
        }

        return codeGroups;
    }

    private groupCodesHistoryByType(codes: QR[]): Map<string, QR[]> {
        const groups = codes
            .reduce((currentGroups, qr) => {
                if (!currentGroups[qr.actionType]) {
                    currentGroups[qr.actionType] = [];
                }
                currentGroups[qr.actionType].push(qr);
                return currentGroups;
            }, {});

        const sortedKeys = Object.keys(groups).sort((a, b) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }
            return 0;
        });

        const codeGroups = new Map<string, QR[]>();

        for (const key of sortedKeys) {
            codeGroups.set(key, groups[key]);
        }

        return codeGroups;
    }
}

// TODO: Refactor to seperate enum in Models dir
export enum QrHistoryGroupType {
    GROUP_BY_DATE,
    GROUP_BY_TYPE
}
