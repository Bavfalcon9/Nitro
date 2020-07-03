import Base from "./structures/Base.ts";

class ClientUser extends Base {
    constructor(
        public avatar: string,
        public bot: boolean,
        public discriminator: string,
        public email: string | null,
        public flags: number,
        public id: string,
        public mfa_enabled: boolean,
        public username: string,
        public verified: boolean
    ) {super(id)}
}
export default ClientUser;
