import Client from '../src/Client.ts';
import { exists } from 'https://deno.land/std/fs/exists.ts';
import Message from '../src/structures/Message.ts';
import Logger from '../src/utils/misc/Logger.ts';
import ClearColor from '../src/utils/misc/ClearColor.ts';
import SimpleEmbed from '../src/utils/discord/SimpleEmbed.ts';
const file: string = Deno.cwd() + '/config.json';
const bot: Client = new Client();
Logger.DEBUG_ENABLED = true;
if (!await exists(file)) {
     console.error('Config file could not be found.');
     Deno.exit(0);
}
const { token } = await JSON.parse(Deno.readTextFileSync(Deno.cwd() + "/config.json"));
bot.on('ready', () => {
     console.log(`Logged in: ${bot.user.tag}`)
});
bot.on('message', async (msg: Message) => {
     // success!
     switch (msg.getCommand('!')) {
          case 'ping':
               let m = await msg.channel.send('Pinging');
               let diff = m.timestamp - msg.timestamp;
               m.edit(`Pong! \`${diff}ms\``);
               return;
          case 'del':
               msg.channel.send('Deleting in 5 seconds!').then((m: Message) => {
                    m.delete(5000);
               });
               return;
          case 'stop':
               if (msg.author.id === bot.application?.owner.id) {
                    await msg.channel.send('Disconnecting client.');
                    bot.disconnect();
                    Deno.exit(0);
               } else {
                    msg.channel.send('You are not the bot owner!');
               }
               break;
          case 'channel':
               msg.channel.send(`\`\`\`js\n${JSON.stringify(msg.channel)}\n\`\`\``);
          case 'ce':
               if (!msg.args[0]) {
                    msg.channel.send('Sorry, please provide a color!');
                    return;
               } else {
                    let em = new SimpleEmbed();
                    em.setColor(msg.args[0]);
                    em.setTitle(msg.args[1] || '');
                    em.setDescription(msg.args[2] || '');
                    msg.channel.send(em);
                    break;
               }
          case 'eval':
               if (msg.author.id !== bot.application?.owner.id) {
                    msg.channel.send('You are not the bot owner!');
                    return;
               }
               try {
                    let code = msg.args.join(" ");
                    if (code.search('await') != -1) {
                         code = 'return (async () => { try {' + code + '} catch (e) {return;}})()';
                    }
                    let evaled = eval(code);
                    evaled = ClearColor(Deno.inspect(evaled, {
                         depth: 2
                    }));
                    if (evaled.length >= 2000) {
                         evaled = evaled.split("").slice(0, 1971).join("") + '\nMessage shortened';
                    }
                    msg.channel.send(`\`\`\`js\n${evaled}\`\`\``);
               } catch (err) {
                    msg.channel.send(`\`\`\`js\n${err}\n\`\`\``);
               }
          default:
               return;
     }
});

bot.on('ready', (id: string) => {
     console.log('Logged in with: ' + id);
})
bot.connect(token);