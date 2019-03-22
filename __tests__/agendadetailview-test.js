import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Actions } from 'react-native-router-flux';
import AgendaDetailView from '../AgendaDetailView';

configure({ adapter: new Adapter() });

jest.mock('react-native-router-flux', () => ({
  Actions: {
    FeedbackFormScene: jest.fn(),
    pop: jest.fn(),
  },
}));
it('agenda renders correctly', () => {
  const tree = renderer.create(<AgendaDetailView />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Navbar onPress does  calls Actions.pop', () => {
  const root = shallow(<AgendaDetailView />);
  Actions.currentScene = 'AgendaDetailViewScene';
  const button = root
    .find('NavBar')
    .shallow()
    .find('TouchableOpacity')
    .first();
  button.props().onPress();
  expect(Actions.pop.mock.calls.length).toBe(1);
});

it('Navbar onPress does not calls Actions.pop', () => {
  Actions.currentScene = 'Agendascene';
  Actions.pop.mockClear();
  const root = shallow(<AgendaDetailView />);
  const button = root
    .find('NavBar')
    .shallow()
    .find('TouchableOpacity')
    .first();
  button.props().onPress();
  expect(Actions.pop.mock.calls.length).toBe(0);
});

it('Actions.currentScene is true and FeedbackFormScene is called', () => {
  Actions.currentScene = 'AgendaDetailViewScene';
  const rootComp = shallow(<AgendaDetailView />);
  const agendalist = rootComp
    .find('NavBar')
    .first()
    .shallow()
    .find('TouchableOpacity')
    .last();
  agendalist.props().onPress();
  expect(Actions.FeedbackFormScene).toBeCalled();
});

it('Actions.currentScene is false and FeedbackFormScene is not called', () => {
  Actions.currentScene = 'AgendaScene';
  Actions.FeedbackFormScene.mockClear();
  const rootComp = shallow(<AgendaDetailView />);
  const agendalist = rootComp
    .find('NavBar')
    .first()
    .shallow()
    .find('TouchableOpacity')
    .last();
  agendalist.props().onPress();
  expect(Actions.FeedbackFormScene).not.toBeCalled();
});
