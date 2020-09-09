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
import VoiceChannel from "../structures/channel/VoiceChannel.ts";
import CategoryChannel from "../structures/channel/CategoryChannel.ts";
import GuildChannel from "../structures/channel/GuildChannel.ts";

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
        const guild = this.client._cacheManager.guilds.get(data.guild_id);
        let message: Message;

        if (channel) {
            channel.guild = guild || {
                id: data.guild_id
            };
        }

        message = new Message(data, channel, guild);
        this.client._cacheManager.add(message);
        this.client.emit('message', message);
    }

    public onChannelCreate(data: any): void {
        let channel: GuildChannel;
        const guild = this.client._cacheManager.guilds.get(data.guild_id);
        let type: string = Channel.getTypeString(data.type);
        switch(type) {
            case 'text':
                channel = new TextChannel(data, guild);
                this.client._cacheManager.add(channel);
                break;
            case 'voice':
                channel = new VoiceChannel(data, guild);
                this.client._cacheManager.add(channel);
                break;
            case 'category':
                channel = new CategoryChannel(data, guild);
                this.client._cacheManager.add(channel);
                break;
            default:
                channel = new GuildChannel(data);
                this.client._cacheManager.add(channel);
        }

        this.client.emit('channelCreate', channel);
    }

    public onChannelUpdate(data: any): void {
        let channel: GuildChannel;
        const guild = this.client._cacheManager.guilds.get(data.guild_id);
        let type = Channel.getTypeString(data.type);

        switch(type) {
            case 'text':
                channel = new TextChannel(data, guild);
                this.client._cacheManager.add(channel);
                break;
            case 'voice':
                channel = new VoiceChannel(data, guild);
                this.client._cacheManager.add(channel);
                break;
            case 'category':
                channel = new CategoryChannel(data, guild);
                this.client._cacheManager.add(channel);
                break;
            default:
                channel = new GuildChannel(data);
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
            this.onChannelUpdate(c); // this really shouldn't be here.
        });
        this.client.emit('guildCreate', guild);
    }

    public onGuildUpdate(data: any): void {
        data.channels.forEach((c: any) => this.onChannelUpdate(c));
        this.client.emit('')
        // to do update cache
    }
}
export default EventHandler;
