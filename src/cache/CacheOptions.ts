import Base from '../structures/Base.ts';

export interface Settings {
    enabled?: boolean; // should nitro cache? Defaults to false
    max?: number; // Max cache allowed, if this is reached, no more objects are cached.
    refresh?: boolean; // Should cache be refreshed with gateway events?,
    partial?: boolean; // Whether or not only Partial Objects should be cached.
}

export interface HardOptions {
    use_db: boolean; // whether or not you're using a database
    put?: (data: Base) => Promise<any>; // Save to database here.
    get?: (search: string) => Promise<Base>; // Get from database here.
}

export interface CacheOptions {
    guilds?: Settings;
    users?: Settings;
    channels?: Settings;
    messages?: Settings;
    invites?: Settings;
    $options?: HardOptions;
}

export const OptimizedOptions: CacheOptions = {
    guilds: {
        enabled: false
    },
    users: {
        enabled: false
    },
    channels: {
        enabled: true,
        partial: true,
        max: 250000,
        refresh: true
    },
    messages: {
        enabled: true,
        partial: true,
        max: 250000,
        refresh: true
    },
    invites: {
        enabled: false
    }
};

export const DefaultOptions: CacheOptions = {
    guilds: {
        enabled: true,
        partial: true,
        max: 250000,
        refresh: true
    },
    users: {
        enabled: true,
        partial: true,
        max: 250000,
        refresh: true
    },
    channels: {
        enabled: true,
        partial: true,
        max: 250000,
        refresh: true
    },
    messages: {
        enabled: true,
        partial: true,
        max: 250000,
        refresh: true
    },
    invites: {
        enabled: true,
        partial: true,
        max: 250000,
        refresh: true
    }
}