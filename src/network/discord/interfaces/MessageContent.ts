import SimpleEmbed from "../../../utils/discord/SimpleEmbed.ts";

interface MessageContent {
     tts?: boolean;
     type?: number;
     pinned?: boolean;
     embeds?: any[];
     content: string|SimpleEmbed;
     attachments?: any[];
}
export default MessageContent;