import Base from '../structures/Base.ts';

export default class Collection<K, V> extends Map<K, V> {
	// I will fix the generics in the future
	public baseObject: any;
	public limit: number;

	constructor(baseObject: Object, limit: number = Infinity) {
		super();
		this.baseObject = baseObject;
		this.limit = limit;
	}

	public add(obj: V, extra?: any, replace: boolean = true): V {
		if (this.limit === 0) {
			return obj instanceof this.baseObject ||
				// @ts-ignore
				obj.constructor.name === this.baseObject.name
				? obj
				: new this.baseObject(obj, extra);
		}
		// @ts-ignore

		if (obj.id == null) {
			throw new Error('Missing object id');
		}
		// @ts-ignore
		const existing = this.get(obj.id);
		if (existing && !replace) {
			return existing;
		}
		if (
			!(
				obj instanceof this.baseObject ||
				// @ts-ignore
				obj.constructor.name === this.baseObject.name
			)
		) {
			obj = new this.baseObject(obj, extra);
		}
		// @ts-ignore
		this.set(obj.id, obj);

		if (this.limit && this.size > this.limit) {
			const iter = this.keys();
			while (this.size > this.limit) {
				this.delete(iter.next().value);
			}
		}
		return obj;
	}

	every(func: Function): boolean {
		for (const item of this.values()) {
			if (!func(item)) {
				return false;
			}
		}
		return true;
	}

	filter(func: Function): V[] {
		const arr: V[] = [];
		for (const item of this.values()) {
			if (func(item)) {
				arr.push(item);
			}
		}
		return arr;
	}

	find(func: Function) {
		for (const item of this.values()) {
			if (func(item)) {
				return item;
			}
		}
		return undefined;
	}

	map(func: Function) {
		const arr: V[] = [];
		for (const item of this.values()) {
			arr.push(func(item));
		}
		return arr;
	}

	random() {
		const index = Math.floor(Math.random() * this.size);
		const iter = this.values();
		for (let i = 0; i < index; ++i) {
			iter.next();
		}
		return iter.next().value;
	}

	reduce(func: Function, initialValue: number) {
		const iter = this.values();
		let val: number;
		let result =
			initialValue === undefined ? iter.next().value : initialValue;
		while ((val = iter.next().value) !== undefined) {
			result = func(result, val);
		}
		return result;
	}

	remove(obj: V) {
		// @ts-ignore
		const item = this.get(obj.id);
		if (!item) {
			return null;
		}
		// @ts-ignore
		this.delete(obj.id);
		return item;
	}

	some(func: Function) {
		for (const item of this.values()) {
			if (func(item)) {
				return true;
			}
		}
		return false;
	}

	toString() {
		return `[Collection<${this.baseObject.name}>]`;
	}

	toArray() {
		return [...this.values()];
	}

	toJSON() {
		const json: any = {};
		for (const item of this.values()) {
			// @ts-ignore
			json[item.id] = item;
		}
		return json;
	}
}
