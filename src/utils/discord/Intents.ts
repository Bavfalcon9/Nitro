export type IntentTypes =
    | "guilds"
    | "members"
    | "bans"
    | "emojis"
    | "integrations"
    | "webhooks"
    | "invites"
    | "voiceStates"
    | "presences"
    | "messages"
    | "messageReactions"
    | "messageTyping"
    | "directMessages"
    | "directMessageReactions"
    | "directMessageTyping"
    | "all"
    | "default";

export enum IntentCodes {
    GUILDS = 1 << 0,
    MEMBERS = 1 << 1,
    BANS = 1 << 2,
    EMOJIS = 1 << 3,
    INTEGRATIONS = 1 << 4,
    WEBHOOKS = 1 << 5,
    INVITES = 1 << 6,
    VOICE_STATES = 1 << 7,
    PRESENCES = 1 << 8,
    MESSAGES = 1 << 9,
    MESSAGE_REACTIONS = 1 << 10,
    MESSAGE_TYPING = 1 << 11,
    DIRECT_MESSAGES = 1 << 12,
    DIRECT_MESSAGE_REACTIONS = 1 << 13,
    DIRECT_MESSAGE_TYPING = 1 << 14,
    PRIVILEGED = IntentCodes.PRESENCES + IntentCodes.MEMBERS,
}
class Intents {
    private currentIntents: IntentTypes[];

    public constructor(intents: IntentTypes[] = []) {
        this.currentIntents = intents;
    }

    public static defaults(): Intents {
        return new this(["default"]);
    }

    public static all(): Intents {
        return new this(["all"]);
    }

    public static privileged(): Intents {
        return new this(["presences", "members"]);
    }

    public static from(n: number): Intents {
        let allowed: IntentTypes[] = [];
        if ((n & IntentCodes.BANS) === IntentCodes.BANS) allowed.push('bans');
        if ((n & IntentCodes.GUILDS) === IntentCodes.GUILDS) allowed.push('guilds');
        if ((n & IntentCodes.EMOJIS) === IntentCodes.EMOJIS) allowed.push('emojis');
        if ((n & IntentCodes.INTEGRATIONS) === IntentCodes.INTEGRATIONS) allowed.push('integrations');
        if ((n & IntentCodes.MESSAGES) === IntentCodes.MESSAGES) allowed.push('messages');
        if ((n & IntentCodes.MEMBERS) === IntentCodes.MEMBERS) allowed.push('members');
        if ((n & IntentCodes.INVITES) === IntentCodes.INVITES) allowed.push('invites');
        if ((n & IntentCodes.MESSAGE_REACTIONS) === IntentCodes.MESSAGE_REACTIONS) allowed.push('messageReactions');
        if ((n & IntentCodes.MESSAGE_TYPING) === IntentCodes.MESSAGE_TYPING) allowed.push('messageTyping');
        if ((n & IntentCodes.PRESENCES) === IntentCodes.PRESENCES) allowed.push('presences');
        if ((n & IntentCodes.VOICE_STATES) === IntentCodes.VOICE_STATES) allowed.push('voiceStates');
        if ((n & IntentCodes.WEBHOOKS) === IntentCodes.WEBHOOKS) allowed.push('webhooks');
        if ((n & IntentCodes.DIRECT_MESSAGES) === IntentCodes.DIRECT_MESSAGES) allowed.push('directMessages');
        if ((n & IntentCodes.DIRECT_MESSAGE_REACTIONS) === IntentCodes.DIRECT_MESSAGE_REACTIONS) allowed.push('directMessageReactions');
        if ((n & IntentCodes.DIRECT_MESSAGE_TYPING) === IntentCodes.DIRECT_MESSAGE_TYPING) allowed.push('directMessageTyping');
        return new this(allowed);
    }

    public has(intent: IntentTypes): boolean {
        return this.currentIntents.includes(intent);
    }

    public parse(): number {
        let val: number = 0;
        if (this.currentIntents.includes("all")) {
            return 32767;
        }
        if (this.currentIntents.includes("default")) {
            return 32509;
        }
        for (let intentName of this.currentIntents) {
            switch (intentName) {
                case "bans":
                    val |= IntentCodes.BANS;
                    break;
                case "guilds":
                    val |= IntentCodes.GUILDS;
                    break;
                case "emojis":
                    val |= IntentCodes.EMOJIS;
                    break;
                case "integrations":
                    val |= IntentCodes.INTEGRATIONS;
                    break;
                case "invites":
                    val |= IntentCodes.INVITES;
                    break;
                case "members":
                    val |= IntentCodes.MEMBERS;
                    break;
                case "messageReactions":
                    val |= IntentCodes.MESSAGE_REACTIONS;
                    break;
                case "messageTyping":
                    val |= IntentCodes.MESSAGE_TYPING;
                    break;
                case "messages":
                    val |= IntentCodes.MESSAGES;
                    break;
                case "presences":
                    val |= IntentCodes.PRESENCES;
                    break;
                case "voiceStates":
                    val |= IntentCodes.VOICE_STATES;
                    break;
                case "webhooks":
                    val |= IntentCodes.WEBHOOKS;
                    break;
                case "directMessageTyping":
                    val |= IntentCodes.DIRECT_MESSAGE_TYPING;
                    break;
                case "directMessages":
                    val |= IntentCodes.DIRECT_MESSAGES;
                    break;
                case "directMessageReactions":
                    val |= IntentCodes.DIRECT_MESSAGE_REACTIONS;
                    break;
            }
        }

        return val;
    }
}
export default Intents;
