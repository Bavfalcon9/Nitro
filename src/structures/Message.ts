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
}
export default Message;