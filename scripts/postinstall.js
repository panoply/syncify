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

  // Files to be generated

  const green = (text) => `\x1b[1;32m${text}\x1b[0m`;
  const gray = (text) => `\x1b[0;90m${text}\x1b[0m`;
  const whiteBold = (text) => `\x1b[1;37m${text}\x1b[0m`;

  const created = 'created' + gray(':');
  const updated = 'updated' + gray(':');

  const syncifyDir = path.join(os.homedir(), '.syncify');
  const keychainFile = path.join(syncifyDir, '.keychain');
  const versionsFile = path.join(syncifyDir, '.version');
  const notifyIconFile = path.join(syncifyDir, 'icon.png');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  let hasLogged = false;
  let hasNewline = 1;

  const logName = () => {
    if (!hasLogged) {
      console.log(' ');
      console.log(`  ${green('@syncify/cli')} ${gray('→')} ${whiteBold('postinstall')}`);
      console.log(' ');
      console.log(`  version${gray(':')} ${gray(`v${pkg.version}`)}`);
      hasLogged = true;
    }
  };

  // First we create the .syncify directory
  if (!fs.existsSync(syncifyDir)) {
    logName();
    fs.mkdirSync(syncifyDir);
    console.log(`  ${created} ${gray(syncifyDir)}`);
    hasNewline = 2;
  }

  // Lets create the .syncify/.keychain file if it does not exist
  if (!fs.existsSync(keychainFile)) {
    logName();
    fs.writeFileSync(keychainFile, '{}');
    console.log(`  ${created} ${gray(keychainFile)}`);
    hasNewline = 2;
  }

  // Lets copy the notifier icon if it does not exist
  if (!fs.existsSync(notifyIconFile)) {
    logName();
    fs.copyFileSync('icon.png', notifyIconFile);
    console.log(`  ${created} ${gray(notifyIconFile)}`);
    hasNewline = 2;
  }

  const cwd = process.cwd();

  // Lets create the .syncify/.versions file if it does not exist
  if (!fs.existsSync(versionsFile)) {

    logName();

    fs.writeFileSync(versionsFile, JSON.stringify({ [cwd]: pkg.version }));

    console.log(`  ${created} ${gray(versionsFile)}`);
    console.log(' ');
    hasNewline = 3;

  } else {

    const ver = JSON.parse(fs.readFileSync(versionsFile).toString());
    const hasVer = cwd in ver;

    if (hasVer === false || (hasVer === true && ver[cwd] !== pkg.version)) {

      logName();

      ver[cwd] = pkg.version;

      fs.writeFileSync(versionsFile, JSON.stringify(ver));

      console.log(`  ${updated} ${gray(versionsFile)}`);
      console.log(' ');
      hasNewline = 3;
    }
  }

  if (hasNewline === 2) {
    console.log(' ');
  }

})().catch(err => {

  console.error('𐄂 syncify postinstall:', err);

});
