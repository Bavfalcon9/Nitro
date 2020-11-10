export default interface CacheOptions {
	guilds: Options;
	channels: Options;
	users: Options;
}

interface Options {
	$enabled: boolean;
	$max: number;
}
