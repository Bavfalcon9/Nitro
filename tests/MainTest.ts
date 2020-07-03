import Client from '../src/Client.ts';
const { token } = await JSON.parse(Deno.readTextFileSync(Deno.cwd() + "/config.json"));
const bot: Client = new Client();

bot.connect(token);