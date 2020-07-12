import User from "../structures/User.ts";
import TextChannel from "../structures/channel/TextChannel.ts";
import Client from "../Client.ts";
import Payload from "../network/discord/interfaces/Payload.ts";
import Message from "../structures/Message.ts";

class CacheManager {
     private _users: Map<string, User>;
     private _textChannels: Map<string, TextChannel>;

     constructor(client: Client, opts: any) {
          this._users = new Map();
          this._textChannels = new Map();

          client.on('raw', (payload: Payload) => {

          })
     }

     public get users() {
          return this._users;
     }

     public get textChannels() {
          return this._textChannels;
     }

     public add(type: TextChannel|User|Message): void {
          if (type instanceof TextChannel) {
               this.textChannels.set(type.id, type);
          }
          if (type instanceof User) {
               this.users.set(type.id, type);
          }
     }
}

export default CacheManager;