/**
 * @todo Imports should be regulated, and utilities should be important via class
 */
export const VERSION = "0.1.2-dev";
export const DEVELOPER = true;
export { default as Client } from "./src/Client.ts";

// Structures
export { default as BaseUser } from "./src/structures/User.ts";
export { default as ClientUser } from "./src/structures/ClientUser.ts";
export { default as Message } from "./src/structures/Message.ts";
export { default as User } from "./src/structures/User.ts";
export { default as Channel } from "./src/structures/channel/Channel.ts";
export { default as TextChannel } from "./src/structures/channel/TextChannel.ts";
export { default as Guild } from "./src/structures/guild/Guild.ts";
export { default as Invite } from "./src/structures/guild/Invite.ts";

// Utils
export { default as SimpleEmbed } from "./src/utils/discord/SimpleEmbed.ts";
export { default as ClearColor } from "./src/utils/misc/ClearColor.ts";
export { default as Logger } from "./src/utils/misc/Logger.ts";
export { default as ProtectedStore } from "./src/data/ProtectedStore.ts";