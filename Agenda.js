import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { Agenda } from 'react-native-calendars';
import { Actions } from 'react-native-router-flux';
import { NavBar, Text, Screen } from '@ui/components';
import { Colors } from '@ui/theme_default';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyDate = this.renderEmptyDate.bind(this);
    this.rowHasChanged = this.rowHasChanged.bind(this);
    this.state = {
      items: {
        '2017-10-28': [
          {
            recurrence: '',
            location: 'Hall 6, Fira Gran Via, Barcelona, Spain',
            allDay: false,
            endDate: '2017-10-28T10:30:00.000Z',
            startDate: '2017-10-28T09:00:00.000Z',
            title: 'Early management of acute pancreatitis',
            calendar: {
              allowsModifications: false,
              isPrimary: false,
              title: '#contacts@group.v.calendar.google.com',
              source: 'email',
              id: '1',
            },
            description: 'Common mistakes in the initial ...the complicated case ',
            id: '10',
          },
        ],
      },
    };
  }

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  selectedDate() {
    const { items } = this.state;
    if (items === {}) {
      this.setState({
        items: { '2017-10-28': [] },
      });
      return '2017-10-28';
    }
    return items[Object.keys(items)[0]];
  }

  renderItem(item) {
    return (
      <View style={[styles.item]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="access-time"
            type="MaterialIcons"
            size={24}
            color="blue"
            style={{ width: 40, alignItems: 'center' }}
          />
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 18,
              fontWeight: '300',
              color: 'blue',
              marginBottom: 5,
              flex: 1,
              justifyContent: 'center',
            }}
          >{`${moment(item.startDate).format('LT')} - ${moment(item.endDate).format('LT')}`}</Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#eaeaea', marginVertical: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="event-note"
            type="MaterialIcons"
            size={20}
            color="#eaeaea"
            style={{ width: 40, justifyContent: 'flex-start', alignItems: 'center' }}
          />
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 14,
              color: '#666666',
              marginBottom: 5,
              flex: 1,
            }}
          >
            {item.title}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="location-on"
            type="MaterialIcons"
            size={20}
            color="#eaeaea"
            style={{ width: 40, justifyContent: 'flex-start', alignItems: 'center' }}
          />
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 12,
              color: '#666666',
              marginBottom: 5,
              flex: 1,
            }}
          >
            {item.location ? item.location : 'N/A'}
          </Text>
        </View>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={[styles.item, { height: 20 }]}>
        <Text style={{ fontSize: 14, color: '#9b9b9b', marginBottom: 5 }}>
          Add events from Schedule to My Agenda!
        </Text>
      </View>
    );
  }

  render() {
    const { items } = this.state;
    return (
      <Screen>
        <NavBar
          titleText="Agenda"
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                if (Actions.currentScene === 'AgendaScene') {
                  Actions.pop();
                }
              }}
            >
              <Icon
                name="chevron-left"
                type="material-community"
                color={Colors.NAV_ICON}
                size={36}
              />
            </TouchableOpacity>
          }
        />
        <Agenda
          items={items}
          loadItemsForMonth={this.loadItems}
          selected="2017-10-28"
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          onDayPress={(day) => {
            const oldItems = items;
            if (!oldItems[day.dateString]) {
              oldItems[day.dateString] = [];
              this.setState({
                items: oldItems,
              });
            }
          }}
        />
      </Screen>
    );
  }
}
