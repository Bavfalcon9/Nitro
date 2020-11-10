import PermissionOverwite from '../permissions/PermissionOverwrite.ts';

export default interface ChannelOptions {
	name: string;
	type: 0 | 2 | 4 | 5 | 6;
	topic?: string;
	bitrate?: number;
	userLimit?: number;
	rateLimitPerUser?: number;
	position?: number;
	permissionOverwrites?: PermissionOverwite[];
	parentID?: string;
	nsfw?: boolean;
}
