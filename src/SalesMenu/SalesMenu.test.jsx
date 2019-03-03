import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SalesMenu, { PinCard } from './SalesMenu';

Enzyme.configure({ adapter: new Adapter() });

describe('SalesMenu', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SalesMenu />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has a valid snapshot', () => {
    const tree = renderer.create(<SalesMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 4 cards', () => {
    const wrapper = shallow(<SalesMenu />);
    expect(wrapper.find(PinCard).length).toBe(4);
  });
});
