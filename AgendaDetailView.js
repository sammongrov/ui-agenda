import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Colors } from '@ui/theme_default';
import { NavBar, Text, Screen, Icon, AntDesignIcon } from '@ui/components';
import { styles } from 'react-native-theme';
import {Application} from "@mongrov/config"; 

export default class AgendaDetailView extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  state = {};

  render() {
    const { eventDetail } = this.props;
    return (
      <Screen>
        <NavBar
          titleText="Event Details"
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                if (Actions.currentScene === 'AgendaDetailViewScene') {
                  Actions.pop();
                }
              }}
            >
              <Icon name="chevron-left" color={Colors.NAV_ICON} size={36} />
            </TouchableOpacity>
          }
          rightComponent={
            Application.APPCONFIG.FORM_ENABLE && (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => {
                  if (Actions.currentScene === 'AgendaDetailViewScene') {
                    Actions.FeedbackFormScene();
                  }
                }}
              >
                <AntDesignIcon name="form" color={Colors.NAV_ICON} size={24} />
              </TouchableOpacity>
            )
          }
        />
        <View style={[styles.timeLineContainer, styles.alignJustifyStart, styles.whiteBackground]}>
          <Text style={[styles.newsTitleText, styles.marginBottom10]}>{eventDetail.title}</Text>
          <Text style={styles.cListLastMessage}>{eventDetail.description}</Text>
        </View>
      </Screen>
    );
  }
}

AgendaDetailView.propTypes = {
  eventDetail: PropTypes.object,
};

AgendaDetailView.defaultProps = {
  eventDetail: {},
};
