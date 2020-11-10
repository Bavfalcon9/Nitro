import Base from './Base.ts';
import User from './User.ts';

export default class ClientUser extends User {
	public verified: boolean;
	public email: string;

	constructor(data: any) {
		super(data);
		this.verified = data.verified;
		this.email = data.email;
	}
}
