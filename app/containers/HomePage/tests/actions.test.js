import { addToOutputHistory } from '../actions';
import { ADD_OUTPUT } from '../constants';

describe('HomePage actions', () => {
  describe('addToOutputHistory Action', () => {
    it('has the correct type and passes output', () => {
      const output = 'output';
      const expected = {
        type: ADD_OUTPUT,
        output,
      };
      expect(addToOutputHistory(output)).toEqual(expected);
    });
  });
});
