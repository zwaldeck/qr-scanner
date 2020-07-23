import {Mail} from '../../model/qr-data/mail';
import {QrDataParser} from './qr-data-parser';

export class MailtoParser implements QrDataParser<Mail> {

    public parse(data: string): Mail {
        data = this.removePrefix(data);
        const mail = new Mail();

        const parts = data.split('?');
        mail.to = parts[0].split(',');

        const urlParams = new URLSearchParams('?' + parts[1]);
        urlParams.forEach((value: string, key: string) => mail[key.toLowerCase()] = value);

        return mail;
    }

    private removePrefix(data: string): string {
        return data.substr('mailto:'.length);
    }
}
