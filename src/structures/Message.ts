import User from './User.ts'
import Base from './Base.ts';
import Channel from './channel/Channel.ts';
import TextChannel from './channel/TextChannel.ts';
import MessageContent from '../network/discord/interfaces/MessageContent.ts';
import RequestManager from '../rest/RequestManager.ts';
import Sleep from '../utils/misc/Sleep.ts';

class Message extends Base {
    public type: number;
    public tts: boolean;
    public timestamp: number;
    public pinned: boolean;
    public nonce: string | number;
    public mentions: any[]; // Leave as any for now
    public flags: 0;
    public embeds: any[]; // Leave as any for now
    public edited_timestamp: any;
    public content: string;
    public channel_id: string;
    public channel: TextChannel;
    public author: User;
    public attachments: any[]; // Leave as any for now
    public args: string[];

    constructor(data: any, channel?: TextChannel) {
        super(data.id);
        // probably should add something that autoconstrcuts payloads based on data.
        // To Do: Restructure.
        this.type = data.type;
        this.tts = data.tts || false;
        this.timestamp = Date.parse(data.timestamp) || Date.now();
        this.pinned = data.pinned || false;
        this.nonce = data.nonce || null;
        this.mentions = data.mentions;
        this.flags = data.flags;
        this.embeds = data.embeds;
        this.content = data.content;
        this.channel_id = data.channel_id;
        this.channel = channel || this.genDummyChannel();
        this.author = new User(data.author);
        this.attachments = data.attachments;
        this.args = [];
    }

    /**
     * Gets the command for the message sent!
     * This function also sets the arguments of the command for you! (pretty neat, huh?)
     */
    public getCommand(prefix: string = '!'): string|null {
        if (this.content && this.content.indexOf(prefix) === 0) {
            this.args = this.content.slice(prefix.length).trim().split(/ +/g);
            return this.args.shift()?.toLowerCase() || '';
        }
        return null;
    }

    /**
     * Send a message in response into the origin channel.
     * @param msg - Message
     */
    public async reply(msg: string): Promise<Message> {
        return this.channel.send('<@' + this.author.id + '>, ' + msg);
    }

    /**
     * Edit a message
     * @param content - Content
     */
    public async edit(content: string|MessageContent): Promise<Message> {
        if (typeof content === 'string') {
            content = { content: content };
        }
        return RequestManager.editMessage(this.channel_id, this.id, content);
    }

    public async delete(ms: number = -1): Promise<boolean> {
        if (ms > 0) {
            await Sleep(ms);
        }
        const res: boolean = await RequestManager.deleteMessage(this.channel_id, this.id);
        return res;
    }

    private genDummyChannel(): TextChannel {
        const DummyObj= TextChannel.dummyObject();
        DummyObj.id = this.channel_id;
        return new TextChannel(DummyObj);
    }
}
export default Message;