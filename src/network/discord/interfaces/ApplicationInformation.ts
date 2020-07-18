import User from "../../../structures/User.ts";

export interface ApplicationInformation {
    id: string;
    name: string;
    icon: string;
    description: string;
    rpc_origins?: string[];
    bot_public: boolean;
    bot_require_code_grant: boolean;
    owner: User;
    summary: string;
    verify_key: string;
    team?: any;
    guild_id?: string;
    primary_sku_id?: string;
    slug?: string;
    cover_image?: string;
}