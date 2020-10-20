import Packet from "./Packet.ts";
import OPCodes from "../interfaces/OPCodes.ts";
import Intents from "../../../utils/discord/Intents.ts";
import type Payload from "../interfaces/Payload.ts";

class LoginPacket extends Packet {
    public token: string;
    public compress: boolean;
    public intents: number;

    public static fromPayload(
        data: Payload,
        intents: number = Intents.defaults().parse(),
    ): LoginPacket {
        return new this(data.d.token, data.d.compress, intents);
    }

    constructor(token: string = "", compress: boolean = false, intents: number) {
        super(OPCodes.IDENTIFY);
        this.token = token;
        this.compress = compress;
        this.intents = intents;
    }

    protected encode(): void {
        this.data = {
            token: this.token,
            properties: {
                $os: Deno.build.os,
                $browser: "Nitro",
                $device: "github.com/Bavfalcon9/Nitro",
            },
            compress: this.compress,
            intents: this.intents,
            // todo: https://discord.com/developers/docs/topics/gateway#identify-example-identify
        };
    }
}

export default LoginPacket;
