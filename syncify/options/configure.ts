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
import { runAlignment } from '~mode/pull';

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

  project();

  if ($.mode.create || $.mode.projects) return;

  await getPkg();
  await getEnv();
  await getCaches();
  await getTargets();
  await getConfig();
  await getEditor();

  if ($.mode.init || $.mode.keychain) return;

  await setBaseDirs();
  await setTargets();

  setFilters();

  if ($.mode.link) return;

  setProcessors();

  await setPublishConfig();
  await setThemeDirs();
  await setImportDirs();
  await setPaths();

  setVersion();
  setJsonOptions();
  setLiquidOptions();
  setPlugins();
  setStdin();

  if ($.mode.pull || $.mode.push) return;

  await setSectionOptions();
  await setScriptOptions();

  setSvgOptions();

  await setStyleConfig();
  await setTemplates();

  if ($.mode.align) await runAlignment();

  if ($.mode.hot) await setHotReloads();

  if ($.mode.watch) runtime.time();

};
