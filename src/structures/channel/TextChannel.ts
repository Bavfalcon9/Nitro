import type MessageContent from "../../network/discord/interfaces/MessageContent.ts";
import type Message from "../Message.ts";
import type SimpleEmbed from "../../utils/discord/SimpleEmbed.ts";
import type Guild from "../guild/Guild.ts";
import Channel from "./Channel.ts";
import RequestManager from "../../rest/RequestManager.ts";
import PermissionOverwite from "../PermissionOverwrite.ts";
import Client from "../../Client.ts";
import GuildChannel from "./GuildChannel.ts";

class TextChannel extends GuildChannel {
    public rateLimitPerUser: number;
    public lastPinTimestamp: number;
    public topic: string;
    public lastMessageID: string;

    constructor(data: any, guild?: Guild) {
        super(data, guild);
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
