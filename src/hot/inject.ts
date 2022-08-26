/**
 * Window Injection
 */
export const inject = (server: number, socket: number) => `window.syncify = { server: ${server}, socket: ${socket} };`;
