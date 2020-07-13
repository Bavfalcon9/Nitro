interface MessageContent {
     tts?: boolean;
     type?: number;
     pinned?: boolean;
     embeds?: any[];
     content: string;
     attachments?: any[];
}
export default MessageContent;