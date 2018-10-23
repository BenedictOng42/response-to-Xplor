import { fromJS } from 'immutable';
import homePageReducer from '../reducer';
import { addToOutputHistory } from '../actions';

describe('homePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      outputHistory: fromJS([]),
    });
  });

  it('should return the intial state', () => {
    const expectedResult = state;
    expect(homePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the walletInfoLoading action', () => {
    const output = 'output';
    const expectedResult = state.set('outputHistory', fromJS(['output']));
    expect(homePageReducer(state, addToOutputHistory(output))).toEqual(
      expectedResult,
    );
  });
});
