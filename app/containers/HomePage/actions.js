/*
 *
 * HomePage actions
 *
 */

import { ADD_OUTPUT } from './constants';

export function addToOutputHistory(output) {
  return {
    type: ADD_OUTPUT,
    output,
  };
}
