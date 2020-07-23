import {QrDataParser} from './qr-data-parser';
import {Contact} from '../../model/qr-data/contact';

export class MeCardParser implements QrDataParser<Contact> {

    parse(data: string): Contact {
        data = this.removePrefix(data);
        const fields = data.split(';')
            .filter(field => field !== '');

        const contact = new Contact();
        for (const field of fields) {
            const fieldParts = field.split(':');
            if (fieldParts.length < 2) {
                break;
            }

            const name = fieldParts[0].toUpperCase();
            const value = fieldParts[1];

            switch (name.toUpperCase()) {
                case 'N':
                    const nameParts = value.split(',');
                    contact.lastName = nameParts[0];
                    if (nameParts.length === 2) {
                        contact.firstName = nameParts[1];
                    }
                    break;
                case 'TEL':
                    if (!contact.mobile) {
                        contact.mobile = value;
                    }
                    break;
                case 'EMAIL':
                    contact.email = value;
                    break;
                case 'NOTE':
                    contact.notes = value;
                    break;
                case 'BDAY':
                    contact.birthDay = value;
                    break;
                case 'ADR':
                    contact.homeAddressAsString = value;
                    break;
                case 'URL':
                    contact.website = value + ':' + fieldParts[2];
                    break;
                case 'NICKNAME':
                    contact.displayName = value;
                    break;
            }
        }

        return contact;
    }

    private removePrefix(data: string): string {
        return data.substr('MECARD:'.length);
    }
}
