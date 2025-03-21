function updateLine (lineNum, newText) {
  // Get terminal size
  const { rows, columns } = process.stdout;

  // Calculate lines from the bottom (assuming we're at the bottom)
  // lineNum is counted from the top
  const targetLine = lineNum - 1; // 0-based index

  // Move cursor to beginning of target line
  process.stdout.cursorTo(0);
  process.stdout.moveCursor(0, -(rows - targetLine));

  // Clear the line and write new text
  process.stdout.clearLine(0);
  process.stdout.write(newText);

  // Move cursor back to original position (bottom)
  process.stdout.cursorTo(0);
  process.stdout.moveCursor(0, (rows - targetLine));
}

// Example usage:
console.log('Line 1');
console.log('Line 2');
console.log('Line 3');
console.log('Current line 4');

// Wait a moment, then update Line 2
setTimeout(() => {
  updateLine(2, 'Updated Line 2');
  console.log('Cursor is back at the current position');
}, 1000);
