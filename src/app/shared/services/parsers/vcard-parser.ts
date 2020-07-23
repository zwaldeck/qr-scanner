import {Address, Contact} from '../../model/qr-data/contact';
import {QrDataParser} from './qr-data-parser';
import {AbstractVDataParser} from './abstract-vdata-parser';

/**
 * Code ported from 'https://github.com/ertant/vCard/blob/master/parser.js'
 */
export class VCardParser extends AbstractVDataParser<Contact> implements QrDataParser<Contact[]> {

    private static readonly FIELD_PROPERTY_MAPPINGS = {
        TITLE: 'title',
        TEL: 'telephone',
        FN: 'displayName',
        N: 'name',
        EMAIL: 'email',
        CATEGORIES: 'categories',
        ADR: 'address',
        URL: 'url',
        NOTE: 'notes',
        ORG: 'organization',
        BDAY: 'birthday',
        PHOTO: 'photo'
    };

    private static readonly FIELD_PARSERS = {
        BEGIN: AbstractVDataParser.noop,
        VERSION: AbstractVDataParser.noop,
        N: AbstractVDataParser.structured(['surname', 'name', 'additionalName', 'prefix', 'suffix']),
        TITLE: AbstractVDataParser.singleLine,
        TEL: AbstractVDataParser.typedLine,
        EMAIL: AbstractVDataParser.typedLine,
        ADR: VCardParser.addressLine,
        NOTE: AbstractVDataParser.singleLine,
        NICKNAME: AbstractVDataParser.commaSeparatedLine,
        BDAY: AbstractVDataParser.dateLine,
        URL: AbstractVDataParser.singleLine,
        CATEGORIES: AbstractVDataParser.commaSeparatedLine,
        FN: AbstractVDataParser.singleLine,
        ORG: AbstractVDataParser.singleLine,
        UID: AbstractVDataParser.singleLine,
        PHOTO: AbstractVDataParser.singleLine
    };

    private static addressLine(currentRawContact, fieldValue, fieldName, typeInfo) {
        VCardParser.typedLine(currentRawContact, fieldValue, fieldName, typeInfo, VCardParser.addressValueFormatter);
    }

    private static addressValueFormatter(value) {
        const names = value.split(';');
        return {
            // ADR field sequence
            postOfficeBox: names[0],
            number: names[1],
            street: names[2] || '',
            city: names[3] || '',
            region: names[4] || '',
            postalCode: names[5] || '',
            country: names[6] || ''
        };
    }

    constructor() {
        super(VCardParser.FIELD_PROPERTY_MAPPINGS, VCardParser.FIELD_PARSERS);
    }

    protected parseRawObject(rawContact: any): Contact {
        const homeAddress = VCardParser.findByType(rawContact.address, ['HOME']);
        const workAddress = VCardParser.findByType(rawContact.address, ['WORK']);

        const contact = new Contact();
        contact.displayName = rawContact.displayName || '';
        contact.firstName = rawContact.name.name || '';
        contact.lastName = rawContact.name.surname || '';
        contact.mobile = VCardParser.findByType(rawContact.telephone, ['CELL'], true) || '';
        contact.phone = VCardParser.findByType(rawContact.telephone, ['HOME', 'VOICE'], true) || '';
        contact.fax = VCardParser.findByType(rawContact.telephone, ['WORK', 'FAX'], true) || '';
        contact.workPhone = VCardParser.findByType(rawContact.telephone, ['WORK', 'VOICE'], true) || '';
        contact.email = VCardParser.findByType(rawContact.email, ['HOME'], true) || '';
        contact.workEmail = VCardParser.findByType(rawContact.email, ['WORK'], true) || '';
        contact.company = rawContact.organization || '';
        contact.job = rawContact.title || '';
        contact.homeAddress = homeAddress && homeAddress.value ? new Address(
            homeAddress.value.street || '',
            homeAddress.value.number || '',
            homeAddress.value.postOfficeBox || '',
            homeAddress.value.city || '',
            homeAddress.value.postalCode || '',
            homeAddress.value.region || '',
            homeAddress.value.country || '') : null;
        contact.workAddress = workAddress && workAddress.value ? new Address(
            workAddress.value.street || '',
            workAddress.value.number || '',
            workAddress.value.postOfficeBox || '',
            workAddress.value.city || '',
            workAddress.value.postalCode || '',
            workAddress.value.region || '',
            workAddress.value.country || '') : null;
        contact.website = rawContact.url;
        contact.notes = rawContact.notes;
        contact.birthDay = rawContact.birthday || '';

        return contact;
    }
}
