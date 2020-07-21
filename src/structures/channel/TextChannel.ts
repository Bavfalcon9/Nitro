import Channel from "./Channel.ts";
import MessageContent from "../../network/discord/interfaces/MessageContent.ts";
import RequestManager from "../../rest/RequestManager.ts";
import Message from "../Message.ts";
import SimpleEmbed from "../../utils/discord/SimpleEmbed.ts";

class TextChannel extends Channel {
     public guildId: string;
     public name: string;
     public position: number;
     public permissionOverwrites: any[];
     public rateLimit: number;
     public nsfw: boolean;
     public topic: string;
     public lastMessageId: string;
     public parentId: string;

     constructor(data: any) {
          super(data.id);
          this.guildId = data.guild_id;
          this.name = data.name;
          this.position = data.position;
          this.permissionOverwrites = data.permission_overwrites;
          this.rateLimit = data.rate_limit_per_user;;
          this.nsfw = data.nsfw || false;
          this.topic = data.topic;
          this.lastMessageId = data.last_message_id;
          this.parentId = data.parent_id;
     }

     public static dummyObject(): TextChannel {
          return new TextChannel({
               id: '0',
               name: '0',
               guild_id: '0',
               position: 0,
               permissionOverwrites: [],
               rateLimit: 0,
               nsfw: false,
               topic: '0',
               lastMessageId: '0',
               parentId: '0'
          });
     }

     public send(content: string|MessageContent|SimpleEmbed): Promise<Message> {
          if (typeof content === 'string') {
               content = { content: content };
          }
          return RequestManager.sendMessage(this.id, content);
     }
}
export default TextChannel;