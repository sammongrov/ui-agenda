import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import BrochureImageView from '../BrochureImageView';

configure({ adapter: new Adapter() });
const initialState = {};
const mockStore = configureStore();

jest.mock('react-native-image-zoom-viewer', () => {
  /* eslint-disable */
  const React = require('React');
  const PropTypes = require('prop-types');
  return class MockImageViewer extends React.Component {
    static propTypes = { children: PropTypes.any };

    static defaultProps = { children: '' };

    render() {
      return React.createElement('ImageViewer', this.props, this.props.children);
    }
    /* eslint-enable */
  };
});

const imageUrl = 'test_imageUrl';
const deleteMessage = jest.fn();
const showDelete = 'test_showDelete';
const goBack = jest.fn();

it('BrochureImageView renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={mockStore(initialState)}>
        <BrochureImageView />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('_onLayout method is called for width', () => {
  const event = { nativeEvent: { layout: { width: 360 } } };
  const root = shallow(<BrochureImageView />);
  root
    .find('Screen')
    .props()
    .onLayout(event);
  expect(root.state().layout.width).toBe(360);
});
it('_onLayout method is called for height', () => {
  const event = { nativeEvent: { layout: { height: 360 } } };
  const root = shallow(<BrochureImageView />);
  root
    .find('Screen')
    .props()
    .onLayout(event);
  expect(root.state().layout.height).toBe(360);
});

it('ImageViewer render correctly', () => {
  const rootComp = shallow(
    <BrochureImageView
      imageUrl={imageUrl}
      deleteMessage={deleteMessage}
      goBack={goBack}
      showDelete={showDelete}
    />,
  );

  const imageViewer = rootComp.find({ enableImageZoom: true });

  expect(imageViewer).toBeTruthy();

  const viewComponent = shallow(imageViewer.props().loadingRender());
  expect(viewComponent).toBeTruthy();

  const renderImageComp = shallow(imageViewer.props().renderImage());
  expect(renderImageComp).toBeTruthy();

  imageViewer.props().renderIndicator();
  expect(imageViewer.props().renderIndicator).toBeInstanceOf(Function);
});
