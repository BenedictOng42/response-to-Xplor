/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { ADD_OUTPUT } from './constants';

export const initialState = fromJS({
  outputHistory: fromJS([]),
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_OUTPUT:
      return state.set(
        'outputHistory',
        fromJS(state.get('outputHistory').push(action.output)),
      );
    default:
      return state;
  }
}

export default homePageReducer;
