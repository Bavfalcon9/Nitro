export default class Collection<K, V extends { id: string }> extends Map<K, V> {
	private base: any;
	private limit: number;

	/**
	 * @param base Base class of the Collection
	 * @param limit Maximum capacity of the Collection (defaults to limitless)
	 */

	public constructor(base: V, limit: number = Infinity) {
		super();
		this.base = base;
		this.limit = limit;
	}

	public add(obj: V, extra?: unknown[], replace: boolean = true): V {
		if (this.limit === 0) {
			return obj instanceof this.base ||
				obj.constructor.name === this.base.name
				? obj
				: new this.base(obj, extra);
		}
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
				obj instanceof this.base ||
				obj.constructor.name === this.base.name
			)
		) {
			obj = new this.base(obj, extra);
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

	public remove(obj: V) {
		// @ts-ignore
		const item = this.get(obj.id);
		if (!item) {
			return null;
		}
		// @ts-ignore
		this.delete(obj.id);
		return item;
	}

	public some(func: Function): boolean {
		for (const item of this.values()) {
			if (func(item)) {
				return true;
			}
		}
		return false;
	}

	public every(func: Function): boolean {
		for (const item of this.values()) {
			if (!func(item)) {
				return false;
			}
		}
		return true;
	}

	public random(): V {
		const index = Math.floor(Math.random() * this.size);
		const iter = this.values();
		for (let i = 0; i < index; ++i) {
			iter.next();
		}
		return iter.next().value;
	}

	public reduce(func: Function, initialValue?: number) {
		const iter = this.values();
		let val;
		let result =
			initialValue === undefined ? iter.next().value : initialValue;
		while ((val = iter.next().value) !== undefined) {
			result = func(result, val);
		}
		return result;
	}

	public map(func: Function): V[] {
		const arr: V[] = [];
		for (const item of this.values()) {
			arr.push(func(item));
		}
		return arr;
	}

	public find(func: Function): V | undefined {
		for (const item of this.values()) {
			if (func(item)) {
				return item;
			}
		}
		return undefined;
	}

	public filter(func: Function): V[] {
		const arr = [];
		for (const item of this.values()) {
			if (func(item)) {
				arr.push(item);
			}
		}
		return arr;
	}
}
