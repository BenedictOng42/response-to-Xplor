import { fromJS } from 'immutable';
import { selectHomePageDomain, makeSelectOutputHistory } from '../selectors';

describe('selectHomePageDomain', () => {
  it('should get the state of the homePageDomain', () => {
    const homePageState = fromJS({
      outputHistory: fromJS(['output']),
    });
    const mockedState = fromJS({
      homePage: homePageState,
    });
    expect(selectHomePageDomain(mockedState)).toEqual(homePageState);
  });
});

describe('makeSelectOutputHistory', () => {
  const outputHistorySelector = makeSelectOutputHistory();
  it('should get the outputHistory state', () => {
    const outputHistory = fromJS(['output']);
    const mockedState = fromJS({
      homePage: fromJS({
        outputHistory,
      }),
    });

    expect(outputHistorySelector(mockedState)).toEqual(outputHistory.toJS());
  });
});
