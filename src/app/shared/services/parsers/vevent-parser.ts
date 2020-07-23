import {Address, Contact} from '../../model/qr-data/contact';
import {QrDataParser} from './qr-data-parser';
import {AbstractVDataParser} from './abstract-vdata-parser';
import {VEvent} from '../../model/qr-data/vevent';

/**
 * Code ported from 'https://github.com/ertant/vCard/blob/master/parser.js'
 */
export class VEventParser extends AbstractVDataParser<VEvent> implements QrDataParser<VEvent[]> {

    private static readonly FIELD_PROPERTY_MAPPINGS = {
        SUMMARY: 'summary',
        DESCRIPTION: 'description',
        LOCATION: 'location',
        DTSTART: 'start',
        DTEND: 'end'
    };

    private static readonly FIELD_PARSERS = {
        BEGIN: AbstractVDataParser.noop,
        VERSION: AbstractVDataParser.noop,
        SUMMARY: AbstractVDataParser.singleLine,
        DESCRIPTION: AbstractVDataParser.singleLine,
        LOCATION: AbstractVDataParser.singleLine,
        DTSTART: AbstractVDataParser.singleLine,
        DTEND: AbstractVDataParser.singleLine
    };

    constructor() {
        super(VEventParser.FIELD_PROPERTY_MAPPINGS, VEventParser.FIELD_PARSERS);
    }

    protected parseRawObject(raw: any): VEvent {
        const event = new VEvent();
        event.summary = raw.summary || '';
        event.description = raw.description || '';
        event.location = raw.location || '';
        event.start = raw.start ? raw.start : new Date().toISOString();
        event.end = raw.end || event.start;
        return event;
    }
}
