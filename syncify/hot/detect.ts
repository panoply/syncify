import { execSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { existsSync, readdirSync } from 'fs-extra';

// Extension ID - replace with your actual extension ID
const CHROME_EXTENSION_ID = 'aejliicmbhbmhdlchlnpmohhohbhkfjg';
const FIREFOX_EXTENSION_ID = 'extension@syncify.sh';

/* -------------------------------------------- */
/* CHROME                                       */
/* -------------------------------------------- */

function getChromePath () {

  const home = homedir();

  switch (process.platform) {
    case 'win32':
      return join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Extensions');
    case 'darwin':
      return join(home, 'Library', 'Application Support', 'Google', 'Chrome', 'Default', 'Extensions');
    case 'linux':
      return join(home, '.config', 'google-chrome', 'Default', 'Extensions');
    default:
      throw new Error('Unsupported platform');
  }
}

function isChromeRunning () {

  try {

    const command = process.platform === 'win32' ? 'tasklist | findstr /i "chrome.exe"' : 'pgrep chrome';

    execSync(command);

    return true;

  } catch {

    return false;

  }
}

async function checkChromeExtension () {

  try {

    const extensionsPath = getChromePath();
    const extensionPath = join(extensionsPath, CHROME_EXTENSION_ID);

    if (existsSync(extensionPath)) {

      console.log('✅ Chrome extension is installed');

      return true;

    } else {

      console.log('❌ Chrome extension is not installed');

      return false;

    }

  } catch (error) {

    console.log('❌ Error checking Chrome extension:', error.message);
    return false;

  }
}

/* -------------------------------------------- */
/* FIREFOX                                      */
/* -------------------------------------------- */

function getFirefoxPath () {

  const home = homedir();

  switch (process.platform) {
    case 'win32':
      return join(home, 'AppData', 'Roaming', 'Mozilla', 'Firefox', 'Profiles');
    case 'darwin':
      return join(home, 'Library', 'Application Support', 'Firefox', 'Profiles');
    case 'linux':
      return join(home, '.mozilla', 'firefox');
    default:
      throw new Error('Unsupported platform');
  }
}

function isFirefoxRunning () {

  try {

    const command = process.platform === 'win32' ? 'tasklist | findstr /i "firefox.exe"' : 'pgrep firefox';

    execSync(command);

    return true;

  } catch {

    return false;

  }
}

async function checkBraveExtension () {

  try {

    const extensionsPath = getBravePath();
    const extensionPath = join(extensionsPath, CHROME_EXTENSION_ID); // Assuming ID is the same

    if (existsSync(extensionPath)) {
      console.log('✅ Brave extension is installed');
      return true;
    } else {
      console.log('❌ Brave extension is not installed');
      return false;
    }
  } catch (error) {
    console.log('❌ Error checking Brave extension:', error.message);
    return false;
  }
}

async function checkFirefoxExtension () {

  try {

    const profilesPath = getFirefoxPath();

    if (!existsSync(profilesPath)) {

      console.log('❌ Firefox profiles directory not found');

      return false;

    }

    // Find the default profile
    const profiles = readdirSync(profilesPath);
    let extensionFound = false;

    for (const profile of profiles) {
      const profilePath = join(profilesPath, profile);
      const extensionsPath = join(profilePath, 'extensions');

      if (existsSync(extensionsPath)) {

        const extensionFile = join(extensionsPath, FIREFOX_EXTENSION_ID + '.xpi');
        const extensionDir = join(extensionsPath, FIREFOX_EXTENSION_ID);

        if (existsSync(extensionFile) || existsSync(extensionDir)) {
          extensionFound = true;
          break;
        }
      }
    }

    if (extensionFound) {
      console.log('✅ Firefox extension is installed');
      return true;
    } else {
      console.log('❌ Firefox extension is not installed');
      return false;
    }
  } catch (error) {
    console.log('❌ Error checking Firefox extension:', error.message);
    return false;
  }
}

/* -------------------------------------------- */
/* BRAVE                                        */
/* -------------------------------------------- */

function getBravePath () {

  const home = homedir();

  switch (process.platform) {
    case 'win32':
      return join(home, 'AppData', 'Local', 'BraveSoftware', 'Brave-Browser', 'User Data', 'Default', 'Extensions');
    case 'darwin':
      return join(home, 'Library', 'Application Support', 'BraveSoftware', 'Brave-Browser', 'Default', 'Extensions');
    case 'linux':
      return join(home, '.config', 'BraveSoftware', 'Brave-Browser', 'Default', 'Extensions');
    default:
      throw new Error('Unsupported platform');
  }
}

function isBraveRunning () {

  try {

    const command = process.platform === 'win32' ? 'tasklist | findstr /i "brave.exe"' : 'pgrep -f brave';
    execSync(command);
    return true;

  } catch (e) {
    return false;
  }
}

async function checkBrowsersStatus () {
  console.log('\n🔍 Checking browsers status...');

  const chrome = isChromeRunning();
  const firefox = isFirefoxRunning();
  const brave = isBraveRunning();

  console.log(`Chrome is ${chrome ? 'running' : 'not running'}`);
  console.log(`Firefox is ${firefox ? 'running' : 'not running'}`);
  console.log(`Brave is ${brave ? 'running' : 'not running'}\n`);

  return { chrome, firefox, brave };
}

export async function checkExtension () {

  console.log('🔍 Checking extension installation status...\n');

  const browserStatus = await checkBrowsersStatus();

  if (browserStatus.chrome) {
    await checkChromeExtension();
  }

  if (browserStatus.firefox) {
    await checkFirefoxExtension();
  }

  if (browserStatus.brave) {
    await checkBraveExtension();
  }
}
