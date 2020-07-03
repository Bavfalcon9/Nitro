import User from "./User.ts";
class ClientUser extends User {
    public email: string | null;
    public flags: number;
    public mfa_enabled: boolean;
    public verified: boolean;

    constructor(data: any) {
        super(data);
        this.email = data.email;
        this.flags = data.flags;
        this.mfa_enabled = data.mfa_enabled;
        this.verified = data.verified;
    }
}
export default ClientUser;