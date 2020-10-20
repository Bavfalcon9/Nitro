import { GenericFunction, WrappedFunction } from "https://deno.land/std@0.74.0/node/events.ts";
import { EventEmitter } from '../../deps.ts';

export type Events =
    | "unknown"
    | "ready"
    | "resume"
    | "reconnect"
    | "disconnect"
    | "channelCreate"
    | "channelUpdate"
    | "channelDelete"
    | "pinUpdate"
    | "guildCreate"
    | "guildUpdate"
    | "guildDelete"
    | "banAdd"
    | "banRemove"
    | "emojisUpdate"
    | "integrationsUpdate"
    | "memberJoin"
    | "memberRemove"
    | "memberUpdate"
    | "membersChunk"
    | "roleCreate"
    | "roleUpdate"
    | "roleDelete"
    | "inviteCreate"
    | "inviteDelete"
    | "message"
    | "messageCreate"
    | "messageUpdate"
    | "messageDelete"
    | "messageDeleteBulk"
    | "reactionAdd"
    | "reactionUpdate"
    | "reactionRemove"
    | "reactionRemoveAll"
    | "reactionRemoveEmoji"
    | "presenceUpdate"
    | "typingStart"
    | "userUpdate"
    | "voiceStateUpdate"
    | "voiceRegionUpdate"
    | "webhookUpdate";
class EventHandlerv2 extends EventEmitter {
    public on(event: Events, listener: GenericFunction | WrappedFunction): any {
        return super.on(event, listener);
    }
}
export default EventHandlerv2;
