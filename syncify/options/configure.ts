//
// DEFINE
//
import { getCaches } from './define/caches';
import { getConfig } from './define/config';
import { setBaseDirs, setImportDirs, setThemeDirs } from './define/directories';
import { getEnv } from './define/env';
import { setFilters } from './define/filters';
import { getPkg } from './define/package';
import { setPaths } from './define/paths';
import { project } from './define/project';
import { setSectionOptions } from './define/sections';
import { getTargets } from './define/store';
import { setTargets } from './define/targets';
import { setTemplates } from './define/templates';
//
// SETTINGS
//
import { getEditor } from './settings/editor';
import { setHotReloads } from './settings/hot';
import { setJsonOptions } from './settings/json';
import { setLiquidOptions } from './settings/liquid';
import { setPlugins } from './settings/plugins';
import { setProcessors } from './settings/processors';
import { setPublishConfig } from './settings/publish';
import { setScriptOptions } from './settings/script';
import { setStyleConfig } from './settings/style';
import { setSvgOptions } from './settings/svg';
import { setVersion } from './settings/versioning';

import { runtime } from '~cli/runtime';
import { setStdin } from '~cli/stdin';
import { runAlignment } from '~modes/pull';
import { piper } from '~utils/piper';

import { $ } from '$';

/**
 * Define Options
 *
 * Runtime function - Syncify execution executes and generates the workable
 * state (`$`) object and constructs all required references. This function
 * will check against the different modes and control cli reporting, while
 * also limiting and what is needed based on operation was executed.
 */
export async function Configure () {

  return piper(

    project

  ).stop($.mode.create || $.mode.projects)(

    getPkg,
    getEnv,
    getCaches,
    getTargets,
    getConfig,
    getEditor

  ).stop($.mode.init || $.mode.keychain)(

    setBaseDirs,
    setTargets,
    setFilters

  ).stop($.mode.link)(

    setProcessors,
    setPublishConfig,
    setThemeDirs,
    setImportDirs,
    setPaths,
    setVersion,
    setJsonOptions,
    setLiquidOptions,
    setPlugins,
    setStdin

  ).stop($.mode.pull || $.mode.push)([

    setSectionOptions,
    setScriptOptions,
    setSvgOptions,
    setStyleConfig,
    setTemplates

  ]).next($.mode.align)(

    runAlignment

  ).next($.mode.hot)(

    setHotReloads

  ).next($.mode.watch)(

    runtime.time

  );

};
