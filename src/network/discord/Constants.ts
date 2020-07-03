class Constants {
    public static BASE_URL: string = 'https://discord.com/api/';
    public static GATEWAY: string = `wss://gateway.discord.gg/?v=6&encoding=json`;
    public static KNOWN_EVENTS: string[] = [
        'hello', 'guildCreate'
    ];
}

export default Constants;