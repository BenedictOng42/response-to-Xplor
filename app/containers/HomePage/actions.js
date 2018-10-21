/*
 *
 * HomePage actions
 *
 */

import { VALIDATE_COMMAND } from './constants';

export function validateAndAddCommand(command) {
  if (command) {
    console.log(command);
  }
  return {
    type: VALIDATE_COMMAND,
    command,
  };
}
