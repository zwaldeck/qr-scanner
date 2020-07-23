import {Mail} from '../../model/qr-data/mail';
import {QrDataParser} from './qr-data-parser';

export class MatmsgParser implements QrDataParser<Mail> {

    public parse(data: string): Mail {
        data = this.removePrefix(data);
        const fields = data.split(';')
            .filter(field => field !== '');
        const mail = new Mail();

        for (const field of fields) {
            const fieldParts = field.split(':');
            if (fieldParts.length < 2) {
                break;
            }
            const name = fieldParts[0].toUpperCase();
            const value = fieldParts[1];

            if (name === 'SUB' || name === 'BODY') {
                mail[name === 'SUB' ? 'subject' : name.toLowerCase()] = value;
            } else {
                mail[name.toLowerCase()] = value.split(',');
            }
        }

        return mail;
    }

    private removePrefix(data: string): string {
        return data.substr('MATMSG:'.length);
    }
}
