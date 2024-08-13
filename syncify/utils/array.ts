/**
 * **getChunk**
 *
 * Chunked arrays
 */
export function getChunk (array: any[], perChunk: number = 2) {

  return array.reduce((acc, item, index) => {

    const ci = Math.floor(index / perChunk); // chunk index

    if (!acc[ci]) acc[ci] = []; // start a new chunk
    acc[ci].push(item);
    return acc;

  }, []);

}
