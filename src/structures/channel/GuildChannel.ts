import Guild from "../guild/Guild.ts";
import PermissionOverwite from "../PermissionOverwrite.ts";
import Channel from "./Channel.ts";

class GuildChannel extends Channel {
  public guild: Guild | undefined;
  public id: string;
  public name: string;
  public type: number;
  public nsfw: boolean;
  public position: string;
  public parentID: string;
  public permissionOverwrites: PermissionOverwite[];

  constructor(data: any, guild?: Guild) {
    // not sure why this exists, the properties are existent on text channel. a simple bool?
    super(data);
    this.id = data.id;
    this.guild = guild;
    this.name = data.name;
    this.type = data.type;
    this.nsfw = data.nsfw;
    this.position = data.position;
    this.parentID = data.parent_id;
    this.permissionOverwrites = data.permission_overwrites
      ? data.permission_overwrites.map((p: any) => new PermissionOverwite(p))
      : [];
  }
}
export default GuildChannel;
