import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomePageDomain = state => state.get('homePage', initialState);

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.toJS());

const makeSelectOutputHistory = () =>
  createSelector(selectHomePageDomain, homePage =>
    homePage.get('outputHistory').toJS(),
  );

export default makeSelectHomePage;
export { makeSelectOutputHistory };
