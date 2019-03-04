import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'; // needed because MainMenu uses <NavLink>
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainMenu from './MainMenu';
import { entries } from '../App/App';

Enzyme.configure({ adapter: new Adapter() });

describe('MainMenu', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <HashRouter>
        <MainMenu
          title="Konigle"
          entries={entries}
        />
      </HashRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has a valid snapshot', () => {
    const tree = renderer.create(
      <HashRouter>
        <MainMenu
          title="Konigle"
          entries={entries}
        />
      </HashRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 6 entries', () => {
    const wrapper = shallow(
      <HashRouter>
        <MainMenu
          title="Konigle"
          entries={entries}
        />
      </HashRouter>,
    );
    const numEntries = wrapper.find(MainMenu).dive().find('.entry-with-hr').length;
    expect(numEntries).toBe(6);
  });
});
