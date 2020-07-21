export enum UserFlags {
    none = 0,
    staff = 1 << 0,
    partner = 1 << 1,
    hypeSquadEvents = 1 << 2,
    bugHunterLevel1 = 1 << 3,
    Bravery = 1 << 6,
    Brilliance = 1 << 7,
    Balance = 1 << 8,
    EarlySupporter = 1 << 9,
    TeamUser = 1 << 10,
    System = 1 << 12,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    VerifiedBotDeveloper = 1 << 17
}

export enum PremiumTypes {
    none = 0,
    classic = 1 << 0,
    nitro = 1 << 1
}