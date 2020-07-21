import Base from '../Base.ts';
import User from '../User.ts';

class Application extends Base {
    public name: string;
    public icon: string;
    public description: string;
    public rpc_origins?: string[];
    public bot_public: boolean;
    public bot_require_code_grant: boolean;
    public owner: User;
    public summary: string;
    public verify_key: string;
    public team?: any;
    public guild_id?: string;
    public primary_sku_id?: string;
    public slug?: string;
    public cover_image?: string;

    constructor(data: any) {
        super(data.id || '');
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.bot_public = data.bot_public;
        this.bot_require_code_grant = data.bot_require_code_grant;
        this.owner = new User(data.owner);
        this.summary = data.summary;
        this.verify_key = data.verify_key;
        this.team = data.team || false;
        this.guild_id = data.guild_id || false;
        this.primary_sku_id = data.primary_sku_id || false;
        this.slug = data.slug || false;
        this.cover_image = data.cover_image || false;
    }
}
export default Application;