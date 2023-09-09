import type { Commands } from 'types';
import { $ } from 'syncify:state';
import { join } from 'pathe';
import { assign } from 'syncify:native';

function parseVersionNumber (version: string) {

  const match = version.match(/^(\d{1,2})\.(\d{1,2})\.(\d{1,2})$/);

  if (!match) {
    throw new Error('Unable to parse: ' + version);
  }

  return {
    patch: parseInt(match[3], 10),
    minor: parseInt(match[2], 10),
    major: parseInt(match[1], 10)
  };

}

/**
 * Parsed package.json version
 */
export async function setVersion (cli: Commands) {

  const { pkg, vc, dirs, cache } = $;

  if ($.cache.themeVersion !== pkg.number) {

    vc.update = parseVersionNumber(pkg.version);
    vc.update.number = pkg.version;
    vc.update.dir = join($.dirs.export, `v${vc.major}`);
    vc.update.zip = join(vc.update.dir, `${vc.number}.zip`);

    const { patch, minor, major } = parseVersionNumber(cache.themeVersion);

    vc.number = cache.themeVersion;
    vc.patch = patch;
    vc.minor = minor;
    vc.major = major;
    vc.dir = join(dirs.export, `v${vc.major}`);
    vc.zip = join(vc.dir, `${vc.number}.zip`);

    // TODO - HANDLE CASES WHERE --bump was passed

  } else {

    const { patch, minor, major } = parseVersionNumber(pkg.version);

    vc.number = pkg.version;
    vc.patch = patch;
    vc.minor = minor;
    vc.major = major;
    vc.dir = join(dirs.export, `v${vc.major}`);
    vc.zip = join(vc.dir, `${vc.number}.zip`);

  }

  if (cli.bump !== null) {

    vc.update = assign({}, vc);

    if (cli.bump === 'patch') {
      vc.update.patch = vc.patch + 1;
      vc.update.bump = 'patch';
    } else if (cli.bump === 'minor') {
      vc.update.minor = vc.minor + 1;
      vc.update.bump = 'minor';
    } else if (cli.bump === 'major') {
      vc.update.major = vc.major + 1;
      vc.update.bump = 'major';
      vc.update.dir = join(dirs.export, `v${vc.update.major}`);
    }

    vc.update.number = `${vc.update.major}.${vc.update.minor}.${vc.update.patch}`;
    vc.update.zip = join(vc.update.dir, `${vc.update.number}.zip`);

  }

}
