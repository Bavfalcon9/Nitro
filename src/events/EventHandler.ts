import { Evt } from "https://deno.land/x/evt/mod.ts";
import EventPacket from "../network/discord/packets/EventPacket.ts";

class EventHandler {
    constructor() {

    }

    public init(): any {
        const readyEvent = new Evt<EventType>();
        return Evt.merge([readyEvent]);
    }

    public handleEvent(pk: EventPacket): void {
        const event: string = pk.event;
    }
}
export default EventHandler;