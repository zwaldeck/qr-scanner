export interface QrDataParser<T> {
    parse(data: string): T;
}
