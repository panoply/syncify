import { c, Colors } from '~log';
import { assign } from '~utils/native';

interface ProgressOptions {
  showPercentage?: boolean;
  percentColor?: Colors;
  barColor?: Colors;
  barSize?: number;
  clearOnComplete?: boolean
}

export function progress (total: number, opts: ProgressOptions = {}) {

  let current: number = 0;

  const options: ProgressOptions = assign({
    showPercentage: true,
    barColor: 'neonGreen',
    percentColor: 'whiteBright',
    barSize: 40,
    clearOnComplete: false
  }, opts);

  function align (output: string) {

    const paddingSize = Math.max(0, options.barSize - output.length);
    const padding = ' '.repeat(paddingSize);

    return c.line.gray + output + padding;

  }

  function bar (length: number, empty: boolean = false) {

    return (empty ? '▱' : '▰').repeat(length);
  }

  function stop (): void {

    if (options.clearOnComplete) console.clear();

  }

  return {
    stop,
    increment: (incrementBy: number = 1) => {

      const newProgress = current + incrementBy;

      current = Math.min(newProgress, total);

      if (current === total) stop();

    },
    decrement: (decrementBy: number = 1) => {

      const newProgress = current - decrementBy;

      current = Math.max(newProgress, 0);

    },
    render (er: boolean): string {

      const progress = Math.round((current / total) * options.barSize);
      const filledBar = bar(progress);
      const emptyBar = bar(options.barSize - progress, true);
      const progressBar = c[options.barColor](filledBar) + c.lightGray(emptyBar);
      const percentage = Math.round((current / total) * 100);

      let output = progressBar;

      if (options.showPercentage) output += ` ${String(percentage)}%`;

      return align(output);

    }

  };

}
