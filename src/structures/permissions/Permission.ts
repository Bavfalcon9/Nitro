import Base from '../Base.ts';
import Permissions from './Permissions.ts';

export default class Permission extends Base {
	public allow: number;
	public deny: number;

	constructor(allow: number, deny: number = 0) {
		super('');
		this.allow = allow;
		this.deny = deny;
	}

	/**
	 * JSON value of the permission
	 */
	get json(): object {
		let obj: any = {};
		for (const perm of Object.keys(Permissions)) {
			if (!perm.startsWith('all')) {
				// @ts-ignore
				if (this.allow & Permissions[perm]) {
					obj[perm] = true;
					// @ts-ignore
				} else if (this.deny & Permissions[perm]) {
					obj[perm] = false;
				}
			}
		}
		return obj;
	}

	has(permission: keyof typeof Permissions) {
		return Object.keys(this.json).includes(permission);
	}
}
