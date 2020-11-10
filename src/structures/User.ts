import Base from './Base.ts';

export default class User extends Base {
	public username: string;
	public discriminator: string;
	public avatar: string;
	public bot: boolean;
	public system: boolean;
	public mfa: boolean;
	public flags: number;

	constructor(data: any) {
		super(data.id);
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.avatar = data.avatar;
		this.bot = !!data.bot;
		this.system = !!data.system;
		this.mfa = data.mfa_enabled;
		this.flags = data.flagas;
	}

	public get tag(): string {
		return `${this.username}#${this.discriminator}`;
	}
}
