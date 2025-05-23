// This script uses conditional logic to work in both CJS and ESM environments
(async () => {

  let fs;
  let path;
  let os;

  if (typeof require === 'function') {

    // CommonJS environment
    fs = require('fs');
    path = require('path');
    os = require('os');

  } else {

    // ES Module environment
    ({ default: fs } = await import('fs'));
    ({ default: path } = await import('path'));
    ({ default: os } = await import('os'));

  }

  const gray = (text) => `\x1b[0;90m${text}\x1b[0m`;

  // Read and check syncify projects
  const syncifyDir = path.join(os.homedir(), '.syncify');
  const projectsFile = path.join(syncifyDir, '.projects');
  const keychainFile = path.join(syncifyDir, '.keychain');

  const projects = fs.existsSync(projectsFile) ? JSON.parse(fs.readFileSync(projectsFile).toString()) : {};
  const keychain = fs.existsSync(projectsFile) ? JSON.parse(fs.readFileSync(keychainFile).toString()) : {};
  const newKeychain = fs.existsSync(projectsFile) ? JSON.parse(fs.readFileSync(keychainFile).toString()) : {};
  const keychainKeys = Object.keys(keychain);
  const projectEntries = Object.entries(projects);

  let updateKeychain = false;
  let updateProjects = false;

  if (projectEntries.length > 0) {
    for (const [ dir, hash ] of projectEntries) {
      if (!fs.existsSync(dir)) {

        const cache = path.join(syncifyDir, hash);

        if (keychainKeys.length > 0) {
          keychainKeys.forEach(k => {
            Object.keys(keychain[k]).forEach(v => {

              const updated = keychain[k][v].projects.filter(t => {
                if (t !== hash) return true;
                if (!updateKeychain) updateKeychain = true;
                return false;
              });

              if (updated.length === 0) {
                delete newKeychain[k][v];
              } else if (k in newKeychain && v in newKeychain[k]) {
                newKeychain[k][v].projects = updated;
              }

            });
          });
        }

        if (fs.existsSync(cache)) {

          fs.rmdirSync(cache, { recursive: true });

          delete projects[dir];

          if (!updateProjects) {
            console.log(' ');
            updateProjects = true;
          }

          console.log(`  deleted${gray(':')} ${gray(hash)}`);

        }
      }
    }
  }

  if (updateKeychain) {
    fs.writeFileSync(keychainFile, JSON.stringify(newKeychain));
  }

  if (updateProjects) {

    if (Object.keys(projects).length === 0) {
      fs.rmdirSync(syncifyDir, { recursive: true });
    } else {
      fs.writeFileSync(projectsFile, JSON.stringify(projects));
    }

    console.log(' ');

  }

})().catch(err => {

  console.error('𐄂 syncify postuninstall:', err);

});
