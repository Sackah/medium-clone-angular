import {McManagerConfig, McWorker} from '../shared/types/worker.types';
import {newSignal} from '../utils/signal-factory';
import {CommentsWorker} from './comments.worker';
import {FavouriteArticleWorker} from './favorites.worker';
import {FeedWorker} from './feed.worker';
import {FollowProfileWorker} from './followers.worker';
import {ProfileWorker} from './profile.worker';

export class Manager {
   private constructor() {}

   public static create<T>(type: McWorker, config?: McManagerConfig) {
      const signal = newSignal<T>();

      switch (type) {
         case 'feed':
            const feedWorker = new FeedWorker(signal);
            return {feedWorker, signal};
         case 'followers':
            const followersWorker = new FollowProfileWorker(signal);
            return {followersWorker, signal};
         case 'comments':
            const commentsWorker = new CommentsWorker(signal);
            return {commentsWorker, signal};
         case 'favorites':
            const favoritesWorker = new FavouriteArticleWorker(signal);
            return {favoritesWorker, signal};
         case 'profile':
            const profileWorker = new ProfileWorker(signal);
            return {profileWorker, signal};
         default:
            return;
      }
   }
}
