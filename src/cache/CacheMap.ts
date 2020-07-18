class CacheMap<key, value> extends Map<key, value> {
    private maxSize: number;

    constructor(entries = null, max: number = -1) {
        super(entries);
        this.maxSize = max;
    }

    public set(key: any, value: any): this {
        if (this.maxSize === this.size) {
            return this;
        }
        return super.set(key, value);
    }

    public get maxEntries(): number {
        return this.maxSize;
    }
}
export default CacheMap;