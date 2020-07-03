import Packet from "./Packet.ts";
import OPCodes from "../interfaces/OPCodes.ts";

class LoginPacket extends Packet {
    public token: string;
    constructor(token: string = '') {
        super(OPCodes.IDENTIFY);
        this.token = token;
    }

    protected encode(): void {
        this.data = {
            token: this.token,
            properties: {
                $os: Deno.build.os,
                $browser: "NitroTS",
                $device: "github.com/Bavfalcon9/Nitro",
            }
            // todo: https://discord.com/developers/docs/topics/gateway#identify-example-identify
        };
    }
}

export default LoginPacket;