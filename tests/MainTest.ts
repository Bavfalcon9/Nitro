import Client from '../src/Client.ts';
import { exists } from 'https://deno.land/std/fs/exists.ts';
import Message from '../src/structures/Message.ts';
import Logger from '../src/utils/Logger.ts';
const file: string = Deno.cwd() + '/config.json';
const bot: Client = new Client();
Logger.DEBUG_ENABLED = true;
if (!await exists(file)) {
     console.error('Config file could not be found.');
     Deno.exit(0);
}
const { token } = await JSON.parse(Deno.readTextFileSync(Deno.cwd() + "/config.json"));
bot.on('message', (msg: Message) => {
     // success!
     switch (msg.getCommand('?')) {
          case 'ping':
               console.log(':)');
               return;
          case 'stop':
               if (msg.author.id === '281530702590246914') {
                    if (msg.args[0] === 'please') {
                         bot.disconnect();
                         console.log('Stopped!!!');
                         Deno.exit(0);
                    }
               }
               break;
          case 'channel':
               console.log(msg.channel.name);
          default:
               return;
     }
});

bot.on('ready', (id: string) => {
     console.log('Logged in with: ' + id);
})
bot.connect(token);