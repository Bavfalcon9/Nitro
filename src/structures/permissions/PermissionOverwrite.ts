import Permission from './Permission.ts';

export default class PermissionOverwite extends Permission {
	public id: string;
	public type: 'member' | 'role';
	constructor(data: any) {
		super(data.allow, data.deny);
		this.id = data.id;
		this.type = data.type;
	}
}
