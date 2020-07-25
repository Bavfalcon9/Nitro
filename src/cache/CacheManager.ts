import CacheMap from "./CacheMap.ts";
import Channel from "../structures/channel/Channel.ts";
import Client from "../Client.ts";
import Message from "../structures/Message.ts";
import Payload from "../network/discord/interfaces/Payload.ts";
import TextChannel from "../structures/channel/TextChannel.ts";
import User from "../structures/User.ts";
import { CacheOptions, DefaultOptions } from "./CacheOptions.ts";
import Guild from "../structures/guild/Guild.ts";

class CacheManager {
     private _channels: CacheMap<string, Channel>|null;
     private _guilds: CacheMap<string, any>|null;
     private _users: CacheMap<string, User>|null;
     private _invites: CacheMap<string, any>|null;
     private _messages: CacheMap<string, Message>|null;
     private _opts: CacheOptions;

     constructor(client: Client, opts: CacheOptions) {
          this._opts = opts;
          if (!opts.channels) opts.channels = DefaultOptions.channels;
          if (!opts.guilds) opts.guilds = DefaultOptions.guilds;
          if (!opts.users) opts.users = DefaultOptions.users;
          if (!opts.invites) opts.invites = DefaultOptions.invites;
          if (!opts.messages) opts.messages = DefaultOptions.users;

          if (!opts.$options || !opts.$options.use_db) {
               this._channels = (!opts.channels?.enabled) ? null : new CacheMap(null, opts.channels.max);
               this._guilds = (!opts.guilds?.enabled) ? null : new CacheMap(null, opts.guilds.max);
               this._users = (!opts.users?.enabled) ? null : new CacheMap(null, opts.users.max);
               this._invites = (!opts.invites?.enabled) ? null : new CacheMap(null, opts.invites.max);
               this._messages = (!opts.messages?.enabled) ? null : new CacheMap(null, opts.messages.max);
          } else {
               throw 'Database API still WIP';
          }
     }

     public get channels(): CacheMap<any, any> {
          return this._channels || new CacheMap();
     }

     public get guilds(): CacheMap<any, any> {
          return this._guilds || new CacheMap();
     }

     public get users(): CacheMap<any, any> {
          return this._users || new CacheMap();
     }

     public get invites(): CacheMap<any, any> {
          return this._invites || new CacheMap();
     }

     public get messages(): CacheMap<any, any> {
          return this._messages || new CacheMap();
     }

     public add(type: Channel|User|Message|Guild): void {
          const typeCache: string = type.constructor.name.toLowerCase().replace(/(text|voice)/ig, '') + 's';
          (this as any)[typeCache]?.set(type.id, type);
          // easy hack lol
     }
}
export default CacheManager;