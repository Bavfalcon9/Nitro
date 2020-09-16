import Packet from "./Packet.ts";
import OPCodes from "../interfaces/OPCodes.ts";
import type Payload from "../interfaces/Payload.ts";

class LoginPacket extends Packet {
  public token: string;
  public compress: boolean;
  public intents: Intents;

  public static fromPayload(data: Payload): LoginPacket {
    return new this(data.d.token, data.d.compress);
  }

  constructor(token: string = "", compress: boolean = false) {
    super(OPCodes.IDENTIFY);
    this.token = token;
    this.compress = compress;
    this.intents = new Intents();
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
      intents: this.intents.parse(),
      // todo: https://discord.com/developers/docs/topics/gateway#identify-example-identify
    };
  }
}

export default LoginPacket;
