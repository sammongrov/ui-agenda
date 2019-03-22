import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { styles } from 'react-native-theme';
import moment from 'moment';
import { Screen, NavBar, Text, Icon } from '@ui/components';
import { Colors } from '@ui/theme_default';
// import DBManager from '../app/DBManager';
import {DBManager} from 'app-module';
export default class TimeLine extends Component {
  state = {
    index: 0, // eslint-disable-line react/no-unused-state
    // eslint-disable-next-line react/no-unused-state
    routes: [
      // { key: 'zero', title: 'SUN' },
      { key: 'first', title: 'MON' },
      { key: 'second', title: 'TUE' },
      { key: 'third', title: 'WED' },
      { key: 'fourth', title: 'THU' },
      { key: 'fifth', title: 'FRI' },
      { key: 'sixth', title: 'SAT' },
    ],
  };

  componentDidMount = async () => {
    const { calendarName, calendarUrl } = this.props;
    if (DBManager && DBManager.app && DBManager.app.userId && DBManager.calender) {
      DBManager.calender.fetchCalenderEvent(calendarUrl);
    }
    DBManager.calender.addCalenderListner(calendarName, this.fetchCalendarICS);
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    DBManager.calender.removeCalenderListener('hardwareBackPress', this.handleBackPress);
  };

  fetchCalendarICS = async () => {
    const { calendarName } = this.props;
    const sunData = await DBManager.calender.getCalenderData('Sunday', calendarName);
    const monData = await DBManager.calender.getCalenderData('Monday', calendarName);
    const tueData = await DBManager.calender.getCalenderData('Tuesday', calendarName);
    const wedData = await DBManager.calender.getCalenderData('Wednesday', calendarName);
    const thuData = await DBManager.calender.getCalenderData('Thursday', calendarName);
    const friData = await DBManager.calender.getCalenderData('Friday', calendarName);
    const satData = await DBManager.calender.getCalenderData('Saturday', calendarName);

    // console.log('CALENDER23 Sunday', sunData);
    // console.log('CALENDER23 Monday', monData);
    // console.log('CALENDER23 Tuesday', tueData);
    // console.log('CALENDER23 Wednesday', wedData);
    // console.log('CALENDER23 Thursday', thuData);
    // console.log('CALENDER23 Friday', friData);
    // console.log('CALENDER23 Saturday', satData);

    this.setState({
      sunData,
      monData,
      tueData,
      wedData,
      thuData,
      friData,
      satData,
    });
  };

  keyExtractor = (item) => item.title;

  renderTimelines = ({ item }) => {
    // console.log('viswanth-item',item);
    const startTime = moment(item.startTime);
    const currentWeek = moment().startOf('week');
    const nextWeek = moment()
      .startOf('week')
      .add(1, 'weeks');
    // console.log(moment(ourTime).isAfter(currentWeek) && moment(ourTime).isBefore(nextWeek));
    const iscurrentWeek =
      moment(startTime).isAfter(currentWeek) && moment(startTime).isBefore(nextWeek);

    if (item.repeat || iscurrentWeek) {
      if (item && item.title !== 'Lunch' && item.title !== 'Break') {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              padding: 16,
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 18, textAlign: 'left' }}>{item.title}</Text>
            {item.startTime &&
              item.endTime && (
                <Text style={{ fontSize: 14, textAlign: 'right', color: '#777373' }}>
                  <Icon name="timer" type="material-community" color="#777373" size={20} />
                  {`${moment(item.startTime).format('LT')} - ${moment(item.endTime).format('LT')}`}
                </Text>
              )}
          </View>
        );
      }
      if ((item && item.title === 'Lunch') || item.title === 'Break') {
        const logo = item.title === 'Lunch' ? 'silverware-fork-knife' : 'coffee';

        return (
          <View
            style={{
              flex: 1,
              paddingBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Icon name={logo} type="material-community" color="#777373" size={20} />
            <Text style={{ fontSize: 18, textAlign: 'left', color: '#777373' }}> {item.title}</Text>
            {/* <Text style={{ fontSize: 14, textAlign: 'right' }}>
              {`${moment(item.startTime).format('LT')} - ${moment(item.endTime).format('LT')}`}
            </Text> */}
          </View>
        );
      }
    }

    return null;
  };

  _zeroRoute = () => {
    const { sunData } = this.state;
    if (sunData && sunData.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#F6F7F9',
          }}
        >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={sunData}
            renderItem={this.renderTimelines}
            scrollEnabled={false}
          />
        </ScrollView>
      );
    }
    return <Text>No Plan</Text>;
  };

  _firstRoute = () => {
    const { monData } = this.state;
    if (monData && monData.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#F6F7F9',
          }}
        >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={monData}
            renderItem={this.renderTimelines}
            scrollEnabled={false}
          />
        </ScrollView>
      );
    }
    return <Text>No Plan</Text>;
  };

  _secondRoute = () => {
    const { tueData } = this.state;
    if (tueData && tueData.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#F6F7F9',
          }}
        >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={tueData}
            renderItem={this.renderTimelines}
            scrollEnabled={false}
          />
        </ScrollView>
      );
    }
    return <Text>No Data</Text>;
  };

  _thirdRoute = () => {
    const { wedData } = this.state;
    if (wedData && wedData.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#F6F7F9',
          }}
        >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={wedData}
            renderItem={this.renderTimelines}
            scrollEnabled={false}
          />
        </ScrollView>
      );
    }
    return <Text>No Data</Text>;
  };

  _fourthRoute = () => {
    const { thuData } = this.state;
    if (thuData && thuData.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#F6F7F9',
          }}
        >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={thuData}
            renderItem={this.renderTimelines}
            scrollEnabled={false}
          />
        </ScrollView>
      );
    }
    return <Text>No Data</Text>;
  };

  _fifthRoute = () => {
    const { friData } = this.state;
    if (friData && friData.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#F6F7F9',
          }}
        >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={friData}
            renderItem={this.renderTimelines}
            scrollEnabled={false}
          />
        </ScrollView>
      );
    }
    return <Text>No Data</Text>;
  };

  _sixthRoute = () => {
    const { satData } = this.state;
    if (satData && satData.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#F6F7F9',
          }}
        >
          <FlatList
            keyExtractor={this.keyExtractor}
            data={satData}
            renderItem={this.renderTimelines}
            scrollEnabled={false}
          />
        </ScrollView>
      );
    }
    return <Text>No Data</Text>;
  };

  _openLinks = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Sorry,cannot access this link');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(() => {
        Alert.alert('Sorry,cannot access this link');
      });
  };

  _renderHeader = (props) => (
    <View>
      <TabBar
        {...props}
        style={[styles.whiteBackground, styles.timeLineTabbarContainer]}
        tabStyle={styles.timeLineTabStyle}
        labelStyle={{}}
        indicatorStyle={styles.timeLineTabIndicatorStyle}
        renderLabel={(scene) => (
          <View style={styles.alignJustifyCenter}>
            <Text style={styles.timeLineTabTitle} numberOfLines={1}>
              {scene.route.title.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );

  render() {
    const { monData, tueData, wedData, thuData, friData, satData } = this.state;
    const noDayData = [{ title: 'No plan for day' }];
    // console.log('fetchCalendarICS STATE UPDATED', monData);

    return (
      <Screen>
        <NavBar
          titleText="Timetable"
          leftComponent={
            <TouchableOpacity
              style={[styles.navSideButtonDimension, styles.alignJustifyCenter]}
              onPress={() => {
                if (Actions.currentScene === 'TimelineScene') {
                  Actions.pop();
                }
              }}
            >
              <Icon name="chevron-left" color={Colors.NAV_ICON} size={36} />
            </TouchableOpacity>
          }
        />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => {
              if (monData) {
                return (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      backgroundColor: '#f6f7f9',
                    }}
                  >
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={monData && monData.length > 0 ? monData : noDayData}
                      renderItem={this.renderTimelines}
                      scrollEnabled={false}
                    />
                  </ScrollView>
                );
              }
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              );
            },
            second: () => {
              if (tueData) {
                return (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      backgroundColor: '#f6f7f9',
                    }}
                  >
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={tueData && tueData.length > 0 ? tueData : noDayData}
                      renderItem={this.renderTimelines}
                      scrollEnabled={false}
                    />
                  </ScrollView>
                );
              }
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              );
            },
            third: () => {
              if (wedData) {
                return (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      backgroundColor: '#f6f7f9',
                    }}
                  >
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={wedData && wedData.length > 0 ? wedData : noDayData}
                      renderItem={this.renderTimelines}
                      scrollEnabled={false}
                    />
                  </ScrollView>
                );
              }
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              );
            },
            fourth: () => {
              if (thuData) {
                return (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      backgroundColor: '#f6f7f9',
                    }}
                  >
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={thuData && thuData.length > 0 ? thuData : noDayData}
                      renderItem={this.renderTimelines}
                      scrollEnabled={false}
                    />
                  </ScrollView>
                );
              }
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              );
            },
            fifth: () => {
              if (friData) {
                return (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      backgroundColor: '#f6f7f9',
                    }}
                  >
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={friData && friData.length > 0 ? friData : noDayData}
                      renderItem={this.renderTimelines}
                      scrollEnabled={false}
                    />
                  </ScrollView>
                );
              }
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              );
            },
            sixth: () => (
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  backgroundColor: '#f6f7f9',
                }}
              >
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={satData && satData.length > 0 ? satData : noDayData}
                  renderItem={this.renderTimelines}
                  scrollEnabled={false}
                />
              </ScrollView>
            ),
          })}
          onIndexChange={(index) =>
            this.setState({
              index, // eslint-disable-line react/no-unused-state
            })
          }
          initialLayout={{ width: Dimensions.get('window').width, height: 0 }}
          renderTabBar={this._renderHeader}
        />
      </Screen>
    );
  }
}
