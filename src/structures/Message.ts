import User from './User.ts'
import Base from './Base.ts';
class Message extends Base {
    public type: number;
    public tts: boolean;
    public timestamp: string;
    public pinned: boolean;
    public nonce: string | number;
    public mentions: any[]; // Leave as any for now
    public flags: 0;
    public embeds: any[]; // Leave as any for now
    public edited_timestamp: any;
    public content: string;
    public channel: string;
    public author: User;
    public attachments: any[]; // Leave as any for now
    public args?: string[];

    constructor(data: any) {
        super(data.id);
        // probably should add something that autoconstrcuts payloads based on data.
        // To Do: Restructure.
        this.type = data.type;
        this.tts = data.tts || false;
        this.timestamp = data.timestamp || Date.now();
        this.pinned = data.pinned || false;
        this.nonce = data.nonce || null;
        this.mentions = data.mentions;
        this.flags = data.flags;
        this.embeds = data.embeds;
        this.content = data.content;
        this.channel = data.channel;
        this.author = new User(data.author);
        this.attachments = data.attachments; 
    }

    /**
     * Gets the command for the message sent!
     * This function also sets the arguments of the command for you! (pretty neat, huh?)
     */
    public getCommand(prefix: string = '!'): string|null {
        if (this.content && this.content.indexOf(prefix) === 0) {
            this.args = this.content.slice(prefix.length).trim().split(/ +/g);
            return this.args?.shift()?.toLowerCase() || '';
        }
        return null;
    }

    /**
     * Send a message in response into the origin channel.
     * @param msg - Message
     */
    public async send(msg: string): Promise<void> {
        return;
    }
}
export default Message;