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

  const green = (text) => `\x1b[1;32m${text}\x1b[0m`;
  const gray = (text) => `\x1b[0;90m${text}\x1b[0m`;
  const whiteBold = (text) => `\x1b[1;37m${text}\x1b[0m`;

  // Read package.json for version information
  const cwd = process.cwd();
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  // Files to be generated
  const syncifyDir = path.join(os.homedir(), '.syncify');
  const versionsFile = path.join(syncifyDir, '.version');
  const versions = JSON.parse(fs.readFileSync(versionsFile).toString());

  if (cwd in versions) {

    const ver = versions[cwd];

    if (ver !== pkg.version) {

      console.log(' ');
      console.log(`  ${green('@syncify/cli')} ${gray('→')} ${whiteBold('postversion')}`);
      console.log(' ');
      console.log(`  version${gray(':')} ${gray(`v${pkg.version}`)}`);

      versions[cwd] = pkg.version;

      fs.writeFileSync(versionsFile, JSON.stringify(versions));

      console.log(`  updated${gray(':')}${gray(`${versionsFile}`)}`);
      console.log(' ');

    }

  }

})().catch(err => {

  console.error('𐄂 syncify postversion:', err);

});
