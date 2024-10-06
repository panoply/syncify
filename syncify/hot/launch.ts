import * as Chrome from 'chrome-launcher';
import CDP from 'chrome-remote-interface';
import { $ } from 'syncify:state';

const PreviewBar = () => $.hot.previewBar ? '' : /* js */`
  const preview = document.getElementById("preview-bar-iframe");
  if (preview) preview.style.display = "none";
`;

const Expression = () => /* js */`

  const injection = new Promise((resolve, reject) => {

    try {

      const inject = document.getElementById('syncify-hot-injection');

      if (inject) {
        console.log('Script already injected.');
        return resolve();
      }

      const script = document.createElement('script');
      script.setAttribute('spx-eval', 'false');
      script.setAttribute('id', 'syncify-hot-injection');
      script.setAttribute('src', 'http://localhost:${$.hot.server}/hot.min.js');

      script.onload = () => {

        // console.log('Script loaded successfully.');

        window.syncify.connect({
          server: ${$.hot.server},
          socket: ${$.hot.socket},
          strategy: "${$.hot.strategy}",
          method: "${$.hot.method}"
        });

        resolve();

      };

      script.onerror = (e) => {
        console.error('Failed to load script:', e);
        reject(new Error('Script load error'));
      };

      document.head.appendChild(script);
      // console.log('Script appended to the document.');

    } catch (err) {

      // console.error('Error during script injection:', err);
      reject(err);

    }
  });

  injection.then(() => {

    ${$.hot.loadEventJS}

  });
`;

export const LaunchChrome = async () => {

  try {

    const chrome = await Chrome.launch({
      port: 9222,
      chromeFlags: $.hot.chromeFlags,
      ignoreDefaultFlags: true,
      userDataDir: $.dirs.chrome
    });

    const client = await CDP({ port: chrome.port });
    const { Page, Runtime } = client;

    await Runtime.enable();
    await Page.enable();
    await Page.navigate({
      url: `https://${$.sync.themes[0].store}?preview_theme_id=${$.sync.themes[0].id}`
    });

    await Page.loadEventFired(async () => {

      await Runtime.evaluate({
        returnByValue: true,
        awaitPromise: true,
        expression: /* js */`
            ${PreviewBar()}
            ${Expression()}
          `
      });

    });

    Page.navigatedWithinDocument(async (params: { url: string }) => {

      await Runtime.evaluate({
        returnByValue: true,
        awaitPromise: true,
        expression: /* js */`
          window.syncify.sections.load();
        `
      });

    });

    process.on('exit', () => chrome.kill());

  } catch (error) {

    console.error('An error occurred:', error);

  }
};
