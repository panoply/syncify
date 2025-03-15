import { $ } from '$';

export function onSetup () {

  return {
    hasPkg: $.pkg !== null,
    hasCache: $.file.project !== null,
    hasEnv: $.file.env !== null,
    hasConfig: $.file.config !== null,
    hasKeychain: $.keychain !== null
  };

}

export function onCreate () {

}

export function onKeychain () {

}
