import OPCodes from "../interfaces/OPCodes.ts";
import Payload from "../interfaces/Payload.ts";

abstract class Packet {
    private opCode: OPCodes;
    protected data: any = {};
    protected type?: string;

    constructor(opCode: OPCodes, type?: string) {
        this.opCode = opCode;
        this.type = type;
    }

    public parsePacket(): Payload {
        this.encode();
        return {
            d: this.data,
            op: this.opCode,
            t: this.type
        };
    }

    /** Encodes a packet for parsing (sets the data!) */
    protected abstract encode(): void;
}

export default Packet;