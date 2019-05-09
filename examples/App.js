/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component, useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import { CacheImage, CacheAudio } from 'rn-cache'

export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <CacheAudio expire={0} uri="https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav" />
        <CacheImage  expire={0} uri='https://sample-videos.com/img/Sample-jpg-image-20mb.jpg' resizeMode="contain" style={{ width: 200, height: 200 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
