import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Actions } from 'react-native-router-flux';
import AgendaScreen from '../Agenda';

configure({ adapter: new Adapter() });
jest.mock('react-native-router-flux', () => ({
  Actions: {
    AgendaScene: jest.fn(),
    pop: jest.fn(),
  },
}));

it('agenda renders correctly', () => {
  const tree = renderer.create(<AgendaScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Navbar onPress does  calls Actions.pop', () => {
  const root = shallow(<AgendaScreen />);
  Actions.currentScene = 'AgendaScene';
  const button = root
    .find('NavBar')
    .shallow()
    .find('TouchableOpacity');
  button.props().onPress();
  expect(Actions.pop.mock.calls.length).toBe(1);
});
it('Navbar onPress does not  calls Actions.pop', () => {
  Actions.currentScene = 'FeedbackFormScene';
  Actions.pop.mockClear();
  const root = shallow(<AgendaScreen />);
  const button = root
    .find('NavBar')
    .shallow()
    .find('TouchableOpacity')
    .first();
  button.props().onPress();
  expect(Actions.pop.mock.calls.length).toBe(0);
});

it('AgendaScreen timeToString returns true', () => {
  const tree = shallow(<AgendaScreen />);
  const instance = tree.instance();
  instance.date = '05 October 2011 14:48 UTC';
  expect(instance.timeToString()).toBe(true);
});

it('AgendaScreen rowHasChanged returns true', () => {
  const tree = shallow(<AgendaScreen />);
  const instance = tree.instance();
  expect(instance.rowHasChanged()).toBe(true);
});

it('AgendaScreen selectedDate returns true', () => {
  const tree = shallow(<AgendaScreen />);
  const instance = tree.instance();
  expect(instance.selectedDate()).toBe(true);
});
it('AgendaScreen selectedDate returns true', () => {
  const tree = shallow(<AgendaScreen />);
  const instance = tree.instance();
  instance.day = '';
  expect(instance.onDayPress()).toBe(true);
});
it('renderEmptyDate is called', () => {
  const rootComp = shallow(<AgendaScreen />);
  const instance = rootComp.instance();
  const component = shallow(instance.renderEmptyDate());

  expect(component).toBeTruthy();
});
