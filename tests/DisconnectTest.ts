import Client from '../src/Client.ts';
import Logger from '../src/utils/Logger.ts';
const { token } = await JSON.parse(Deno.readTextFileSync(Deno.cwd() + "/config.json"));
const bot: Client = new Client();
Logger.DEBUG_ENABLED = true;
bot.connect(token);
setTimeout(() => {
    new Logger('test').debug('Disconnecting...');
    bot.disconnect();
    bot.connect(token);
    setTimeout(() => {bot.disconnect(); Deno.exit();}, 2000);
    // tset
}, 9000);