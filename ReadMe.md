# Nitro - A fast framework built for the DiscordAPI
Nitro is a Deno wrapper for the discord api designed for performance, and hastely development.
<br />
[![Discord](https://discordapp.com/api/guilds/732017159278034995/embed.png)](https://discord.gg/DqHuW8k)
![Nitro CI](https://github.com/Bavfalcon9/Nitro/workflows/Nitro%20CI/badge.svg)

#### Features:
- Fast and extensible
- Performant
- No dependencies
- Object Oriented
- Controlled Caching
- Native or old Event types.
- Made in typescript :heart: 
## Getting started
For those who want to get something up, heres a little example on how to use the framework.
```ts
import * as Nitro from 'Nitro';
const client: Nitro.Client = new Nitro.Client();
client.connect('mytoken');
// listening to our event
client.on('message', (message: Nitro.Message) => {
    switch (message.getCommand('.')) {
        default:
        case null:
            // no command
            break;
        case 'ping':
            message.channel.send('Pong!');
            break;
    }
});
```
If you still want something to look at, I've left some tests for the framework in [this folder](/tests/).

## API
This will be moving to the docs folder soon.

### Caching
Nitro comes with a bunch of built in API functionality to ease your experience; However since Nitro is designed for speed. Due to this, Nitro does not cache any gateway events by default. Meaning if you wish to cache users, guilds, and channels, you need to tell Nitro you wish to do so.

#### Declaring what you want to cache.
You can tell Nitro what you want to cache by passing the options in the constructor of the client. In the following example `$OPTION` can be one of: `"guilds"`, `"users"`, `"channels"`, `"messages"` and `"invites"`. Please note that the following example contains the default options set by nitro for each property that can be cached.
```ts
$OPTION: {
    enabled: false, // should nitro cache Guild Objects? Defaults to false
    max: 2000, // Max guilds allowed to be cached, if this is reached, no more guilds are cached.
    refresh: true // Should guilds be refreshed with gateway events?
}
```

#### Getting cached users/guilds and invites.
When enabled, you can get cached properties by using: `client.$PROPERTY`, where `$PROPERTY` is the cache option you want to get.
If you have caching disabled, it is important to note that attempting to access these properties will throw an error: `Feature Disabled Error: Caching must be enabled to access "client.$PROPERTY"`.

**Example 1:** Getting cached users from the client.
```ts
import * as Nitro from 'Nitro';
const token = 'NzI4ODA4NjE1NTM1NzA2MTYz.Xv_x-g.In0Tla4SCEcDYkOm8ZcDBtWBG8I';
const client: Nitro.Client = new Nitro.Client({
    caching: {
        users: {
            enabled: true,
            max: 50,
            refresh: true
        }
    }
});

client.connect(token);
await client.cache.fetchAll(); // forces cache to update (this may take a while depending on how large your bot is, and this is strongly discouraged.)
client.users.get('281530702590246914'); // Gets the user with the id: 281530702590246914
```

#### [EXPERIMENTAL] Caching to a database
Because caching can be really straining on memory, we made it possible to cache and fetch from a database using our api. 

**Example 1:**
```ts
const client: Nitro.Client = new Nitro.Client({
    caching: {
        $options: {
            use_db: true,
            put: async (data: any) => {
                // data is the Class itself, so if a message is requesting to be saved, a message object is passed.
                // push to your db
            },
            fetch: async (search: string) => {
                // search is the paramater the user passes when using client.property.fetch('search'); 
                // get from your db
            }
        }
    }
});
client.connect(token);
const user: Nitro.User? = await client.users.get('1');
const user2: Nitro.User? = await client.users.get('2');

if (user && user2) {
    console.log('All users found! Usernames: ' + user.tag + ' ' + user2.tag);
}
```