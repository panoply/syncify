import { chmod, writeFile } from 'fs-extra';

import { template } from './post-merge';

import { $ } from '$';

export async function hook () {

  const hookPath = $.git.hooks;
  const postMerge = template({

  });

  await writeFile($.file.githook, postMerge);
  await chmod(hookPath, '755');

  console.log(`post-merge hook has been successfully created or updated at ${hookPath}`);

}
