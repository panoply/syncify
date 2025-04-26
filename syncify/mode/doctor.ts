import * as _ from '@syncify/ansi';

export function Doctor () {

  const write = _.Create()
  .Header('Syncify Doctor 🩺', _.bold)
  .Wrap(_.gray, 'Doctor mode will attempt to diagnose and treat configuration issues.')
  .Template({ id: 'version', prefix: true })
  .Template({ id: 'caches', prefix: true })
  .Template({ id: 'credentials', prefix: true })
  .Template({ id: 'projects', prefix: true })
  .Template({ id: 'installation', prefix: true })
  .Template({ id: 'location', prefix: true })
  .Template({ id: 'structure', prefix: true })
  .toLog();

  // STEP 1 - Look for cache home store and generate is non existent
  // STEP 2 - Look for cache if none exists generate them
  // STEP 3 - Look for credentials if none exist add to report
  // STEP 4 - Check whether or not we are in project
  // STEP 5 - Check the current project structure

}
