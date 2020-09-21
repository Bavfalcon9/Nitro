import type Client from "../Client.ts";
import type EventPacket from "../network/discord/packets/EventPacket.ts";
import ClientUser from "../structures/ClientUser.ts";
import Message from "../structures/Message.ts";
import type { Events } from "./EventHandlerv2.ts";

// Handles how data is processed in nitro
class DataHandler {
  public disabled: Set<Events>;

  public constructor() {
    // If you disable ANY events, it is important to note they will not event be emitted to the client, nor handled internally
    this.disabled = new Set();
  }

  public handlePacket(client: Client, packet: EventPacket): void {
    let evName: Events, evName2: Events;

    // I KNOW THERES A BETTER WAY BUT FOFF
    switch (packet.event) {
      case "READY":
        evName = 'ready';
        break;
      case "CHANNEL_CREATE":
        evName = 'channelCreate';
        break;
      case "CHANNEL_UPDATE":
        evName = 'channelUpdate';
        break;
      case "CHANNEL_DELETE":
        evName = 'channelDelete';
        break;
      case "CHANNEL_PINS_UPDATE":
        evName = 'pinUpdate';
        break;
      case "GUILD_CREATE":
        evName = 'guildCreate';
        break;
      case "GUILD_UPDATE":
        evName = 'guildUpdate';
        break;
      case "GUILD_DELETE":
        evName = 'guildDelete';
        break;
      case "GUILD_BAN_ADD":
        evName = 'banAdd';
        break;
      case "GUILD_BAN_REMOVE":
        evName = 'banRemove';
        break;
      case "GUILD_EMOJIS_UPDATE":
        evName = 'emojisUpdate';
        break;
      case "GUILD_INTEGRATIONS_UPDATE":
        evName = 'integrationsUpdate';
        break;
      case "GUILD_MEMBER_ADD":
        evName = 'memberJoin';
        break;
      case "GUILD_MEMBER_UPDATE":
        evName = 'memberUpdate';
        break;
      case "GUILD_MEMBER_REMOVE":
        evName = 'memberRemove';
        break;
      case "GUILD_MEMBERS_CHUNK":
        evName = 'membersChunk';
        break;
      case "GUILD_ROLE_CREATE":
        evName = 'roleCreate';
        break;
      case "GUILD_ROLE_UPDATE":
        evName = 'roleUpdate';
        break;
      case "GUILD_ROLE_DELETE":
        evName = 'roleDelete';
        break;
      case "INVITE_CREATE":
        evName = 'inviteCreate';
        break;
      case "INVITE_DELETE":
        evName = 'inviteDelete';
        break;
      case "MESSAGE_CREATE":
        evName = 'message';
        evName2 = 'messageCreate';
        break;
      case "MESSAGE_UPDATE":
        evName = 'messageUpdate';
        break;
      case "MESSAGE_DELETE":
        evName = 'messageDelete';
        break;
      case "MESSAGE_DELETE_BULK":
        evName = 'messageDeleteBulk';
        break;
      case "MESSAGE_REACTION_ADD":
        evName = 'reactionAdd';
        break;
      case "MESSAGE_REACTION_UPDATE":
        evName = 'reactionUpdate';
        break;
      case "MESSAGE_REACTION_REMOVE":
        evName = 'reactionRemove';
        break;
      case "MESSAGE_REACTION_REMOVE_ALL":
        evName = 'reactionRemoveAll';
        break;
      case "MESSAGE_REACTION_REMOVE_EMOJI":
        evName = 'reactionRemoveEmoji';
        break;
      case "PRESENCE_UPDATE":
        evName = 'presenceUpdate';
        break;
      case "TYPING_START":
        evName = 'typingStart';
        break;
      case "USER_UPDATE":
        evName = 'userUpdate';
        break;
      case "VOICE_STATE_UPDATE":
        evName = 'voiceStateUpdate';
        break;
      case "VOICE_SERVER_UPDATE":
        evName = 'voiceRegionUpdate';
        break;
      case "WEBHOOKS_UPDATE":
        evName = 'webhookUpdate';
        break;
      case "unknown":
      default:
        evName = 'unknown';
        break;
    }

    if (this.disabled.has(evName)) return;

    let structures: any[];
    if ((this as any)[evName] !== undefined) {
      let returnVal: any = (this as any)[evName](packet.data) || [];
      structures = (returnVal instanceof Array) ? returnVal : [ returnVal ];
      client.emit(evName, ...structures);
    } else {
      client.emit('unknown', { event: evName, data: packet.data });
    }
  }

  /**
   * Emits on ready, returns session id
   * @param client 
   * @param packet 
   */
  protected ready(client: Client, packet: EventPacket): string {
    client.user = new ClientUser(packet.data);
    return packet.data.session_id || "0";
  }

  /**
   * Emitted when the client recieves a message
   * @param client 
   * @param packet
   */
  public messageCreate(client: Client, packet: EventPacket): Message {
    return new Message(packet.data);
  }
}
export default DataHandler;