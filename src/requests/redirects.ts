import { IRedirect, IFile, IRequest } from 'types';
import { is } from 'shared/native';
import * as log from 'cli/logs';
import { error } from 'cli/errors';
import { queue, axios } from 'requests/queue';

export async function list (url: string, options: IRequest) {

  console.log(url);

  return axios.get<{ redirects: IRedirect[] }>(url, options).then(({ data }) => {

    console.log(data);
    return data.redirects;

  }).catch(e => {

    console.log(e);

  });

}

export async function create (url: string, file: IFile, redirect: IRedirect) {

  return axios.post(url, { redirect }).then(({ status }) => {

    if (is(status, 200)) {
      log.fileTask(file, `${redirect.path} > ${redirect.target}`);
    }

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(async () => create(url, file, redirect), { priority: 1000 });
    } else {

      if (!queue.isPaused) {
        queue.pause();
        return error(redirect.path, e.response);
      }

    }

  });

}

export async function update (url: string, file: IFile, redirect: IRedirect) {

  console.log(url, redirect);

  return axios.put(url, { redirect }).then(({ status }) => {

    if (is(status, 200)) {
      log.fileTask(file, `${redirect.path} > ${redirect.target} redirect`);
    }

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(async () => update(url, file, redirect), { priority: 1000 });
    } else {

      if (!queue.isPaused) {
        queue.pause();
        return error(redirect.path, e.response);
      }
    }

  });
}

export async function redirects (url: string, file: IFile, redirect: IRedirect) {

  return axios.get<{ redirects: IRedirect[] }>(url).then(({ data }) => {

    if (is(data.redirects.length, 0)) return create(url, file, redirect);

    const record = data.redirects.find(r => (redirect.path === r.path && redirect.target === r.target));

    if (!record) return create(url, file, redirect);

    redirect.id = record.id;

    return update(url.replace('.json', `/${record.id}.json`), file, redirect);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(async () => redirects(url, file, redirect), { priority: 1000 });
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(redirect.path, e.response);
      }
    }

  });

}
