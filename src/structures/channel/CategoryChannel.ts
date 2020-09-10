import Channel from "./Channel.ts";
import MessageContent from "../../network/discord/interfaces/MessageContent.ts";
import RequestManager from "../../rest/RequestManager.ts";
import Message from "../Message.ts";
import SimpleEmbed from "../../utils/discord/SimpleEmbed.ts";
import PermissionOverwite from "../PermissionOverwrite.ts";
import Guild from "../guild/Guild.ts";
import GuildChannel from "./GuildChannel.ts";

class CategoryChannel extends GuildChannel {
     public guild: Guild | undefined;

     constructor(data: any, guild?: Guild) {
          super(data);
          this.guild = guild;
     }

     public static dummyObject(): CategoryChannel {
          return new CategoryChannel({
               id: '0',
               name: '0',
               guildID: '0',
               position: 0,
               permissionOverwrites: [],
          });
     }

     get children() {
          let channels = []
          if(this.guild && this.guild.channels) { 
               for (const channel of this.guild.channels.values()) {
                    if(channel.parentID === this.id) {
                         channels.push(channel);
                    }
               }
          }
          return channels;
     }
}
export default CategoryChannel;
