import { has } from 'rambdax';
import { writeJson, readJson } from 'fs-extra';
import { bundle, cache } from 'options';
import { ICache } from 'types';

type Files = keyof Omit<ICache, 'updated' | 'created' | 'sections' | 'pages'>

export async function getCache (key?: Files) {

  try {
    return readJson(cache[key].uri);
  } catch (e) {
    throw new Error(e);
  }

}

export function updateCache (key?: Files) {

  if (has('uri', cache[key])) {
    writeJson(cache[key].uri, cache[key].data, { spaces: 0 }, (e) => {
      if (e) throw console.error(e);
    });
  }

  writeJson(bundle.dirs.cache + 'store.map', cache, { spaces: 0 }, (e) => {
    if (e) throw console.error(e);
  });

}
