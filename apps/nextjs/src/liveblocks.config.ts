import { LiveMap } from "@liveblocks/core";

export type PresenceStates = "playing" | "seeking" | "paused";

declare global {
  interface Liveblocks {
    // Each user's Presence, for room.getPresence, room.subscribe("others"), etc.
    Presence: {
      presence: any;
    };
    Storage: {
      records: LiveMap<string, any>; // Used by tldraw
    };
    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        name?: string;
        avatar?: string;
        email?: string;
        color: string;
      };
    };
  }
}
