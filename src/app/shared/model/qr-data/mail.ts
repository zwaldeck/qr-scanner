export class Mail {
    public to: string[];
    public cc: string[];
    public bcc: string[];
    public subject: string;
    public body: string;

    public mailTo(): string {
        let url = 'mailto:';

        url += this.to.length > 0 ? this.joinedEmails(this.to)  + '?' : '?';

        if (this.cc && this.cc.length > 0) {
            url += `cc=${this.joinedEmails(this.cc)}&`;
        }

        if (this.bcc && this.bcc.length > 0) {
            url += `bcc=${this.joinedEmails(this.bcc)}&`;
        }

        if (this.subject && this.subject !== '') {
            url += `subject=${encodeURIComponent(this.subject)}&`;
        }

        if (this.body && this.body !== '') {
            url += `body=${encodeURIComponent(this.body)}&`;
        }

        return url.slice(0, -1);
    }

    private joinedEmails(emailsToJoin: string[]) {
        return emailsToJoin.join(',').slice(0, -1);
    }
}
