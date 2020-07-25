import Base from '../Base.ts';
import Guild from './Guild.ts';
import Channel from '../channel/Channel.ts';
import User from '../User.ts';

class Invite extends Base {
    public code: string;
    public guild: Guild;
    public channel: Channel;
    public inviter: User;

    constructor(data: any) {
        super(data.code);
        this.code = data.code;
        this.guild = new Guild(data.guild);
        this.channel = data.channel;
        this.inviter = new User(data.inviter);
    }
}
export default Invite;