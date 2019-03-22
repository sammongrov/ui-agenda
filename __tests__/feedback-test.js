import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Actions } from 'react-native-router-flux';
import FeedbackForm from '../FeedbackForm';

configure({ adapter: new Adapter() });

const initialState = {};
const mockStore = configureStore();

const formProps = {
  handleSubmit: jest.fn(),
  error: false,
  invalid: false,
  submitting: true,
};
configure({ adapter: new Adapter() });
jest.mock('react-native-router-flux', () => ({
  Actions: {
    FeedbackFormScene: jest.fn(),
    pop: jest.fn(),
  },
}));
it('feedback renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={mockStore(initialState)}>
        <FeedbackForm {...formProps} />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('updateSize', () => {
  const height = 720;
  const rootComponent = shallow(<FeedbackForm store={mockStore(initialState)} {...formProps} />)
    .dive()
    .dive()
    .dive();
  const instance = rootComponent.instance();
  instance.updateSize(height);
  expect(rootComponent.state().height).toBe(height);
});
it('onSubmit', () => {
  const values = '';
  const rootComponent = shallow(<FeedbackForm store={mockStore(initialState)} {...formProps} />)
    .dive()
    .dive()
    .dive();
  const instance = rootComponent.instance();
  instance.onSubmit(values);
  expect(rootComponent.values).toBeUndefined();
});

it('Navbar onPress does  calls Actions.pop', () => {
  const root = shallow(<FeedbackForm store={mockStore(initialState)} {...formProps} />)
    .dive()
    .dive()
    .dive();
  Actions.currentScene = 'FeedbackFormScene';
  const button = root
    .find('NavBar')
    .shallow()
    .find('TouchableOpacity');
  button.props().onPress();
  expect(Actions.pop.mock.calls.length).toBe(1);
});
it('Navbar onPress does not  calls Actions.pop', () => {
  Actions.currentScene = 'Agendascene';
  Actions.pop.mockClear();
  const root = shallow(<FeedbackForm store={mockStore(initialState)} {...formProps} />)
    .dive()
    .dive()
    .dive();
  const button = root
    .find('NavBar')
    .shallow()
    .find('TouchableOpacity')
    .first();
  button.props().onPress();
  expect(Actions.pop.mock.calls.length).toBe(0);
});

it('should render the onChange to textName', () => {
  const rootComponent = shallow(<FeedbackForm store={mockStore(initialState)} {...formProps} />)
    .dive()
    .dive()
    .dive();
  const authorInputComponent = rootComponent.find({ name: 'name' }).first();
  authorInputComponent.props().onChange('textName');
  expect(rootComponent.state('name')).toEqual('textName');
});

it('should render the onChange to textMail', () => {
  const rootComponent = shallow(<FeedbackForm store={mockStore(initialState)} {...formProps} />)
    .dive()
    .dive()
    .dive();
  const authorInputComponent = rootComponent.find({ name: 'email' }).first();
  authorInputComponent.props().onChange('textMail');
  expect(rootComponent.state('email')).toEqual('textMail');
});

it('should render the onChange to textComment', () => {
  const rootComponent = shallow(<FeedbackForm store={mockStore(initialState)} {...formProps} />)
    .dive()
    .dive()
    .dive();
  const authorInputComponent = rootComponent.find({ name: 'comment' }).first();
  authorInputComponent.props().onChange('textComment');
  expect(rootComponent.state('comments')).toEqual('textComment');
});

it('calls onContentSizeChange', () => {
  const rootComponent = shallow(<FeedbackForm store={mockStore(initialState)} {...formProps} />)
    .dive()
    .dive()
    .dive();
  const event = { nativeEvent: { contentSize: { height: 720 } } };
  const input = rootComponent.find({ name: 'comment' }).first();
  input.props().onContentSizeChange(event);
  expect(rootComponent.state('height')).toEqual(720);
});
