import {QrDataParser} from './qr-data-parser';
import {Wifi} from '../../model/qr-data/wifi';

export class WifiParser implements QrDataParser<Wifi> {

    parse(data: string): Wifi {
        data = this.removePrefix(data);
        const fields = data.split(';')
            .filter(field => field !== '');

        const wifi = new Wifi();
        for (const field of fields) {
            const fieldParts = field.split(':');
            if (fieldParts.length < 2) {
                break;
            }

            const name = fieldParts[0].toUpperCase();
            const value = fieldParts[1];

            switch (name.toUpperCase()) {
                case 'S':
                    wifi.ssid = value;
                    break;
                case 'T':
                    wifi.type = value;
                    break;
                case 'P':
                    wifi.password = value;
                    break;
            }
        }
        return wifi;
    }

    private removePrefix(data: string): string {
        return data.substr('WIFI:'.length);
    }
}
