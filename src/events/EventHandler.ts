import EventPacket from "../network/discord/packets/EventPacket.ts";
import Payload from "../network/discord/interfaces/Payload.ts";
import Message from "../structures/Message.ts";
import User from "../structures/User.ts";
import Client from "../Client.ts";

class EventHandler {
    private KNOWN_EVENTS_MAP: any = {
        "": ""
    }
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * initializes the event handler
     */
    public init() {
        
    }

    public handleEvent(name: string, data: Payload): void {
        const keys: string[] = Object.keys(this.KNOWN_EVENTS_MAP);
        if (!keys.includes(name)) {
            // unknown event emitted
            console.log('unknown event sent');
        } else {
            this.client.emit(this.KNOWN_EVENTS_MAP[name], data.d);
        }
    }
}
export default EventHandler;