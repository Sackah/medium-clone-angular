const workers = [
   'feed',
   'comments',
   'favorites',
   'followers',
   'profile',
] as const;

export type McWorker = (typeof workers)[number];
export interface McManagerConfig {
   extraSignals?: [];
}
