import {EventEmitter} from '@angular/core';

export class GlobalEmitter {
    // tslint:disable-next-line:variable-name
    private static _emitters: { [ID: string]: EventEmitter<any> } = {};

    public static of(ID: string): EventEmitter<any> {
        if (!this._emitters[ID]) {
            this._emitters[ID] = new EventEmitter<any>();
        }

        return this._emitters[ID];
    }

    public static reset(): void {
        this._emitters = {};
    }

    static get emitters(): { [p: string]: EventEmitter<any> } {
        return this._emitters;
    }

}
