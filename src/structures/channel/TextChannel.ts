import Channel from "./Channel.ts";

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
          this.permissionOverwrites = data.permissionOverwrites;
          this.rateLimit = data.rateLimit;
          this.nsfw = data.nsfw;
          this.topic = data.topic;
          this.lastMessageId = data.lastMessageId;
          this.parentId = data.parentId;
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
}
export default TextChannel;