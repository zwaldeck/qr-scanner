import {QR} from '../model/qr';
import {DataType} from '../model/data.type';
import {QrDataParser} from '../services/parsers/qr-data-parser';
import {MatmsgParser} from '../services/parsers/matmsg-parser';
import {VCardParser} from '../services/parsers/vcard-parser';
import {MailtoParser} from '../services/parsers/mailto-parser';
import {SmsParser} from '../services/parsers/sms-parser';
import {VEventParser} from '../services/parsers/vevent-parser';
import {MeCardParser} from '../services/parsers/me-card-parser';
import {PhoneParser} from '../services/parsers/phone-parser';
import {Wifi} from '../model/qr-data/wifi';
import {WifiParser} from '../services/parsers/wifi-parser';

export class QrDataParserRegistry {

    private static registry = new Map<DataType, QrDataParser<any>>([
        [DataType.MATMSG, new MatmsgParser()],
        [DataType.VCARD, new VCardParser()],
        [DataType.MAILTO, new MailtoParser()],
        [DataType.SMS, new SmsParser()],
        [DataType.VEVENT, new VEventParser()],
        [DataType.MECARD, new MeCardParser()],
        [DataType.PHONE, new PhoneParser()],
        [DataType.WIFI, new WifiParser()],
    ]);

    private constructor() {
    }

    public static getParser<T>(type: DataType): QrDataParser<T> {
        return QrDataParserRegistry.registry.get(type);
    }

}
