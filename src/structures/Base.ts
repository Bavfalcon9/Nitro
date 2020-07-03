class Base {
    private _id: string;
    constructor (id: string) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get createdAt() {
        return Math.floor(parseInt(this._id) / 4194304) + 1420070400000;
    }
}
export default Base;