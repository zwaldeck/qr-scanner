export abstract class AbstractDetailsComponent {

    public phoneNumberAsLink(phone: string): string {
        return `<a href="tel:${phone}">${phone}</a>`;
    }

    public phoneNumbersAsLink(phones: string[]): string {
        let res = '';
        for (const phone of phones) {
            res += this.phoneNumberAsLink(phone) + ', ';
        }

        return res.slice(0, -2);
    }

    public mailAsLink(mail: string): string {
        return `<a href="mailto:${mail}">${mail}</a>`;
    }

    public mailsAsLink(mails: string[]): string {
        let res = '';
        for (const mail of mails) {
            res += this.mailAsLink(mail) + ', ';
        }

        return res.slice(0, -2);
    }
}
