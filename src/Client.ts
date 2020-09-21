import type ClientUser from "./structures/ClientUser.ts";
import type Packet from "./network/discord/packets/Packet.ts";
import type { ApplicationInformation } from "./network/discord/interfaces/ApplicationInformation.ts";
import type User from "./structures/User.ts";
import type Message from "./structures/Message.ts";
import type Channel from "./structures/channel/Channel.ts";
import type Guild from "./structures/guild/Guild.ts";
import type Invite from "./structures/guild/Invite.ts";
import { CacheOptions, DefaultOptions } from "./cache/CacheOptions.ts";
import EventHandlerv2 from "./data/EventHandlerv2.ts";
import HeartBeatPacket from "./network/discord/packets/HeartBeatPacket.ts";
import WebsocketManager from "./network/WebsocketManager.ts";
import ProtectedDataStore from "./data/ProtectedStore.ts";
import RequestManager from "./rest/RequestManager.ts";
import Application from "./structures/oauth2/Application.ts";
import DataStore from "./data/DataStore.ts";
import type Intents from "./utils/discord/Intents.ts";

class Client extends EventHandlerv2 {
  public application: Application | null;
  public lastACK?: number;
  public sessionId: string;
  public user!: ClientUser;
  public intents?: Intents;
  private requestManager: RequestManager;
  private wsm?: WebsocketManager;
  private heartInterval?: number;
  private dataStore: DataStore;

  constructor(cacheOptions: CacheOptions = DefaultOptions) {
    super();
    this.application = null;
    this.dataStore = new DataStore(this, cacheOptions);
    this.requestManager = new RequestManager(this);
    this.sessionId = "0";
  }

  public connect(token: string): void {
    if (this.wsm !== undefined) {
      throw new Error(
        "Client already connected! Please terminate the existing connection.",
      );
    }

    ProtectedDataStore.token = token; // redo how this is handled
    this.wsm = new WebsocketManager();
    try {
      this.wsm.init(this);
      this.resolveApplication();
    } catch (err) {
      throw err;
    }
  }

  public initHeartbeat(interval: number): void {
    if (this.heartInterval) {
      throw new Error("Heartbeat already initialized");
    }
    this.heartInterval = setInterval(() => {
      this.sendPacket(new HeartBeatPacket(interval));
    }, interval);
  }

  public reconnect(): void {
    // to do
  }

  public disconnect(): void {
    if (this.wsm === undefined) throw "Client already disconnected.";
    this.wsm?.terminate();
    this.wsm = undefined;
    clearInterval(this.heartInterval);
    this.heartInterval = undefined;
  }

  public sendPacket(pk: Packet): void {
    this.wsm?.send(pk.parsePacket());
  }

  private async resolveApplication(): Promise<void> {
    const res: ApplicationInformation | boolean = await RequestManager
      .getApplication();
    if (typeof res === "boolean") {
      return;
    } else {
      this.application = new Application(res);
    }
  }

  public get channels(): Map<string, Channel> {
    return this.dataStore.channels;
  }

  public get guilds(): Map<string, Guild> {
    return this.dataStore.guilds;
  }

  public get users(): Map<string, User> {
    return this.dataStore.users;
  }

  public get invites(): Map<string, Invite> {
    return this.dataStore.invites;
  }

  public get messages(): Map<string, Message> {
    return this.dataStore.messages;
  }

  public get _dataStore(): DataStore {
    return this.dataStore;
  }
}
export default Client;
