export class Wifi {
    public ssid: string;
    public type: string;
    public password: string;

    public toQrData() {
        return `WIFI:S:${this.ssid};${this.type || 'WPA'};P:${this.password || ''}`;
    }
}
