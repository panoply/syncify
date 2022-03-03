import { IOptions } from 'types';

let options: IOptions;

export const env = {
  get dev () {
    return process.env.SYNCIFY_ENV === 'dev';
  },
  get prod () {
    return process.env.SYNCIFY_ENV === 'prod';
  },
  get watch () {
    return process.env.SYNCIFY_WATCH === 'true';
  },
  get options () {
    return options;
  }
};

export const log = {
  console (...message: string[]) {

  },
  warning (...message: string[]) {

  },
  errors (...message: string[]) {

  }
};
