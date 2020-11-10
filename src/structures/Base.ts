export default class Base {
	public id: string;
	constructor(id: string) {
		this.id = id;
	}

	public createdAt(): number {
		return Math.floor(parseInt(this.id) / 4194304) + 1420070400000;
	}

	public toString(): string {
		return `[${this.constructor.name} ${this.id}]`;
	}
}
