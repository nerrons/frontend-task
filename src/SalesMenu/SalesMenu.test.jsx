import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SalesMenu, { PinCard } from './SalesMenu';
import { entries, cards } from '../App/App';

Enzyme.configure({ adapter: new Adapter() });

const TestSalesMenu = () => (
  <HashRouter>
    <SalesMenu
      entryName={entries[0].name}
      entryDescription={entries[0].description}
      cards={cards}
    />
  </HashRouter>
);

describe('SalesMenu', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TestSalesMenu />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has a valid snapshot', () => {
    const tree = renderer.create(<TestSalesMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 4 cards', () => {
    const wrapper = shallow(<TestSalesMenu />);
    expect(wrapper.find(SalesMenu).dive().find(PinCard).length).toBe(4);
  });

  it('records { pinnedCard: 3 } when Card #4 is pinned', () => {
    // A workaround for testing child states
    const wrapper = mount(shallow(<TestSalesMenu />).get(0));
    wrapper.find('#pin-button-3').simulate('click', { cardId: 3 });
    expect(wrapper.find(SalesMenu).state('pinnedCard')).toBe(3);
  });

  it('shows Card #3 first when Card #3 is pinned', () => {
    const wrapper = mount(<TestSalesMenu />);
    wrapper.find('#pin-button-2').simulate('click', { cardId: 2 });
    expect(wrapper.find(SalesMenu).find(PinCard).first().prop('cardId')).toBe(2);
  });

  it('shows Card #3 first when pins #2 then #3', () => {
    const wrapper = mount(<TestSalesMenu />);
    wrapper.find('#pin-button-2').simulate('click', { cardId: 2 });
    wrapper.find('#pin-button-3').simulate('click', { cardId: 3 });
    expect(wrapper.find(SalesMenu).find(PinCard).first().prop('cardId')).toBe(3);
  });
});
