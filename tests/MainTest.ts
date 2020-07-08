import Client from '../src/Client.ts';
import { exists } from 'https://deno.land/std/fs/exists.ts';
const file: string = Deno.cwd() + '/config.json';
const bot: Client = new Client();

if (!await exists(file)) {
     console.error('Config file could not be found.');
     Deno.exit(0);
}
const { token } = await JSON.parse(Deno.readTextFileSync(Deno.cwd() + "/config.json"));
bot.connect(token);