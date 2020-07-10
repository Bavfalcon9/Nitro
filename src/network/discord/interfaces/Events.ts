class Events {
     public static Hello: string = "HELLO"; // defines the heartbeat interval
     /**
      * Hello	defines the heartbeat interval
      * Ready	contains the initial state information
      * Resumed	response to Resume
      * Reconnect	server is going away, client should reconnect to gateway and resume
      * Invalid Session	failure response to Identify or Resume or invalid active session
      * Channel Create	new channel created
      * Channel Update	channel was updated
      * Channel Delete	channel was deleted
      * Channel Pins Update	message was pinned or unpinned
      * Guild Create	lazy-load for unavailable guild, guild became available, or user joined a new guild
      * Guild Update	guild was updated
      * Guild Delete	guild became unavailable, or user left/was removed from a guild
      * Guild Ban Add	user was banned from a guild
      * Guild Ban Remove	user was unbanned from a guild
      * Guild Emojis Update	guild emojis were updated
      * Guild Integrations Update	guild integration was updated
      * Guild Member Add	new user joined a guild
      * Guild Member Remove	user was removed from a guild
      * Guild Member Update	guild member was updated
      * Guild Members Chunk	response to Request Guild Members
      * Guild Role Create	guild role was created
      * Guild Role Update	guild role was updated
      * Guild Role Delete	guild role was deleted
      * Invite Create	invite to a channel was created
      * Invite Delete	invite to a channel was deleted
      * Message Create	message was created
      * Message Update	message was edited
      * Message Delete	message was deleted
      * Message Delete Bulk	multiple messages were deleted at once
      * Message Reaction Add	user reacted to a message
      * Message Reaction Remove	user removed a reaction from a message
      * Message Reaction Remove All	all reactions were explicitly removed from a message
      * Message Reaction Remove Emoji	all reactions for a given emoji were explicitly removed from a message
      * Presence Update	user was updated
      * Typing Start	user started typing in a channel
      * User Update	properties about the user changed
      * Voice State Update	someone joined, left, or moved a voice channel
      * Voice Server Update	guild's voice server was updated
      * Webhooks Update  guild channel webhook was created, update, or deleted
      * Session Change   wtf?
      */
}
export default Events;