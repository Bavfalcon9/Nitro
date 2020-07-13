class Endpoints {
    public static BASE_URL: string = 'https://discordapp.com/api/';
    public static GATEWAY: string = `wss://gateway.discord.gg/?v=6&encoding=json`;
    public static VERSION: string = 'v6';
    public static REST_BASE_URL: string = Endpoints.BASE_URL + Endpoints.VERSION;

    public static CHANNEL = (id: string) => `/channels/${id}`;
    public static CHANNEL_PURGE = (id: string) => `/channels/${id}/messages/bulk-delete`;
    public static CHANNEL_MESSAGES = (id: string, mid: string = '') => `/channels/${id}/messages${mid === '' ? '' : '/' + mid}`;    
}

export default Endpoints;