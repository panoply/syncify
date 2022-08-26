import { bundle } from './options/index';

export const env = {
  get dev () { return process.env.SYNCIFY_ENV === 'dev'; },
  get prod () { return process.env.SYNCIFY_ENV === 'prod'; },
  get watch () { return process.env.SYNCIFY_WATCH === 'true'; },
  get options () { return bundle.config; }
};
