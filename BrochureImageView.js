import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from 'react-native-theme';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import { Colors } from '@ui/theme_default';
import { Icon, Loading, NavBar, Screen } from '@ui/components';
import { Actions } from 'react-native-router-flux';
import { hrSummitBrouchure } from '@ui/events';

export default class BrochureImageView extends Component {
  state = {
    layout: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
  };

  _onLayout = (event) => {
    this.setState({
      layout: {
        height: event.nativeEvent.layout.height,
        width: event.nativeEvent.layout.width,
      },
    });
  };

  render() {
    const { layout } = this.state;
    return (
      <Screen safeBgColors={['#000', '#000']} onLayout={this._onLayout}>
        <View style={[styles.flex1, { width: layout.width, backgroundColor: '#000' }]}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
            }}
          >
            <NavBar
              leftComponent={
                <TouchableOpacity onPress={Actions.pop}>
                  <Icon
                    name="chevron-left"
                    type="material-community"
                    color={Colors.TEXT_WHITE}
                    size={36}
                  />
                </TouchableOpacity>
              }
              titleText="Brochure"
              textStyle={{ color: Colors.TEXT_WHITE }}
              navContainerStyle={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderBottomWidth: 0,
              }}
            />
          </View>
          <ImageViewer
            imageUrls={[{ props: { source: hrSummitBrouchure } }]}
            backgroundColor={Colors.BG_BLACK}
            enableImageZoom
            loadingRender={() => (
              <View style={styles.alignJustifyCenter}>
                <Loading />
              </View>
            )}
            renderImage={(props) => <FastImage {...props} />}
            renderIndicator={() => {}}
          />
        </View>
      </Screen>
    );
  }
}
