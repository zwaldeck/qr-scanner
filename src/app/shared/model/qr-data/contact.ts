import {exitCodeFromResult} from '@angular/compiler-cli';

export class Contact {

    public displayName: string;
    public firstName: string;
    public lastName: string;
    public mobile: string;
    public phone: string;
    public fax: string;
    public workPhone: string;
    public email: string;
    public workEmail: string;
    public company: string;
    public job: string;
    public homeAddress: Address;
    public homeAddressAsString: string;
    public workAddress: Address;
    public website: string;
    public notes: string;
    public birthDay: string;
}

export class Address {
    public constructor(public street: string,
                       public num: string,
                       public postOfficeBox: string,
                       public city: string,
                       public zip: string,
                       public region: string,
                       public country: string) {
    }

    public toString(): string {
        let address = '';

        if (this.street) {
            address += this.street + ' ';
        }

        if (this.num) {
            address += this.num + ' ';
        }

        if (this.postOfficeBox) {
            address += this.postOfficeBox + ' ';
        }

        if (this.city) {
            address += this.city + ' ';
        }

        if (this.zip) {
            address += this.zip + ' ';
        }

        if (this.region) {
            address += this.region + ' ';
        }

        if (this.country) {
            address += this.country + ' ';
        }

        return address;
    }
}
