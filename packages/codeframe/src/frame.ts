import type { FrameOptions } from './index.d';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { NEWLINE } from './const';
import { highlight } from './highlight';

/**
 * Extract what lines should be marked and highlighted.
 */
type MarkerLines = Record<number, true | [number, number]>;

type Location = {
  column: number;
  line: number;
};

type NodeLocation = {
  end?: Location;
  start: Location;
};

function getMarkerLines (loc: NodeLocation, source: Array<string>, opts: FrameOptions): {
  start: number;
  end: number;
  markerLines: MarkerLines;
} {

  const startLoc: Location = { column: 0, line: -1, ...loc.start };
  const endLoc: Location = { ...startLoc, ...loc.end };
  const { linesAbove = 2, linesBelow = 3 } = opts || {};
  const startLine = startLoc.line;
  const startColumn = startLoc.column;
  const endLine = endLoc.line;
  const endColumn = endLoc.column;

  let start = Math.max(startLine - (linesAbove + 1), 0);
  let end = Math.min(source.length, endLine + linesBelow);

  if (startLine === -1) start = 0;
  if (endLine === -1) end = source.length;

  const lineDiff = endLine - startLine;
  const markerLines: MarkerLines = {};

  if (lineDiff) {
    for (let i = 0; i <= lineDiff; i++) {
      const lineNumber = i + startLine;
      if (!startColumn) {
        markerLines[lineNumber] = true;
      } else if (i === 0) {
        const sourceLength = source[lineNumber - 1].length;
        markerLines[lineNumber] = [ startColumn, sourceLength - startColumn + 1 ];
      } else if (i === lineDiff) {
        markerLines[lineNumber] = [ 0, endColumn ];
      } else {
        const sourceLength = source[lineNumber - i].length;
        markerLines[lineNumber] = [ 0, sourceLength ];
      }
    }
  } else {
    if (startColumn === endColumn) {
      markerLines[startLine] = startColumn ? [ startColumn, 0 ] : true;
    } else {
      markerLines[startLine] = [ startColumn, endColumn - startColumn ];
    }
  }

  return {
    start,
    end,
    markerLines
  };
}

export function CodeFrame (rawLines: string, loc: NodeLocation, opts: FrameOptions) {

  const lines = rawLines.split(NEWLINE);
  const { start, end, markerLines } = getMarkerLines(loc, lines, opts);
  const numberMaxWidth = String(end).length;
  const highlightedLines = opts.highlight ? highlight(rawLines, opts.language) : rawLines;

  const treeLine = opts.type === 'error'
    ? _.Tree.red
    : opts.type === 'warning'
      ? _.Tree.yellow
      : _.Tree.line;

  const treeLineTrim = opts.type === 'error'
    ? _.Tree.redTrim
    : opts.type === 'warning'
      ? _.Tree.yellowTrim
      : _.Tree.trim;

  const frame = highlightedLines
  .split(NEWLINE, end)
  .slice(start, end)
  .map((line, index) => {

    const number = start + 1 + index;
    const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
    const hasMarker = markerLines[number];

    if (hasMarker) {

      const gutter = ` ${_.redBright(paddedNumber)} ${_.Tree.trim}`;

      let markerLine = '';

      if (Array.isArray(hasMarker)) {

        const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, _.WSP);
        const numberOfMarkers = hasMarker[1] || 1;

        markerLine = glue(
          _.NWL,
          treeLine,
          _.WSP.repeat(paddedNumber.length),
          _.BAD,
          _.WSP,
          _.Tree.trim,
          _.WSP,
          markerSpacing,
          _.redBright('^').repeat(numberOfMarkers)
        );

      }

      return glue(
        _.redBright('➤'),
        gutter,
        line.length > 0 ? ` ${line}` : '',
        markerLine
      );

    } else {

      return glue(
        _.WSR,
        _.blueBright(paddedNumber),
        _.WSP,
        _.Tree.trim,
        line.length > 0 ? ` ${line}` : ''
      );

    }
  });

  return glue.nl(frame.map(line => treeLineTrim + _.WSP + line)) + _.NWL;
}
