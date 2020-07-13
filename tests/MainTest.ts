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
bot.on('message', async (msg: Message) => {
     // success!
     switch (msg.getCommand('!')) {
          case 'ping':
               msg.channel.send('Pong!');
               return;
          case 'stop':
               if (msg.author.id === '281530702590246914') {
                    if (msg.args[0] === 'please') {
                         await msg.channel.send('Stopping...');
                         await bot.disconnect();
                         Deno.exit(0);
                    } else {
                         msg.channel.send('No...');
                    }
               } else {
                    msg.channel.send('What do you think you are doing?');
               }
               break;
          case 'channel':
               msg.channel.send(`\`\`\`js\n${JSON.stringify(msg.channel)}\n\`\`\``);
          default:
               return;
     }
});

bot.on('ready', (id: string) => {
     console.log('Logged in with: ' + id);
})
bot.connect(token);