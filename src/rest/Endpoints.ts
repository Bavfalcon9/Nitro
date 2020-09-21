class Endpoints {
  public static BASE_URL: string = "https://discordapp.com/api/";
  public static GATEWAY: string = `wss://gateway.discord.gg/?v=6&encoding=json`; // &compress=zlib-stream
  public static VERSION: string = "v8";
  public static REST_BASE_URL: string = Endpoints.BASE_URL + Endpoints.VERSION;

  public static OAUTH2_APPLICATION = (id: string = "@me") =>
    `/oauth2/applications/${id}`;

  public static CHANNEL = (id: string) => `/channels/${id}`;
  public static CHANNEL_PURGE = (id: string) =>
    `/channels/${id}/messages/bulk-delete`;
  public static CHANNEL_MESSAGES = (id: string, mid: string = "") =>
    `/channels/${id}/messages${mid === "" ? "" : "/" + mid}`;

  public static GUILD = (id: string) => `/guilds/${id}`;
  public static GUILD_ROLES = (id: string) => `/guilds/${id}/roles`;

  public static CREATE_BAN = (id: string, mid: string) =>
    `/guilds/${id}/bans/${mid}`;
  public static CREATE_KICK = (id: string, mid: string) =>
    `/guilds/${id}/members/${mid}`;

  public static get(
    method: (...params: any[]) => string,
    ...params: string[]
  ): string {
    return Endpoints.BASE_URL + method(...params);
  }
}

export default Endpoints;
