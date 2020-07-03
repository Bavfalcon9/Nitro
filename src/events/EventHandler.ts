import Constants from "../discord/Constants.ts";
import Payload from "../discord/interfaces/Payload.ts";
import Client from "../Client.ts";
import ClientUser from '../ClientUser.ts'
import Message from '../structures/Message.ts'
class EventHandler {
    private event!: string;
    private data!: any;
    private client!: Client;
    constructor(payload: Payload, client: Client) { 
        if(payload.t) {
            this.event = payload.t;
            this.data = payload.d
            this.client = client;
        }
    }
    handleEvent() {
        switch(this.event) {
            case 'GUILD_CREATE':
                console.log("Guild created")
                break;
            case 'READY':
                const user = this.data.user;
                this.client.user = new ClientUser(
                    user.avatar,
                    user.bot,
                    user.discriminator,
                    user.email,
                    user.flags,
                    user.id,
                    user.mfa_enabled,
                    user.username,
                    user.verified
                )
                console.log(this.client.user)
                this.client.emit('ready');
                break;
            case 'MESSAGE_CREATE':
                this.client.emit('messageCreate', this.data);
                break;
        }

    }
}
export default EventHandler;