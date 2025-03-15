import xior, { XiorError } from 'xior';

export async function storeExists (store: string) {

  return xior.head(`https://${store}.myshopify.com`).then(() => ({
    exists: true,
    error: null
  })).catch((error: XiorError) => ({
    exists: false,
    error
  }));

}
