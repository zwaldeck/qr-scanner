import {ActionType} from './action-type.enum';
import {QrType} from './qr-type.enum';
import {DataType} from './data.type';

export class QR {

    constructor(public readonly type: QrType,
                public readonly actionType: ActionType,
                public readonly dataType: DataType,
                public readonly data: string,
                public readonly createdAt: Date = new Date(),
                public favorite: boolean = false) {
    }
}
