/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Cleanly joins dynamic class names with standard and conditional items.
 */
export function cn(...classes: (string | undefined | null | boolean | { [key: string]: boolean })[]): string {
  const result: string[] = [];
  
  classes.forEach((c) => {
    if (!c) return;
    if (typeof c === 'string') {
      result.push(c);
    } else if (typeof c === 'object') {
      Object.keys(c).forEach((key) => {
        if (c[key]) result.push(key);
      });
    }
  });
  
  return result.join(' ');
}
