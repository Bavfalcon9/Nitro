import Packet from "./Packet.ts";
import OPCodes from "../interfaces/OPCodes.ts";
import Payload from "../interfaces/Payload.ts";

class EventPacket extends Packet {
    public event: string;
    public data: any;

    public static fromPayload(data: Payload): EventPacket {
        return new this(data.t, data.d);
    }

    constructor(event: string|undefined, data: any) {
        super(OPCodes.DISPATCH);
        this.event = event || '';
        this.data = data;
    }

    protected encode(): void {
        // you cant send events
    }
}

export default EventPacket;;