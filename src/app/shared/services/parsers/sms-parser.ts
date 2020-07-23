import {QrDataParser} from './qr-data-parser';
import {Sms} from '../../model/qr-data/sms';

export class SmsParser implements QrDataParser<Sms> {

    public parse(data: string): Sms {
        data = this.removePrefix(data);
        const parts = data.split(':');

        const sms = new Sms();
        sms.numbers = parts[0].split(',');
        sms.message = parts[1];

        return sms;
    }

    private removePrefix(data: string): string {
        return data.substr('SMSTO:'.length);
    }
}
