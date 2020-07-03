import Client from '../src/Client.ts';
import { token } from '../config.json';
const bot: Client = new Client();

bot.connect(token);