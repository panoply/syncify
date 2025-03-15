import notifier from 'node-notifier';

import * as _ from '@syncify/ansi';
import { timer } from '@syncify/timer';

import { plur, uuid } from '~utils';

import { $ } from '$';

/**
 * Bulk Instance
 *
 * Toggles bulk logging mode.
 *
 * ```
 * ┌─ Bulk ➤ Operation ~ 05:24:55
 * │
 * │  changes    »   32 Files
 * │  errors     »   2 Errors
 * │  warnings   »   3 Warnings
 * │  uploaded   »   31 Files
 * │
 * │  ▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱ 50%
 * ```
 */
export function bulk () {

  if ($.bulk.id === null) {
    $.bulk.id = uuid();
    timer.start($.bulk.id);
  }

  if ($.bulk.synced.size > 0) {
    $.bulk.synced.clear();
    $.errors.clear();
    $.warnings.clear();
  }

  if (bulk.tui === null) {
    bulk.tui = _.Create()
    .Template({ prefix: true, id: 'changes', color: _.neonCyan })
    .Template({ prefix: true, id: 'errors', color: _.gray })
    .Template({ prefix: true, id: 'warnings', color: _.gray })
    .Template({ prefix: true, id: $.bulk.type, color: _.whiteBright });
  }

  if (bulk.progress === null) {

    bulk.progress = _.progress($.bulk.files, {
      barSize: 30,
      prepend: null,
      barColor: $.bulk.type === 'uploaded' ? 'neonGreen' : 'blueBright'
    });

  } else {

    bulk.progress.reset($.bulk.files);

  }

  bulk.tui
  .Update('changes', `${_.bold($.bulk.files)} Files`)
  .Update('errors', `${_.bold($.errors.size)} Errors`)
  .Update('warnings', `${_.bold($.warnings.size)} Warnings`)
  .Update($.bulk.type, bulk.progress.render())
  .toUpdate();

}

bulk.notifier = (type: 'warnings' | 'errors') => {

  notifier.notify({
    warnings: {
      contentImage: $.file.notifier,
      title: `Bulk ${plur('Warning', $.warnings.size)}`,
      message: `${$.warnings.size} ${plur('warning', $.warnings.size)} encountered`
    },
    errors: {
      contentImage: $.file.notifier,
      title: `Bulk ${plur('Error', $.errors.size)}`,
      message: `${$.errors.size} ${plur('Error', $.errors.size)} encountered`
    }
  }[type]);

};

bulk.complete = () => {

  if (!$.mode.bulk) return;

  const color = $.bulk.type === 'deleted'
    ? _.blueBright
    : _.neonGreen;

  bulk.tui
  .Update($.bulk.type, `${_.bold($.bulk.synced.size)} Files ${_.Append(timer.stop($.bulk.id))}`, color)
  .Newline();

  if ($.bulk.synced.size > 0) {
    bulk.tui.Line(`Type ${_.bold('i')} and press ${_.bold('enter')} to view ${$.bulk.type}`, _.gray);
  }

  if ($.warnings.size > 0) {
    bulk.tui.Line(`Type ${_.bold('w')} and press ${_.bold('enter')} to view warnings`, _.gray);
    bulk.notifier('warnings');
  }

  if ($.errors.size > 0) {
    bulk.tui.Line(`Type ${_.bold('e')} and press ${_.bold('enter')} to view errors`, _.gray);
    bulk.notifier('errors');
  }

  bulk.tui.toUpdate({ clear: true, trim: true }).done();
  bulk.tui = null;
  bulk.progress = null;

  $.mode.bulk = false;
  $.bulk.files = 0;
  $.bulk.id = null;

};

/**
 * Bulk Synced
 *
 * Inserts log records into the {@link $.bulk.synced} storage Set.
 */
bulk.synced = (filename: string, target: string, store: string) => {

  const message = $.bulk.type === 'uploaded'
    ? _.neonGreen(_.Prefix('uploaded', filename, _.bold(target), store, timer.stop()))
    : _.blueBright(_.Prefix('deleted', filename, _.bold(target), store));

  $.bulk.synced.add(_.Line(message));

};

/**
 * Bulk Progress
 *
 * The progress bar instance for bulk operations
 *
 * ```
 * │
 * │  ▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱ 50%
 * ```
 */
bulk.progress = null as ReturnType<typeof _.progress>;

/**
 * Bulk TUI
 *
 * Instance of {@link _.Tui} and used for bulk logs in watch mode.
 *
 * ```
 * ┌─ Bulk ➤ update ~ 05:24:55
 * │
 * │  changes    »   32 Files
 * │  errors     »   2 Errors
 * │  warnings   »   3 Warnings
 * │  uploaded   »   31 Files
 * │
 * │  Type i and press enter to view transfers
 * │  Type e and press enter to view errors
 * │  Type w and press enter to view warnings
 * ```
 */
bulk.tui = null as _.Tui<string>;
