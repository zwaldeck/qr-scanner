import {QrDataParser} from './qr-data-parser';

export class PhoneParser implements QrDataParser<string>{
    parse(data: string): string {
        return data.substr('tel:'.length);
    }

}
