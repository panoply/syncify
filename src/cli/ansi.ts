import ansis from 'ansis';

/**
 * Grey Dimming - Applied to line tracers
 */
export const dim = ansis.hex('#2a2a2e');

/**
 * ┌── Title - Printed upon intialization
 */
export const title = dim('┌── ') + ansis.bold.cyanBright('Syncify  ') + ansis.gray('<!version!>') + '\n';

/**
 * │ Line - Vertical line prepends
 */
export const line = dim('│') + '\n';

/**
 * ├── Group - Vertical line with dash which implies a group
 */
export const group = line + dim('├── ');
