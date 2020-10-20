import type { CacheOptions } from "../cache/CacheOptions.ts";
import type Client from "../Client.ts";
import Channel from "../structures/channel/Channel.ts";
import Guild from "../structures/guild/Guild.ts";
import Invite from "../structures/guild/Invite.ts";
import Message from "../structures/Message.ts";
import User from "../structures/User.ts";
import BaseStore from "./BaseStore.ts";

class DataStore {
    public _channels: BaseStore | null;
    public _guilds: BaseStore | null;
    public _users: BaseStore | null;
    public _invites: BaseStore | null;
    public _messages: BaseStore | null;
    #opts: CacheOptions;

    public constructor(client: Client, opts: CacheOptions) {
        this.#opts = opts;
        if (!opts.database || !opts.database.use_db) {
            this._channels = (opts.channels?.enabled)
                ? new BaseStore(client, opts.channels.max || 2048, Channel)
                : null;
            this._guilds = (opts.guilds?.enabled)
                ? new BaseStore(client, opts.guilds.max || 2048, Guild)
                : null;
            this._users = (opts.users?.enabled)
                ? new BaseStore(client, opts.users.max || 2048, User)
                : null;
            this._invites = (opts.invites?.enabled)
                ? new BaseStore(client, opts.invites.max || 2048, Invite)
                : null;
            this._messages = (opts.invites?.enabled)
                ? new BaseStore(client, opts.messages?.max || 2048, Message)
                : null;
        } else {
            throw "DB Api not working";
        }
    }

    public get channels(): Map<string, Channel> {
        return this._channels?.getAll() || new Map();
    }

    public get guilds(): Map<string, Guild> {
        return this._guilds?.getAll() || new Map();
    }

    public get users(): Map<string, User> {
        return this._users?.getAll() || new Map();
    }

    public get invites(): Map<string, Invite> {
        return this._invites?.getAll() || new Map();
    }

    public get messages(): Map<string, Message> {
        return this._messages?.getAll() || new Map();
    }
}
export default DataStore;
