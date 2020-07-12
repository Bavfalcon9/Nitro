class Base {
    public id: string;
    constructor (id: string) {
        this.id = id;
    }

    get createdAt() {
        return Math.floor(parseInt(this.id) / 4194304) + 1420070400000;
    }
}
export default Base;