const PRIMITIVE_TYPE_ORDER = [
  'undefined',
  'number',
  'boolean',
  'string',
  'object'
];

export function sort (
  value: any,
  {
    arrays = false,
    objects = false,
    exclude = []
  }: {
    arrays?: boolean | string[];
    objects?: boolean | string[];
    exclude?: string[];
  } = {}
): any {
  if (value === null || typeof value !== 'object') return value;
  if (arrays === false && objects === false) return value;

  const pathMatches = (path: string, currentPath: string): boolean => {
    if (path === currentPath) return true;
    return currentPath.startsWith(path + '.');
  };

  function canSort (currentPath: string, isArray: boolean): boolean {
    if (exclude.some(path => pathMatches(path, currentPath))) return false;
    const sortOption = isArray ? arrays : objects;
    if (typeof sortOption === 'boolean') return sortOption;
    return sortOption.some(path => pathMatches(path, currentPath));
  }

  function getTypeIndex (value: any): number {
    if (value === undefined) return 0;
    if (value === null) return 1;
    return PRIMITIVE_TYPE_ORDER.indexOf(typeof value);
  }

  function compare (a: any, b: any): number {
    const aType = getTypeIndex(a);
    const bType = getTypeIndex(b);

    if (aType !== bType) {
      if (Array.isArray(a) && typeof b === 'number') return -1; // Arrays before numbers
      if (Array.isArray(b) && typeof a === 'number') return 1;
      return aType - bType;
    }
    if (a === null && b === null) return 0;
    if (a === undefined && b === undefined) return 0;

    if (Array.isArray(a) && Array.isArray(b)) {
      const len = Math.min(a.length, b.length);
      for (let i = 0; i < len; i++) {
        const comp = compare(a[i], b[i]);
        if (comp !== 0) return comp;
      }
      return a.length - b.length;
    }

    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      const len = Math.min(aKeys.length, bKeys.length);

      for (let i = 0; i < len; i++) {
        const keyComp = aKeys[i].localeCompare(bKeys[i]);
        if (keyComp !== 0) return keyComp;
        const valueComp = compare(a[aKeys[i]], b[bKeys[i]]);
        if (valueComp !== 0) return valueComp;
      }
      return aKeys.length - bKeys.length;
    }

    if (typeof a === 'number' && typeof b === 'number') return a - b;
    if (typeof a === 'boolean') return a === b ? 0 : a ? 1 : -1;
    if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);

    return String(a).localeCompare(String(b));
  }

  function sorting (val: any, path: string = ''): any {
    if (Array.isArray(val)) {
      const processedWithIndices = val.map((item, idx) => ({
        value: typeof item === 'object' && item !== null ? sorting(item, `${path}.${idx}`) : item,
        originalIndex: idx
      }));

      const shouldSort = canSort(path, true);
      let result = processedWithIndices.map(item => item.value);
      const symbols = Object.getOwnPropertySymbols(val);

      if (shouldSort) {
        const sortedWithIndices = [ ...processedWithIndices ].sort((a, b) => {
          const comp = compare(a.value, b.value);
          return comp !== 0 ? comp : a.originalIndex - b.originalIndex;
        });

        result = sortedWithIndices.map(item => item.value);

        // Map comments by original index, not value
        const symbolMap = new Map();
        symbols.forEach(sym => {
          const symStr = sym.toString();
          if (symStr.startsWith('Symbol(after-value:')) {
            const originalIndex = parseInt(symStr.match(/\d+/)[0], 10);
            symbolMap.set(originalIndex, val[sym]);
          }
        });

        // Reattach comments based on sorted positions
        sortedWithIndices.forEach((item, idx) => {
          const comment = symbolMap.get(item.originalIndex);
          if (comment) {
            result[Symbol.for(`after-value:${idx}`)] = comment;
          }
        });
      } else {
        result = Array.from(result);
        for (const sym of symbols) {
          result[sym] = val[sym];
        }
      }

      return result;
    }

    if (typeof val === 'object' && val !== null) {
      const result: Record<string | symbol, any> = Object.create(Object.getPrototypeOf(val));
      const keys = Object.keys(val);
      const symbols = Object.getOwnPropertySymbols(val);

      for (const sym of symbols) {
        result[sym] = val[sym];
      }

      const regularKeys = keys.filter(key => !key.startsWith('__'));
      if (canSort(path, false)) {
        regularKeys.sort();
      }
      for (const key of regularKeys) {
        const newPath = path ? `${path}.${key}` : key;
        const currentValue = val[key];
        result[key] = typeof currentValue === 'object' && currentValue !== null
          ? sorting(currentValue, newPath)
          : currentValue;
      }
      return result;
    }

    return val;
  }

  return sorting(value);
}
