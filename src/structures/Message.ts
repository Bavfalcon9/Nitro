import User from './User.ts'
import Base from './Base.ts';
class Message extends Base {
    constructor(
        public type: number,
        public tts: boolean,
        public timestamp: string,
        public pinned: boolean,
        public nonce: string | number,
        public mentions: Array<any>, // Leave as any for now
        public mention_roles: Array<any>, // Leave as any for now
        public mention_everyone: boolean,
        // public member: GuildMember // We still have to make this structure
        public id: string,
        public flags: 0,
        public embeds: Array<any>, // Leave as any for now
        public edited_timestamp: any,
        public content: string,
        public channel_id: string,
        public author: User,
        public attachments: Array<any>, // Leave as any for now
        public guild_id: string
    ) {super(id)}
}
export default Message;
