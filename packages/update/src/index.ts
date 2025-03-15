import { kill } from '@syncify/kill';

/**
 * Represents the result of comparing two semantic version strings
 */
interface VersionUpdate {
  /**
   * The type of version change between the current and registry versions.
   * Indicates the level of version difference:
   *
   * > `major` - _Breaking change or significant update_
   * >
   * > `minor` - _New features that are backwards-compatible_
   * >
   * > `patch` - _Bug fixes or very minor updates_
   */
  change: 'major' | 'minor' | 'patch';
  /**
   * Describes the change in release channel, showing the transition between release types.
   *
   * > `alpha → beta`
   * >
   * > `latest → alpha`
   * >
   * > `beta → latest`
   */
  bump: string;
  /**
   * Whether or not the version increment applied a pre-release stage bump. When `true`
   * the release suffix number changed, otherwise `false`.
   *
   * @example
   * '1.0.0-beta.1' > '1.0.0-beta.2' = true
   * '1.0.0-beta.1' > '1.2.0-beta.1' = false
   */
  step: boolean;
  /**
   * The release channel of the new (registry) version (current release stage)
   *
   * > `latest` - _version increment on non suffixed version, e.g: 1.1.0 > 1.2.0_
   * >
   * > `rc`- _version increment on an release candidate, e.g: 1.0.0-rc.1 > 1.1.0-rc.1_
   * >
   * > `beta`- _version increment on an beta release, e.g: 1.0.0-beta.1 > 1.1.0-beta.1_
   * >
   * > `alpha` _version increment on an alpha release, e.g: 1.0.0-alpha.1 > 1.1.0-alpha.1_
   */
  release: string;
  /**
   * Indicates if the version change is considered breaking. Returns `true` if the change
   * introduces potential backwards-incompatible modifications. Whenever stable `major` changes
   * increment, this value will be `true`, otherwise this will be `false`, while adhering to the
   * below determinations when pre-release suffix identifiers change:
   *
   * @example
   * // Breaking is true when:
   * '1.0.0-alpha.1' >  '1.0.0-beta.1' = true
   * '1.0.0-beta.1'  >  '1.0.0-rc.1'   = true
   * '1.0.0'         >  '2.0.0'       = true
   * '1.0.0-rc.1'    >  '1.0.0-rc.2'  = true
   *
   *  // Breaking is false when:
   * '1.0.0-rc.1'    >  '1.0.0'       = false
   * '1.1.0'         >  '1.2.0'       = false
   */
  breaking: boolean;
  /**
   * The original current version string
   *
   * @example
   * '1.2.0'
   */
  current: string;
  /**
   * The new version string from the registry
   *
   * @example
   * '1.2.1'
   */
  registry: string;
  /**
   * Detailed parsing information for both current and registry versions.
   * Provides granular breakdown of version components returning `number`
   * types for each semantic modulas.
   */
  parse: {
    /**
     * Parsing details for the current version. Breaks down the current version into its semantic components
     */
    current: {
      /** Major version number */
      major: number;
      /** Minor version number */
      minor: number;
      /** Patch version number */
      patch: number;
      /** Release channel of the current version */
      release: string;
      /**
       * Pre-release stage number. This will be `null` if stable increment or undefined.
       *
       * @example
       * '1.0.0-beta.1' > 1
       * '1.0.0-beta.2' > 2
       * '1.0.0-beta'   > 0
       * '1.0.0'        > null
       */
      stage: number;
    };
    /**
     * Parsing details for the registry version. Breaks down the registry version into its semantic components
     */
    registry: {
      /** Major version number */
      major: number;
      /** Minor version number */
      minor: number;
      /** Patch version number */
      patch: number;
      /** Release channel of the registry version */
      release: string;
      /**
       * Pre-release stage number. This will be `null` if stable increment or undefined.
       *
       * @example
       * '1.0.0-beta.1' > 1
       * '1.0.0-beta.2' > 2
       * '1.0.0-beta'   > 0
       * '1.0.0'        > null
       */
      stage: number;
    };
  };
}

interface UpdateOptions {
  /**
   * Target a specific version tag on the package.
   *
   * @default
   * 'latest'
   */
  tag?: string;
  /**
   * Pre-release priorities identifier order. Customise how
   * suffixes are handled and determine the order of importance
   * where `1` is considered oldest.
   *
   * @default
   * { alpha: 1, beta: 2, rc: 3 }
   *
   * @example
   * {
   *   alpha: 1,  // 1.0.0-alpha
   *   beta: 2,   // 1.0.0-beta
   *   rc: 3      // 1.0.0-rc
   * }
   *
   */
  priorities?: Record<string, number>
}

// Precompile regex for performance
const VERSION_REGEX = /^(\d+)\.(\d+)\.(\d+)(-([a-z]+)(?:\.(\d+))?)?$/i;

function compare (a: string, b: string, prio?: Record<string, number>): false | VersionUpdate {

  // Version parsing with error handling
  const parseVersion = (version: string) => {

    const match = version.match(VERSION_REGEX);

    if (!match) {
      throw new Error(`Invalid version format: ${version}`);
    }

    return {
      parts: [
        parseInt(match[1], 10), // major
        parseInt(match[2], 10), // minor
        parseInt(match[3], 10) // patch
      ],
      release: match[5] || 'latest',
      preRelease: match[5] ? `${match[5]}${match[6] ? `.${match[6]}` : ''}` : undefined,
      stage: match[5] ? parseInt(match[6] || '0', 10) : null
    };
  };

  // Comprehensive pre-release comparison with custom priorities
  const comparePreRelease = (preA: string | undefined, preB: string | undefined): {
    comparison: number,
    step: boolean
  } => {

    if (!preA && !preB) return { comparison: 0, step: false };
    if (!preA) return { comparison: 1, step: false };
    if (!preB) return { comparison: -1, step: false };

    const [ typeA, numA = '0' ] = preA.split('.');
    const [ typeB, numB = '0' ] = preB.split('.');

    const priorityA = prio[typeA.toLowerCase()] || 0;
    const priorityB = prio[typeB.toLowerCase()] || 0;

    // Compare release channel priority first
    if (priorityA !== priorityB) return { comparison: priorityA - priorityB, step: false };

    // Compare pre-release numbers
    const numericComparison = Number(numA) - Number(numB);

    return { comparison: numericComparison, step: numericComparison !== 0 };

  };

  // Memoize parsing to avoid re-parsing the same versions
  const parseA = parseVersion(a);
  const parseB = parseVersion(b);

  // Comprehensive version comparison
  const compareVersionParts = () => {

    // Compare major, minor, patch versions
    for (let i = 0; i < 3; i++) {

      const diff = parseA.parts[i] - parseB.parts[i];

      if (diff !== 0) return i === 0 ? 'major' : i === 1 ? 'minor' : 'patch';

    }

    // If version parts are identical, compare pre-release
    const preReleaseResult = comparePreRelease(parseA.preRelease, parseB.preRelease);

    // Pre-release difference is considered a patch-level change
    if (preReleaseResult.comparison !== 0) return 'patch';

    return 'patch';

  };

  if (parseA.preRelease === parseB.preRelease) {

    if (parseA.parts.every((part, i) => part === parseB.parts[i])) return false; // No difference

    // Check if current version is higher and throw
    if (Number(parseA.parts.join('')) > Number(parseB.parts.join(''))) {
      throw new Error(`Current version is greater than registry version: ${a} > ${b}`);
    }

  }

  // Determine change type
  const change = compareVersionParts();

  // Pre-release comparison for breaking and pre-release changes
  const preReleaseResult = comparePreRelease(parseA.preRelease, parseB.preRelease);

  // Determine if it's a breaking change
  const breaking = change === 'major' ||
  ((prio[parseA.release.toLowerCase()] || 0) < (prio[parseB.release.toLowerCase()] || 0)) ||
  (preReleaseResult.comparison > 0) ||
  (parseB.stage > parseA.stage);

  // Determine bump type
  const bump = parseA.preRelease && parseB.preRelease
    ? parseA.release === parseB.release
      ? `${parseA.release}.${parseA.stage} → ${parseB.release}.${parseB.stage}`
      : `${parseA.release} → ${parseB.release}`
    : parseA.preRelease ? `${parseA.release} → latest` : `latest → ${parseB.release}`;

  return {
    change,
    bump,
    release: parseB.release,
    breaking,
    step: preReleaseResult.step,
    current: a,
    registry: b,
    parse: {
      get current () {
        return {
          major: parseA.parts[0],
          minor: parseA.parts[1],
          patch: parseA.parts[2],
          release: parseA.release,
          stage: parseA.stage
        };
      },
      get registry () {
        return {
          major: parseB.parts[0],
          minor: parseB.parts[1],
          patch: parseB.parts[2],
          release: parseB.release,
          stage: parseB.stage
        };
      }
    }
  };
}

async function get (name: string): Promise<string> {

  const ac = new AbortController();

  kill(() => ac.abort());

  try {

    const request = await fetch(`https://registry.npmjs.org/${name}`, { signal: ac.signal });
    const json = await request.json();

    return json.version;

  } catch (_) {

    return null;

  }
}

/**
 * Queries the NPM register, compares version numbers. When versions match,
 * a boolean `false` is returned, whereas a newer version returns an object
 * with information regarding the version increment applied.
 *
 * > See the {@link VersionUpdate} interface for context
 *
 * @param name
 * The NPM Package name
 *
 * @param version
 * The version number to compare, this will be the local version
 *
 * @param options
 * Optionally provide additional control settings
 *
 * @example
 * import update from '@syncify/update';
 *
 * const version = await update('@syncify/cli', '1.0.0', {
 *   tag: 'latest',
 *   priorities: { alpha: 1, beta: 2, rc: 3 }
 * });
 *
 * console.log(version);
 */
async function update (
  name: string,
  version: string,
  { tag = 'latest', priorities = undefined }: UpdateOptions = {}
) {

  if (!process?.stdout?.isTTY) return; // Probably piping stdout

  const registry = await get(`${name}/${tag}`);

  if (registry === null) return false;

  return compare(version, registry, {
    alpha: 1,
    beta: 2,
    rc: 3,
    ...priorities
  });

};

export default update;
