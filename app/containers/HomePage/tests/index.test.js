import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '../index';

describe('<HomePage />', () => {
  const wrapper = shallow(<HomePage />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  const instance = wrapper.instance();
  it('should run #onChange properly', () => {
    const event = {
      target: {
        value: 'word',
      },
    };
    instance.onChange(event);
    expect(instance.state.command).toEqual('word');
  });

  it('should run #onInputKeyDown and onAddCommand if keyCode is 13', () => {
    const keyCode = 13;
    instance.onAddCommand = jest.fn();
    instance.onInputKeyDown(keyCode);
    expect(instance.onAddCommand).toHaveBeenCalledTimes(1);
  });
  it('should run #onInputKeyDown and NOT the onAddCommand if keyCode is not 13', () => {
    const keyCode = 1;
    instance.onAddCommand = jest.fn();
    instance.onInputKeyDown(keyCode);
    expect(instance.onAddCommand).toHaveBeenCalledTimes(0);
  });
});
