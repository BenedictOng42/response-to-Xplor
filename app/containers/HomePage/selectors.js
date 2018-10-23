import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomePageDomain = state => state.get('homePage', initialState);

const makeSelectOutputHistory = () =>
  createSelector(selectHomePageDomain, homePage =>
    homePage.get('outputHistory').toJS(),
  );

export { makeSelectOutputHistory, selectHomePageDomain };
