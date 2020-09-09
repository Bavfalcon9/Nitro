import Guild from "../guild/Guild.ts";
import PermissionOverwite from "../PermissionOverwrite.ts";
import Channel from "./Channel.ts";
import GuildChannel from "./GuildChannel.ts";

class VoiceChannel extends GuildChannel {
    public guild: Guild | undefined;
    public bitrate: number;
    public userLimit: number;

    constructor(data: any, guild?: Guild) {
        super(data);
        this.guild = guild;
        this.bitrate = data.bitrate; 
        this.userLimit = data.user_limit;
    }

    public static dummyObject(): VoiceChannel {
        return new VoiceChannel({
             id: '0',
             name: '0',
             guildID: '0',
             position: 0,
             permissionOverwrites: [],
             bitrate: 0,
             userLimit: 0,
             nsfw: false,
             parentID: '0'
        });
   }

}
export default VoiceChannel
