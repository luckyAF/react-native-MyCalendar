/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';

import Calendar from './components/Calendar';
var busyDays = [
  new Date(2016, 8, 8),//2016年9月8号
  new Date(2016, 8, 18),//2016年9月18号
  new Date(2016, 9, 8),//2016年10月8号
  new Date(2016, 9, 18),//2016年10月18号
  new Date(2016, 10, 8),//2016年11月8号
  new Date(2016, 10, 8)];//2016年11月18号
class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date(),
    }
  };
  render() {
    let _this = this;
    return (
      <View style={styles.container}>
        <Calendar
          ref='myCalendar'
          date={_this.state.date} //必要值
          onDateChange={(date) => ToastAndroid.show(date, ToastAndroid.SHORT) }
          prevTitle='prev'//默认为Prev
          nextTitle='next'//默认为Next
          busyDay={busyDays}
          />
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

AppRegistry.registerComponent('MyCalendar', () => MyCalendar);