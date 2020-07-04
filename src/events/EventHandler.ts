import { Evt } from "https://deno.land/x/evt/mod.ts";
import EventPacket from "../network/discord/packets/EventPacket.ts";
import Payload from "../network/discord/interfaces/Payload.ts";
import Message from "../structures/Message.ts";
import User from "../structures/User.ts";

class EventHandler {
    public rawEvent?: Evt<Payload>;
    constructor() {
        this.rawEvent = new Evt<Payload>();
    }

    public init(): Evt<Message|User> {
        const messageEvent: Evt<Message> = new Evt<Message>();
        const userUpdate: Evt<User> = new Evt<User>();
        return Evt.merge([messageEvent, userUpdate]);
    }

    public handleEvent(pk: EventPacket): void {
        const event: string = pk.event;
    }
}
export default EventHandler;