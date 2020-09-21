import type Client from "../Client.ts";
import type EventPacket from "../network/discord/packets/EventPacket.ts";
import type { Events } from "./EventHandlerv2.ts";
import Channel from "../structures/channel/Channel.ts";
import TextChannel from "../structures/channel/TextChannel.ts";
import ClientUser from "../structures/ClientUser.ts";
import Guild from "../structures/guild/Guild.ts";
import Message from "../structures/Message.ts";
import CategoryChannel from "../structures/channel/CategoryChannel.ts";
import VoiceChannel from "../structures/channel/VoiceChannel.ts";

// Handles how data is processed in nitro
class DataHandler {
  public disabled: Set<Events>;

  public constructor() {
    // If you disable ANY events, it is important to note they will not event be emitted to the client, nor handled internally
    this.disabled = new Set();
  }

  public handlePacket(client: Client, packet: EventPacket): void {
    let evName: Events;
    let evName2: Events|undefined = undefined;

    // I KNOW THERES A BETTER WAY BUT FOFF
    switch (packet.event) {
      case "READY":
        evName = "ready";
        break;
      case "CHANNEL_CREATE":
        evName = "channelCreate";
        break;
      case "CHANNEL_UPDATE":
        evName = "channelUpdate";
        break;
      case "CHANNEL_DELETE":
        evName = "channelDelete";
        break;
      case "CHANNEL_PINS_UPDATE":
        evName = "pinUpdate";
        break;
      case "GUILD_CREATE":
        evName = "guildCreate";
        break;
      case "GUILD_UPDATE":
        evName = "guildUpdate";
        break;
      case "GUILD_DELETE":
        evName = "guildDelete";
        break;
      case "GUILD_BAN_ADD":
        evName = "banAdd";
        break;
      case "GUILD_BAN_REMOVE":
        evName = "banRemove";
        break;
      case "GUILD_EMOJIS_UPDATE":
        evName = "emojisUpdate";
        break;
      case "GUILD_INTEGRATIONS_UPDATE":
        evName = "integrationsUpdate";
        break;
      case "GUILD_MEMBER_ADD":
        evName = "memberJoin";
        break;
      case "GUILD_MEMBER_UPDATE":
        evName = "memberUpdate";
        break;
      case "GUILD_MEMBER_REMOVE":
        evName = "memberRemove";
        break;
      case "GUILD_MEMBERS_CHUNK":
        evName = "membersChunk";
        break;
      case "GUILD_ROLE_CREATE":
        evName = "roleCreate";
        break;
      case "GUILD_ROLE_UPDATE":
        evName = "roleUpdate";
        break;
      case "GUILD_ROLE_DELETE":
        evName = "roleDelete";
        break;
      case "INVITE_CREATE":
        evName = "inviteCreate";
        break;
      case "INVITE_DELETE":
        evName = "inviteDelete";
        break;
      case "MESSAGE_CREATE":
        evName = "messageCreate";
        evName2 = "message";
        break;
      case "MESSAGE_UPDATE":
        evName = "messageUpdate";
        break;
      case "MESSAGE_DELETE":
        evName = "messageDelete";
        break;
      case "MESSAGE_DELETE_BULK":
        evName = "messageDeleteBulk";
        break;
      case "MESSAGE_REACTION_ADD":
        evName = "reactionAdd";
        break;
      case "MESSAGE_REACTION_UPDATE":
        evName = "reactionUpdate";
        break;
      case "MESSAGE_REACTION_REMOVE":
        evName = "reactionRemove";
        break;
      case "MESSAGE_REACTION_REMOVE_ALL":
        evName = "reactionRemoveAll";
        break;
      case "MESSAGE_REACTION_REMOVE_EMOJI":
        evName = "reactionRemoveEmoji";
        break;
      case "PRESENCE_UPDATE":
        evName = "presenceUpdate";
        break;
      case "TYPING_START":
        evName = "typingStart";
        break;
      case "USER_UPDATE":
        evName = "userUpdate";
        break;
      case "VOICE_STATE_UPDATE":
        evName = "voiceStateUpdate";
        break;
      case "VOICE_SERVER_UPDATE":
        evName = "voiceRegionUpdate";
        break;
      case "WEBHOOKS_UPDATE":
        evName = "webhookUpdate";
        break;
      case "unknown":
      default:
        evName = "unknown";
        break;
    }

    if (this.disabled.has(evName)) return;

    let structures: any[];
    if ((this as any)[evName] !== undefined) {
      let returnVal: any = (this as any)[evName](client, packet.data) || [];
      structures = (returnVal instanceof Array) ? returnVal : [returnVal];
      client.emit(evName, ...structures);
      if (evName2) {
        client.emit(evName2, ...structures);
      }
    } else {
      client.emit("unknown", { event: evName, data: packet.data });
    }
  }

  /**
   * Emits on ready, returns session id
   * @param client 
   * @param packet 
   */
  protected ready(client: Client, data: any): string {
    client.user = new ClientUser(data.user);
    return data.session_id || "0";
  }

  /**
   * Creates a channel
   * @param client 
   * @param data 
   */
  public channelCreate(client: Client, data: any): Channel {
    let channel!: Channel;
    let guild: Guild | null;
    guild = client.guilds.get(data.guild_id) || Guild.dummyObject();

    switch (Channel.getTypeString(data.type)) {
      case "text":
        channel = new TextChannel(data);
        break;
      case "category":
        channel = new CategoryChannel(data);
        break;
      case "voice":
        channel = new VoiceChannel(data);
        break;
      case "news":
        channel = new TextChannel(data);
        break;
    }

    client._dataStore._channels?.set(channel);

    return channel || new Channel(data);
  }

  /**
   * Called when a channel is updated
   * @param client 
   * @param data 
   */
  public channelUpdate(client: Client, data: any): Channel {
    return this.channelCreate(client, data);
  }

  /**
   * Calls when the socket sends a create guild event.
   * @param client 
   * @param packet 
   */
  public guildCreate(client: Client, data: any): Guild {
    let guild: Guild = new Guild(data);
    client._dataStore._guilds?.set(guild);

    data.channels.forEach((channel: any) => {
      channel.guild_id = guild.id;
      this.channelCreate(client, channel);
    });
    return guild;
  }

  /**
   * Emitted when the client recieves a message
   * @param client 
   * @param packet
   */
  public messageCreate(client: Client, data: any): Message {
    let message: Message, channel: TextChannel|undefined;
    channel = client.channels.get(data.id) as TextChannel|undefined;
    message = new Message(data, channel);
    client._dataStore._users?.set(message.author);
    client._dataStore._messages?.set(message);
    return message;
  }
}
export default DataHandler;
