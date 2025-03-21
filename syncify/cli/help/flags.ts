import * as _ from '@syncify/ansi';

export function examples () {

  return `
    ${_.bold('SYNCIFY CLI  ' + _.ARR + _.whiteBright('  v' + VERSION))}

    Below are some usage examples for working with the Syncify CLI.

    ${_.bold('TARGETING' + _.COL)}

    ${_.gray('Target 1 store and 1 theme') + _.COL}
    $ sy {mode} -T your-store${_.COL}theme-1

    ${_.gray('Target 1 store and 2 theme') + _.COL}
    $ sy {mode} -T your-store${_.COL}theme-1${_.COM}some-theme${_.COM}test-theme

    ${_.gray('Target 2 stores and 1 theme') + _.COL}
    $ sy {mode} -T your-store${_.COL}theme-1 -T another-store${_.COL}some-theme

    ${_.gray('Target 2 stores and 3 theme') + _.COL}
    $ sy {mode} -T your-store${_.COL}theme-1${_.COM}theme-2 -T another-store${_.COL}some-theme

    ${_.bold('BUILDING' + _.COL)}

    ${_.gray('Build theme from source')}:
    $ sy build

    ${_.gray('Build theme with terse minification')}:
    $ sy build --terse

    ${_.gray('Build theme and clean')}:
    $ sy build --clean --terse

    ${_.bold('WATCHING' + _.COL)}

    ${_.gray('Watch 1 store and 1 theme') + _.COL}
    $ sy watch

    ${_.gray('Watch 1 store and 2 themes with hot reloading') + _.COL}
    $ sy watch --hot -T theme-1${_.COM}theme-2

    ${_.gray('Watch 2 stores and 1 theme') + _.COL}
    $ sy watch -T your-store${_.COM}theme-1 -T another-store

  `.replace(/\s(-{2})(?=[a-z])/g, _.gray(' $1'));
};
