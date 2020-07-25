import EventPacket from '../network/discord/packets/EventPacket.ts';
import Payload from '../network/discord/interfaces/Payload.ts';
import Message from '../structures/Message.ts';
import User from '../structures/User.ts';
import Client from '../Client.ts';
import ClientUser from '../structures/ClientUser.ts';
import Logger from '../utils/misc/Logger.ts';
import Channel from '../structures/channel/Channel.ts';
import TextChannel from '../structures/channel/TextChannel.ts';
import Guild from '../structures/guild/Guild.ts';

class EventHandler {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Handles events from gateway.
     * @param pk - Packet from gateway
     */
    public handleEvent(pk: EventPacket): void {
        new Logger().debug('Packet prehandle: ' + pk.event);
        const name: string = pk.event;
        const funcName = 'on' + name.toLowerCase().split('_').map(e => e.charAt(0).toUpperCase() + e.substr(1)).join('');
        if ((this as any)[funcName] !== undefined) {
            (this as any)[funcName](pk.data);
            return;
        } else {
            this.client.emit('raw' + funcName.replace('on', ''), pk.data);
        }
    }

    /**
     * Called when the gateway calls READY
     * @param data - Ready event
     */
    public async onReady(data: any): Promise<void> {
        this.client.user = new ClientUser(data.user);
        //this.client.gateway.set('version', data.v);
        //this.client.dataManager.add('private_channels', []);
        //this.client.session_id = data.session_id;
        //this.client.shard = data.shard;
        this.client.emit('ready', data.session_id);
    }

    /**
     * Called when the gateway calls MESSAGE
     */
    public onMessageCreate(data: any): void {
        const channel = this.client._cacheManager.channels.get(data.channel_id);
        let message: Message;

        if (channel) {
            channel.guild = this.client._cacheManager.guilds.get(channel.guildId);
        }

        message = new Message(data, channel);
        this.client._cacheManager.add(message);
        this.client.emit('message', message);
    }

    public onChannelCreate(data: any): void {
        let channel: Channel;
        let type: string = Channel.getTypeString(data.type);
        if(type === 'text') {
            channel = new TextChannel(data);
            this.client._cacheManager.add(channel);
        } else {
            channel = new Channel(data.id);
        }

        this.client.emit('channelCreate', channel);
    }

    public onChanneUpdate(data: any): void {
        let channel: Channel;
        let type: string = Channel.getTypeString(data.type);
        if(type === 'text') {
            channel = new TextChannel(data);
            this.client._cacheManager.add(channel);
        } else {
            channel = new Channel(data.id);
            this.client._cacheManager.add(channel);
        }
        
        this.client.emit('channelUpdate', channel);
    }

    public onGuildCreate(data: any): void {
        let guild: Guild = new Guild(data);
        this.client._cacheManager.add(guild);
        // todo: members.
        data.channels.forEach((c: any) => {
            c.guild_id = data.id;
            this.onChanneUpdate(c); // this really shouldn't be here.
        });
        this.client.emit('guildCreate', guild);
    }

    public onGuildUpdate(data: any): void {
        data.channels.forEach((c: any) => this.onChanneUpdate(c));
        this.client.emit('')
        // to do update cache
    }
}
export default EventHandler;