import type Client from "../../Client.ts";
import type CategoryChannel from "../../structures/channel/CategoryChannel.ts";
import Channel from "../../structures/channel/Channel.ts";
import type TextChannel from "../../structures/channel/TextChannel.ts";
import type VoiceChannel from "../../structures/channel/VoiceChannel.ts";
import BaseStore from "../BaseStore.ts";

// we need this because channels are multiple objects
class ChannelStore extends BaseStore {
    public constructor(client: Client) {
        super(client);
        this.structure = Channel;
    }

    public has(idInstance: any | string): boolean {
        let id: string = this.resolveId(idInstance) || "_";
        return this.cache.has(id);
    }

    public resolve(
        idInstance: any | string,
    ): null | TextChannel | VoiceChannel | CategoryChannel {
        if (idInstance instanceof this.structure) return idInstance;
        if (typeof idInstance === "string") {
            return this.cache.get(idInstance) || null;
        }
        return null;
    }

    protected forceResolve(
        idInstance: any | string,
    ): null | TextChannel | VoiceChannel | CategoryChannel {
        if (idInstance instanceof this.structure) return idInstance;
        if (typeof idInstance === "string") {
            return this.cache.get(idInstance) || null;
        }
        return new this.structure(idInstance);
    }

    public resolveId(idInstance: any | string): string | null {
        if (idInstance instanceof this.structure) return idInstance.id;
        if (typeof idInstance === "string") {
            return this.cache.get(idInstance).id || null;
        }
        return null;
    }
}
export default ChannelStore;
