import Channel from "./Channel.ts";
import MessageContent from "../../network/discord/interfaces/MessageContent.ts";
import RequestManager from "../../rest/RequestManager.ts";
import Message from "../Message.ts";
import SimpleEmbed from "../../utils/discord/SimpleEmbed.ts";
import PermissionOverwite from "../PermissionOverwrite.ts";
import Client from "../../Client.ts";
import Guild from "../guild/Guild.ts";
import GuildChannel from "./GuildChannel.ts";

class TextChannel extends GuildChannel {
  public guild: Guild | undefined;
  public rateLimitPerUser: number;
  public lastPinTimestamp: number;
  public topic: string;
  public lastMessageID: string;

  constructor(data: any, guild?: Guild) {
    super(data);
    this.guild = guild;
    this.rateLimitPerUser = data.rate_limit_per_user;
    this.topic = data.topic;
    this.lastMessageID = data.last_message_id;
    this.lastPinTimestamp = data.last_pin_timestamp;
  }

  public static dummyObject(): TextChannel {
    return new TextChannel({
      id: "0",
      name: "0",
      guildID: "0",
      position: 0,
      permissionOverwrites: [],
      rateLimit: 0,
      nsfw: false,
      topic: "0",
      lastMessageId: "0",
      parentID: "0",
    });
  }

  public send(
    content: string | MessageContent | SimpleEmbed,
  ): Promise<Message> {
    if (typeof content === "string") {
      content = { content: content };
    }
    return RequestManager.sendMessage(this.id, content);
  }
}
export default TextChannel;
