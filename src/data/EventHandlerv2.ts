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
export type GenericFunction = (...args: any[]) => any;
interface WrappedFunction extends Function {
  listener: GenericFunction;
}

class EventHandlerv2 {
  private events: Map<Events, Array<WrappedFunction | GenericFunction>>;
  private maxListeners: number;

  public constructor() {
    this.events = new Map();
    this.maxListeners = 20;
  }

  /**
   * Registers a listener
   * @param event 
   * @param listener 
   */
  public on(event: Events, listener: WrappedFunction | GenericFunction): void {
    if (this.events.has(event)) {
      let listeners = this.events.get(event) as Array<
        WrappedFunction | GenericFunction
      >;
      if (listener.length >= this.maxListeners) {
        // to-do: Better chekc
      }
      listeners.push(listener);
      this.events.set(event, listeners);
    } else {
      this.events.set(event, [listener]);
    }
  }

  /**
   * Listens to a even only once
   */
  public once(event: Events, listener: GenericFunction): void {
    // wrap the function
    const wrapper = function (
      this: {
        event: Events;
        listener: GenericFunction;
        rawListener: WrappedFunction;
        context: EventHandlerv2;
      },
      ...args: any[]
    ): void {
      this.context.removeListener(this.event, this.listener);
      this.listener.apply(this.context, args);
    };
    const context = {
      event: event,
      listener: listener,
      rawListener: (wrapper as unknown) as WrappedFunction,
      context: this,
    };
    const wrapped = (wrapper.bind(context) as unknown) as WrappedFunction;
    context.rawListener = wrapped;
    wrapped.listener = listener;
    this.on(event, wrapped);
  }

  /**
   * Removes a listener
   * @param event 
   * @param listener 
   */
  public removeListener(event: Events, listener: GenericFunction): boolean {
    if (!this.events.has(event)) {
      return false;
    }
    let listeners: GenericFunction[] = this.events.get(
      event,
    ) as GenericFunction[];
    let listenerIndex: number | null = null;

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] == listener) {
        listenerIndex = i;
        break;
      }
    }

    if (typeof listenerIndex === "number") {
      listeners.splice(listenerIndex, 1);
      this.events.set(event, listeners);
    }
    return false;
  }

  /**
   * Broadcasts a event
   * @param event 
   * @param args 
   */
  public emit(event: Events, ...args: any[]): void {
    if (!this.events.has(event)) {
      return;
    } else {
      (this.events.get(event) as GenericFunction[]).slice().forEach(
        (listener) => {
          listener(...args);
        },
      );
    }
  }
}
export default EventHandlerv2;
