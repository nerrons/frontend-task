import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SalesMenu, { PinCard } from './SalesMenu';

Enzyme.configure({ adapter: new Adapter() });

describe('SalesMenu', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HashRouter><SalesMenu /></HashRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has a valid snapshot', () => {
    const tree = renderer.create(<HashRouter><SalesMenu /></HashRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 4 cards', () => {
    const wrapper = shallow(<HashRouter><SalesMenu /></HashRouter>);
    expect(wrapper.find(SalesMenu).dive().find(PinCard).length).toBe(4);
  });

  it('records { pinnedCard: 3 } when Card #4 is pinned', () => {
    const wrapper = mount(<HashRouter><SalesMenu /></HashRouter>);
    wrapper.find('#pin-button-3').simulate('click', { cardId: 3 });
    expect(wrapper.find(SalesMenu).state('pinnedCard')).toBe(3);
  });

  it('shows Card #3 first when Card #3 is pinned', () => {
    const wrapper = mount(<HashRouter><SalesMenu /></HashRouter>);
    wrapper.find('#pin-button-2').simulate('click', { cardId: 2 });
    expect(wrapper.find(SalesMenu).find(PinCard).first().prop('cardId')).toBe(2);
  });

  it('shows Card #3 first when pins #2 then #3', () => {
    const wrapper = mount(<HashRouter><SalesMenu /></HashRouter>);
    wrapper.find('#pin-button-2').simulate('click', { cardId: 2 });
    wrapper.find('#pin-button-3').simulate('click', { cardId: 3 });
    expect(wrapper.find(SalesMenu).find(PinCard).first().prop('cardId')).toBe(3);
  });
});
