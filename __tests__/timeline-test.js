import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import TimeLine from '../TimeLine';

import DbManager from '../../app/DBManager';

configure({ adapter: new Adapter() });

// class mom {
//   constructor() {
//     return new Date();
//   }

//   subtract() {
//     return new Date();
//   }

//   format() {
//     return new Date();
//   }
// }

// const moment = jest.fn(() => mom);

jest.mock('react-native-timeline-listview', () => {
  /* eslint-disable */
  const React = require('React');
  const PropTypes = require('prop-types');
  return class MockTimeline extends React.Component {
    static propTypes = { children: PropTypes.any };

    static defaultProps = { children: '' };

    render() {
      return React.createElement('Timeline', this.props, this.props.children);
    }
    /* eslint-enable */
  };
});
jest.mock('react-native-router-flux', () => ({
  Actions: {
    cardId: jest.fn(),
    pop: jest.fn(),
  },
}));
jest.mock('react-native-tab-view', () => {
  /* eslint-disable */
  const reactNative = require('react-native');
  const { View } = reactNative;
  return {
    TabView: () => <View />,
    SceneMap: jest.fn(),
    TabBar: () => <View />,
  };
  /* eslint-enable */
});
jest.mock('BackHandler', () => {
  const backHandler = {
    removeCalenderListener: jest.fn(),
  };
  return backHandler;
});
jest.mock('../../app/DBManager', () => {
  const dbManager = {
    calender: {
      removeGroupMessageListener: jest.fn(),
      getCalenderData: jest.fn(),
      removeCalenderListener: jest.fn(),
    },
  };
  return dbManager;
});

jest.mock('react-native-router-flux', () => ({
  Actions: {
    BrochureImageScene: jest.fn(),
  },
}));

it('agenda renders correctly', () => {
  const tree = renderer.create(<TimeLine />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('ReplyMessage calls fetchGroupMessages', async () => {
  DbManager.calender.getCalenderData = jest.fn();
  const tree = shallow(<TimeLine />);
  const instance = tree.instance();
  await instance.fetchCalendarICS();
  expect(instance.getCalenderData).toBeUndefined();
});

it('Member Info unmounts correctly', () => {
  const tree = renderer.create(<TimeLine />);
  const treeInstance = tree.getInstance();
  tree.unmount();
  expect(treeInstance._isMounted).toBe(false);
});

it('renderTimelines is called', () => {
  const rootComp = shallow(<TimeLine />);
  const instance = rootComp.instance();
  const component = shallow(
    instance.renderTimelines({
      item: {
        startTime: new Date(),
        repeat: true,
        title: 'Lunch',
      },
    }),
  );

  expect(component).toBeTruthy();
});

it('Timeline _zeroRoute', () => {
  const sunData = ['meeting', 'lunch'];
  const tree = shallow(<TimeLine />);
  tree.setState({ sunData });
  const inst = tree.instance();
  const flatList = shallow(inst._zeroRoute()).find('FlatList');
  expect(flatList.length).toBe(1);
});
it('Timeline _zeroRoute', () => {
  const sunData = null;
  const tree = shallow(<TimeLine />);
  tree.setState({ sunData });
  const inst = tree.instance();
  const flatList = shallow(inst._zeroRoute()).find('FlatList');
  expect(flatList.length).toBe(0);
});
it('Timeline _firstRoute', () => {
  const monData = ['meeting', 'lunch'];
  const tree = shallow(<TimeLine />);
  tree.setState({ monData });
  const inst = tree.instance();
  const flatList = shallow(inst._firstRoute()).find('FlatList');
  expect(flatList.length).toBe(1);
});
it('Timeline _firstRoute', () => {
  const monData = null;
  const tree = shallow(<TimeLine />);
  tree.setState({ monData });
  const inst = tree.instance();
  const flatList = shallow(inst._firstRoute()).find('FlatList');
  expect(flatList.length).toBe(0);
});
it('Timeline _secondRoute', () => {
  const tueData = ['meeting', 'lunch'];
  const tree = shallow(<TimeLine />);
  tree.setState({ tueData });
  const inst = tree.instance();
  const flatList = shallow(inst._secondRoute()).find('FlatList');
  expect(flatList.length).toBe(1);
});
it('Timeline _secondRoute', () => {
  const tueData = null;
  const tree = shallow(<TimeLine />);
  tree.setState({ tueData });
  const inst = tree.instance();
  const flatList = shallow(inst._secondRoute()).find('FlatList');
  expect(flatList.length).toBe(0);
});
it('Timeline _thirdRoute', () => {
  const wedData = ['meeting', 'lunch'];
  const tree = shallow(<TimeLine />);
  tree.setState({ wedData });
  const inst = tree.instance();
  const flatList = shallow(inst._thirdRoute()).find('FlatList');
  expect(flatList.length).toBe(1);
});
it('Timeline _thirdRoute', () => {
  const wedData = null;
  const tree = shallow(<TimeLine />);
  tree.setState({ wedData });
  const inst = tree.instance();
  const flatList = shallow(inst._thirdRoute()).find('FlatList');
  expect(flatList.length).toBe(0);
});
it('Timeline _fourthRoute', () => {
  const thuData = ['meeting', 'lunch'];
  const tree = shallow(<TimeLine />);
  tree.setState({ thuData });
  const inst = tree.instance();
  const flatList = shallow(inst._fourthRoute()).find('FlatList');
  expect(flatList.length).toBe(1);
});
it('Timeline _fourthRoute', () => {
  const thuData = null;
  const tree = shallow(<TimeLine />);
  tree.setState({ thuData });
  const inst = tree.instance();
  const flatList = shallow(inst._fourthRoute()).find('FlatList');
  expect(flatList.length).toBe(0);
});
it('Timeline _fifthRoute', () => {
  const friData = ['meeting', 'lunch'];
  const tree = shallow(<TimeLine />);
  tree.setState({ friData });
  const inst = tree.instance();
  const flatList = shallow(inst._fifthRoute()).find('FlatList');
  expect(flatList.length).toBe(1);
});
it('Timeline _fifthRoute', () => {
  const friData = null;
  const tree = shallow(<TimeLine />);
  tree.setState({ friData });
  const inst = tree.instance();
  const flatList = shallow(inst._fifthRoute()).find('FlatList');
  expect(flatList.length).toBe(0);
});
it('Timeline _sixthRoute', () => {
  const satData = ['meeting', 'lunch'];
  const tree = shallow(<TimeLine />);
  tree.setState({ satData });
  const inst = tree.instance();
  const flatList = shallow(inst._sixthRoute()).find('FlatList');
  expect(flatList.length).toBe(1);
});
it('Timeline _sixthRoute', () => {
  const satData = null;
  const tree = shallow(<TimeLine />);
  tree.setState({ satData });
  const inst = tree.instance();
  const flatList = shallow(inst._sixthRoute()).find('FlatList');
  expect(flatList.length).toBe(0);
});
it('_renderHeader is called', () => {
  const rootComp = shallow(<TimeLine />);
  const instance = rootComp.instance();
  const component = shallow(instance._renderHeader());
  expect(component).toBeTruthy();
});

it('Actions.currentScene is true and FeedbackFormScene is called', () => {
  Actions.currentScene = 'TimelineScene';
  const rootComp = shallow(<TimeLine />);
  const agendalist = rootComp
    .find('NavBar')
    .first()
    .shallow()
    .find('TouchableOpacity')
    .last();
  agendalist.props().onPress();
  expect(Actions.BrochureImageScene).toBeCalled();
});
it('Actions.currentScene is true and FeedbackFormScene is called', () => {
  Actions.currentScene = 'Chatscene';
  const rootComp = shallow(<TimeLine />);
  const agendalist = rootComp
    .find('NavBar')
    .first()
    .shallow()
    .find('TouchableOpacity')
    .last();
  agendalist.props().onPress();
  expect(Actions.BrochureImageScene).not.toBeCalled();
});

it('_openLinks is called', () => {
  const rootComp = shallow(<TimeLine />);
  const instance = rootComp.instance();
  const component = shallow(instance._openLinks());
  expect(component).toBeTruthy();
});

it('key extractorcurrent scene is "timeline"', () => {
  const tree = renderer.create(<TimeLine cardId="7X856YIks9" />);
  const treeInstance = tree.getInstance();
  treeInstance.keyExtractor('XPP89611P');
  expect(Actions.cardId).toBeCalled();
});
