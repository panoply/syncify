import axios from 'axios';
import { delay } from 'rambdax';
import Queue from 'p-queue';
import { IAsset, IGetAssets, IThemes } from '../typings';
import { is } from '../config/utils';
import * as log from '../logs/console';
import { error } from '../logs/errors';

/**
 * Wait Condition
 *
 * Used to throttle uploads when rate exceeds
 * are incurred. Delays execution by an additional
 * 500ms limiting requests to 2 per second.
 */
let wait: boolean = false;

/**
 * The Request Queue
 *
 * We exceed the rate limits set by Shitify.
 * This allows us to upload in bursts, when we hit
 * the rates we requeue the requests.
 */
export const queue = new Queue(
  {
    concurrency: 5,
    interval: 500,
    intervalCap: 4
  }
);

export async function get <T extends {
  assets: IGetAssets[]
}> (sync: IThemes, assets: string) {

  return axios.get<T>(sync.url, {
    responseType: 'json',
    params: {
      'asset[key]': assets,
      fields: 'key,value,theme_id'
    }
  }).then(({ data }) => {

    return data.assets;

  }).catch((error) => {

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);

  });

}

export async function list (sync: IThemes) {

  return axios.get<{ assets: IGetAssets[] }>(sync.url, {
    params: {
      fields: 'key,theme_id'
    }
  }).then(({ data }) => {

    return data.assets;

  }).catch((error) => {

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);

  });

}

export async function remove (sync: IThemes, asset: string) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.delete(sync.url, {
    responseType: 'json',
    params: {
      'asset[key]': asset
    }
  }).then(({ status }) => {

    if (is(status, 200)) return log.deletion(sync, asset);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => remove(sync, asset), { priority: 1000 });
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(asset, e.response);
      }
    }

  });

}

export async function update (sync: IThemes, asset: IAsset) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.put(sync.url, { asset }, {
    responseType: 'json'
  }).then(({ status }) => {

    if (is(status, 200)) return log.uploaded(sync, asset.key);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => update(sync, asset), { priority: 1000 });
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(asset.key, e.response);
      }

    }

  });

}
