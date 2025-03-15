import { spawn } from 'node:child_process';
import { platform } from 'node:os';

import { warnOption } from '~cli/throws';
import { has } from '~utils';

import { $ } from '$';

async function cmd (command: string) {

  return new Promise((resolve) => {

    const isWindows = platform() === 'win32';
    const checkCommand = isWindows
      ? `where ${command}`
      : `which ${command}`;

    spawn(isWindows ? 'cmd' : 'sh', [ isWindows ? '/c' : '-c', checkCommand ], { stdio: 'ignore' })
    .on('exit', (code) => resolve(code === 0))
    .on('error', () => resolve(false));

  });

}

export async function getEditor () {

  if ($.project.textEditor !== null && $.config.editor === null) return;

  const warn = warnOption('os / editor');

  if ($.config.editor !== null) {

    if ($.project.textEditor !== null && $.project.textEditor === $.config.editor) return;

    const TEXT_EDITORS = {
      darwin: {
        vscode: 'code',
        cursor: 'cursor',
        sublime: 'subl',
        atom: 'atom',
        webstorm: 'webstorm',
        intellij: 'idea',
        textmate: 'mate',
        xcode: 'xcode'
      },
      win32: {
        vscode: 'code.cmd',
        cursor: 'cursor.cmd',
        sublime: 'sublime_text.exe',
        atom: 'atom.cmd',
        webstorm: 'webstorm64.exe',
        intellij: 'idea64.exe',
        'notepad++': 'notepad++.exe'
      },
      linux: {
        vscode: 'code',
        cursor: 'cursor',
        sublime: 'subl', // Fixed typo
        atom: 'atom',
        webstorm: 'webstorm', // Fixed typo
        intellij: 'idea',
        gedit: 'gedit',
        nano: 'nano',
        vim: 'vim'
      }
    }[$.platform] || null;

    if (TEXT_EDITORS === null) {
      warn('unsupported platform', $.platform);
    } else if (has($.config.editor, TEXT_EDITORS)) {
      $.project.textEditor = TEXT_EDITORS[$.config.editor];
    } else {
      warn('unsupported editor', $.config.editor);
    }

  } else {

    const SUPPORTED_EDITORS = {
      darwin: [
        'code',
        'cursor',
        'subl',
        'atom',
        'webstorm',
        'idea',
        'mate',
        'xcode'
      ],
      win32: [
        'code.cmd',
        'cursor.cmd',
        'sublime_text.exe',
        'atom.cmd',
        'webstorm64.exe',
        'idea64.exe',
        'notepad++.exe'
      ],
      linux: [
        'code',
        'cursor',
        'subl',
        'atom',
        'webstorm',
        'idea',
        'gedit',
        'nano',
        'vim'
      ]
    }[$.platform] || null;

    if (SUPPORTED_EDITORS === null) {

      warn('unsupported platform', $.platform);

    } else {

      for (const editor of SUPPORTED_EDITORS) {
        if (await cmd(editor)) {
          $.project.textEditor = editor;
          break;
        }
      }

      if ($.project.textEditor === null) {

        warn('unsupported editor');

      }
    }
  }
}
